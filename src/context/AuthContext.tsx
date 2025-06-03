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
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const fetchUserDetails = async (userId: string): Promise<UserDetails | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user details:', error);
        return null;
      }
      
      return data as UserDetails;
    } catch (err) {
      console.error('Error fetching user details:', err);
      return null;
    }
  };

  const checkPartnerApplicationStatus = async (userEmail: string) => {
    try {
      const normalizedEmail = userEmail.trim().toLowerCase();
      const { data, error } = await supabase
        .from('partner_applications')
        .select('status')
        .ilike('email', normalizedEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error checking partner application:', error);
        return null;
      }

      return data?.status?.trim().toLowerCase() || null;
    } catch (err) {
      console.error('Error checking partner application:', err);
      return null;
    }
  };

  const redirectBasedOnRole = async (userDetails: UserDetails) => {
    const { role } = userDetails;
    
    console.log('Redirecting based on role:', role);
    
    if (role === 'admin') {
      console.log('Redirecting admin to /admin');
      navigate('/admin');
    } else if (role === 'partner') {
      // Check application status for partners
      const applicationStatus = await checkPartnerApplicationStatus(userDetails.email);
      console.log('Partner application status:', applicationStatus);
      
      if (applicationStatus === 'approved') {
        navigate('/partner');
      } else {
        navigate('/partner/application-status');
      }
    } else if (role === 'customer') {
      navigate('/customer');
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;
        
        console.log('Auth state change:', event, currentSession?.user?.id);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession?.user) {
          console.log('User signed in, fetching details...');
          setTimeout(async () => {
            if (mounted) {
              const details = await fetchUserDetails(currentSession.user.id);
              console.log('User details fetched:', details);
              if (details) {
                setUserDetails(details);
                await redirectBasedOnRole(details);
              } else {
                console.error('No user details found');
                await signOut();
              }
            }
          }, 100);
        } else if (event === 'SIGNED_OUT') {
          setUserDetails(null);
          navigate('/');
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted && currentSession?.user) {
          console.log('Existing session found, fetching user details...');
          setSession(currentSession);
          setUser(currentSession.user);
          
          const details = await fetchUserDetails(currentSession.user.id);
          console.log('Initial user details:', details);
          if (details) {
            setUserDetails(details);
          } else {
            await signOut();
            return;
          }
        }
        
        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      console.log('Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        if (error.message === 'Email not confirmed') {
          throw new Error('Please check your email and click the confirmation link before signing in.');
        }
        throw error;
      }
      
      if (data.user) {
        console.log('Sign in successful, fetching user details...');
        const details = await fetchUserDetails(data.user.id);
        
        if (!details) {
          throw new Error('User account not found. Please contact support.');
        }
        
        console.log('User details after sign in:', details);
        setUserDetails(details);
        toast.success("Signed in successfully");
        await redirectBasedOnRole(details);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'admin' | 'partner' | 'customer', linkedPartnerId?: string) => {
    setLoading(true);
    try {
      cleanupAuthState();
      
      const userData = {
        full_name: fullName,
        role: role,
        ...(linkedPartnerId && { linked_partner_id: linkedPartnerId })
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/auth`
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast.success("Registration successful! Please check your email to confirm your account.");
        
        // For partners, redirect to pending page after email confirmation
        if (role === 'partner') {
          navigate('/auth');
        } else {
          // For customers, they can proceed immediately
          const details = await fetchUserDetails(data.user.id);
          if (details) {
            setUserDetails(details);
            await redirectBasedOnRole(details);
          }
        }
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      cleanupAuthState();
      await supabase.auth.signOut({ scope: 'global' });
      setSession(null);
      setUser(null);
      setUserDetails(null);
      toast.success("Signed out successfully");
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || "Failed to sign out");
    } finally {
      setLoading(false);
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
