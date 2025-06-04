
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserDetails = {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'partner' | 'customer';
  approval_status?: 'pending' | 'approved';
  linked_partner_id?: string;
  created_at: string;
};

type PartnerApplicationStatus = 'pending' | 'approved' | 'rejected' | 'not_found' | string | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: 'admin' | 'partner' | 'customer', linkedPartnerId?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cleanupAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  };

  const fetchUserDetails = async (userId: string): Promise<UserDetails | null> => {
    try {
      console.log('AuthContext: Fetching user details for ID:', userId);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('AuthContext: Error fetching user details:', error);
        return null;
      }
      console.log('AuthContext: User details fetched successfully:', data);
      return data as UserDetails;
    } catch (err) {
      console.error('AuthContext: Exception fetching user details:', err);
      return null;
    }
  };

  const checkPartnerApplicationStatus = async (userEmail: string): Promise<PartnerApplicationStatus> => {
    try {
      const normalizedEmail = userEmail.trim().toLowerCase();
      console.log('AuthContext: Checking partner application status for email:', normalizedEmail);
      const { data, error } = await supabase
        .from('partner_applications')
        .select('status')
        .ilike('email', normalizedEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('AuthContext: Error checking partner application status:', error);
        return null;
      }

      const status = data?.status?.trim().toLowerCase() || 'not_found';
      console.log('AuthContext: Partner application status result:', status);
      return status as PartnerApplicationStatus;
    } catch (err) {
      console.error('AuthContext: Exception checking partner application status:', err);
      return null;
    }
  };

  const redirectBasedOnRole = async (currentDetails: UserDetails) => {
    const { role, email: userEmail } = currentDetails;
    console.log('AuthContext: redirectBasedOnRole called for role:', role);

    if (role === 'admin') {
      console.log('AuthContext: Navigating admin to /admin');
      navigate('/admin', { replace: true });
    } else if (role === 'partner') {
      const applicationStatus = await checkPartnerApplicationStatus(userEmail);
      console.log('AuthContext: Partner application status for redirect:', applicationStatus);
      if (applicationStatus === 'approved') {
        console.log('AuthContext: Navigating approved partner to /partner');
        navigate('/partner', { replace: true });
      } else {
        console.log('AuthContext: Navigating unapproved/pending partner to /partner/application-status');
        navigate('/partner/application-status', { replace: true });
      }
    } else if (role === 'customer') {
      console.log('AuthContext: Navigating customer to /customer');
      navigate('/customer', { replace: true });
    } else {
      console.warn('AuthContext: Unknown role for redirect:', role);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log('AuthContext: Mounting and subscribing to onAuthStateChange.');

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) {
          console.log('AuthContext: onAuthStateChange triggered on unmounted component.');
          return;
        }
        
        console.log('AuthContext: onAuthStateChange event:', event, 'User ID:', currentSession?.user?.id);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession?.user) {
          console.log('AuthContext: SIGNED_IN event, attempting to fetch details and redirect.');
          setTimeout(async () => {
            if (mounted) {
              const details = await fetchUserDetails(currentSession.user.id);
              if (details) {
                setUserDetails(details);
                await redirectBasedOnRole(details);
              } else {
                console.error('AuthContext: SIGNED_IN event but no user details found. Signing out.');
                await signOut();
              }
            }
          }, 100);
        } else if (event === 'SIGNED_OUT') {
          console.log('AuthContext: SIGNED_OUT event. Clearing userDetails and navigating to home.');
          setUserDetails(null);
          if (window.location.pathname !== '/') {
             navigate('/', { replace: true });
          }
        } else if (event === 'INITIAL_SESSION' && currentSession?.user) {
            console.log('AuthContext: INITIAL_SESSION event, fetching details.');
            const details = await fetchUserDetails(currentSession.user.id);
            if (details) {
                setUserDetails(details);
            } else {
                console.error('AuthContext: INITIAL_SESSION but no user details. Signing out.');
                await signOut();
            }
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    return () => {
      console.log('AuthContext: Unmounting and unsubscribing from onAuthStateChange.');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (signOutError) {
        console.warn('AuthContext: Error during pre-signIn signOut, proceeding with signIn:', signOutError);
      }
      
      console.log('AuthContext: Attempting sign in for email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('AuthContext: signInWithPassword error:', error.message);
        if (error.message === 'Email not confirmed') {
          throw new Error('Please check your email and click the confirmation link before signing in.');
        }
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        throw new Error(error.message || 'Sign in failed.');
      }
      
      if (data.user) {
        console.log('AuthContext: signInWithPassword successful for user:', data.user.id);
        const details = await fetchUserDetails(data.user.id);
        if (details) {
            setUserDetails(details);
        } else {
            await signOut();
            throw new Error('User authenticated but details could not be fetched.');
        }
        toast.success("Signed in successfully!");
      } else {
        throw new Error('Sign in completed but no user data was returned.');
      }
    } catch (error: any) {
      console.error('AuthContext: Overall signIn function error:', error);
      toast.error(error.message || "Sign in failed.");
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'admin' | 'partner' | 'customer', linkedPartnerId?: string) => {
    setLoading(true);
    try {
      console.log('AuthContext: Attempting signUp for email:', email, 'role:', role);
      
      // Check if user already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy' // This will fail but tells us if email exists
      });
      
      const userDataForSignUp = {
        full_name: fullName,
        role: role,
        ...(role === 'customer' && linkedPartnerId && { linked_partner_id: linkedPartnerId }),
        ...(role === 'partner' && { approval_status: 'pending' })
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userDataForSignUp,
          emailRedirectTo: `${window.location.origin}/auth`
        },
      });
      
      if (error) {
        console.error('AuthContext: signUp error:', error.message);
        if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try signing in instead.');
        }
        throw new Error(error.message || 'Sign up failed.');
      }
      
      if (data.user) {
        console.log('AuthContext: signUp successful for user:', data.user.id);
        toast.success("Registration successful! Please check your email to confirm your account.");
      } else if (data.session === null && !data.user) {
         console.log('AuthContext: signUp successful, email confirmation required.');
         toast.success("Registration successful! Please check your email to confirm your account.");
      }

    } catch (error: any) {
      console.error('AuthContext: Overall signUp function error:', error);
      toast.error(error.message || "Sign up failed.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('AuthContext: Attempting signOut.');
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('AuthContext: Error during supabase.auth.signOut:', error);
        toast.error(error.message || "Failed to sign out from Supabase.");
      }
      setSession(null);
      setUser(null);
      setUserDetails(null);
      toast.success("Signed out successfully");
      console.log('AuthContext: Signed out, navigating to /');
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('AuthContext: Overall signOut function error:', error);
      toast.error(error.message || "Failed to sign out.");
    }
  };

  const value = {
    session,
    user,
    userDetails,
    signIn,
    signUp,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
