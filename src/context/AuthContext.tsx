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
  approval_status?: 'pending' | 'approved'; // This is from your 'users' table
  linked_partner_id?: string;
  created_at: string;
};

// This type should reflect the actual structure from partner_applications if different
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

  // Helper to clear Supabase related items from localStorage/sessionStorage
  // Use with caution, Supabase's signOut should handle most of this.
  const cleanupAuthState = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Check if sessionStorage exists (it might not in all environments like SSR)
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
        .from('users') // Ensure this table name is correct
        .select('*') // Be specific if possible: 'id, email, full_name, role, approval_status, linked_partner_id, created_at'
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

  // Fetches status from 'partner_applications' table.
  const checkPartnerApplicationStatus = async (userEmail: string): Promise<PartnerApplicationStatus> => {
    try {
      const normalizedEmail = userEmail.trim().toLowerCase();
      console.log('AuthContext: Checking partner application status for email:', normalizedEmail);
      const { data, error } = await supabase
        .from('partner_applications') // Ensure this table name is correct
        .select('status')
        .ilike('email', normalizedEmail)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('AuthContext: Error checking partner application status:', error);
        return null; // Or a specific error status
      }

      const status = data?.status?.trim().toLowerCase() || 'not_found';
      console.log('AuthContext: Partner application status result:', status);
      return status as PartnerApplicationStatus;
    } catch (err) {
      console.error('AuthContext: Exception checking partner application status:', err);
      return null; // Or a specific error status
    }
  };

  const redirectBasedOnRole = async (currentDetails: UserDetails) => {
    const { role, email: userEmail } = currentDetails; // Use email from currentDetails
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
        // Handles 'pending', 'not_found', null, or any other non-approved status
        console.log('AuthContext: Navigating unapproved/pending partner to /partner/application-status');
        navigate('/partner/application-status', { replace: true });
      }
    } else if (role === 'customer') {
      console.log('AuthContext: Navigating customer to /customer');
      navigate('/customer', { replace: true });
    } else {
      console.warn('AuthContext: Unknown role for redirect:', role);
      navigate('/', { replace: true }); // Fallback to home for unknown roles
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
          // User's original setTimeout structure
          setTimeout(async () => {
            if (mounted) {
              const details = await fetchUserDetails(currentSession.user.id);
              if (details) {
                setUserDetails(details);
                // This redirect ensures that if a user's session becomes active
                // (e.g., through magic link, OAuth, or session recovery), they are routed correctly.
                await redirectBasedOnRole(details);
              } else {
                console.error('AuthContext: SIGNED_IN event but no user details found. Signing out.');
                await signOut(); // signOut also navigates
              }
            }
          }, 100); // This timeout might be removable if state updates flow well
        } else if (event === 'SIGNED_OUT') {
          console.log('AuthContext: SIGNED_OUT event. Clearing userDetails and navigating to home.');
          setUserDetails(null);
          if (window.location.pathname !== '/') { // Avoid redundant navigation if already home
             navigate('/', { replace: true });
          }
        } else if (event === 'INITIAL_SESSION' && currentSession?.user) {
            console.log('AuthContext: INITIAL_SESSION event, fetching details.');
            const details = await fetchUserDetails(currentSession.user.id);
            if (details) {
                setUserDetails(details);
                // Do not auto-redirect here, let pages/ProtectedRoute handle it
                // This allows users to land on specific pages if they have a valid session.
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

    // Redundant initializeAuth() removed as onAuthStateChange with INITIAL_SESSION handles it.
    // supabase.auth.getSession() is implicitly called by onAuthStateChange on load.

    return () => {
      console.log('AuthContext: Unmounting and unsubscribing from onAuthStateChange.');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]); // navigate is a dependency of redirectBasedOnRole indirectly used in onAuthStateChange

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // cleanupAuthState(); // Generally not needed before signIn, Supabase handles session
      // Attempt to sign out any existing residual session more gracefully first.
      // This can prevent issues if there's a mismatched local session.
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
        // The onAuthStateChange event 'SIGNED_IN' will fire and handle fetching userDetails
        // and calling redirectBasedOnRole. So, no need to duplicate that logic here.
        // Just ensure userDetails are set for immediate UI updates if needed before onAuthStateChange fully processes.
        const details = await fetchUserDetails(data.user.id); // Optional: prime userDetails early
        if (details) {
            setUserDetails(details); // Update context state
            // The onAuthStateChange handler will still run and call redirectBasedOnRole
        } else {
            // This case should ideally be handled by onAuthStateChange's error path too
            await signOut();
            throw new Error('User authenticated but details could not be fetched.');
        }
        toast.success("Signed in successfully!");
        // Redirect is handled by onAuthStateChange's SIGNED_IN event
      } else {
        // This case (successful signInWithPassword but no data.user) is highly unlikely with Supabase
        throw new Error('Sign in completed but no user data was returned.');
      }
    } catch (error: any) {
      console.error('AuthContext: Overall signIn function error:', error);
      toast.error(error.message || "Sign in failed.");
      setLoading(false); // Ensure loading is false if signIn fails before navigation
      throw error; // Re-throw for the calling component to handle
    }
    // setLoading(false) might not be reached if navigation occurs due to onAuthStateChange.
    // The global loading state is more for app initialization.
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'admin' | 'partner' | 'customer', linkedPartnerId?: string) => {
    setLoading(true);
    try {
      // cleanupAuthState(); // Generally not needed
      console.log('AuthContext: Attempting signUp for email:', email, 'role:', role);
      const userDataForSignUp = {
        full_name: fullName,
        role: role,
        // approval_status for partners will be set by backend trigger or admin action, not here.
        // For customers, linked_partner_id is important.
        ...(role === 'customer' && linkedPartnerId && { linked_partner_id: linkedPartnerId }),
        ...(role === 'partner' && { approval_status: 'pending' }) // Explicitly set for partner
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userDataForSignUp, // This data is stored in auth.users.raw_user_meta_data
                                  // You need a trigger to copy it to your public.users table.
          emailRedirectTo: `${window.location.origin}/` // Redirect to home after email confirm
        },
      });
      
      if (error) {
        console.error('AuthContext: signUp error:', error.message);
        if (error.message.includes('User already registered')) { // More robust check
          throw new Error('An account with this email already exists. Please try signing in.');
        }
        throw new Error(error.message || 'Sign up failed.');
      }
      
      if (data.user) {
        console.log('AuthContext: signUp successful for user:', data.user.id);
        // The user object from signUp might not have raw_user_meta_data immediately reflected.
        // Your DB trigger should copy metadata to public.users.
        // onAuthStateChange 'SIGNED_IN' will eventually fetch from public.users.
        toast.success("Registration successful! Please check your email to confirm your account.");
        
        // After signUp, Supabase usually sends a confirmation email.
        // The user is technically in auth.users but not yet 'SIGNED_IN' in terms of active session until confirmed.
        // So, no immediate redirect to a dashboard here. User confirms email, then signs in.
        // Navigate to a page indicating email confirmation is needed, or just stay.
        // navigate('/please-confirm-email'); // Or similar
      } else if (data.session === null && !data.user) {
        // This is the typical response for signUp when email confirmation is required.
         console.log('AuthContext: signUp successful, email confirmation required.');
         toast.success("Registration successful! Please check your email to confirm your account.");
      }

    } catch (error: any) {
      console.error('AuthContext: Overall signUp function error:', error);
      toast.error(error.message || "Sign up failed.");
      throw error; // Re-throw for the calling component
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log('AuthContext: Attempting signOut.');
    // setLoading(true); // setLoading(true) for signOut can feel abrupt
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' }); // Ensure global signout
      if (error) {
        console.error('AuthContext: Error during supabase.auth.signOut:', error);
        toast.error(error.message || "Failed to sign out from Supabase.");
        // Still attempt to clear local state
      }
      // State updates will be handled by onAuthStateChange 'SIGNED_OUT' event
      // cleanupAuthState(); // Call this to be absolutely sure, though onAuthStateChange should handle state
      setSession(null);
      setUser(null);
      setUserDetails(null); // Explicitly clear here
      toast.success("Signed out successfully");
      console.log('AuthContext: Signed out, navigating to /');
      navigate('/', { replace: true });
    } catch (error: any) { // Catch any other unexpected errors
      console.error('AuthContext: Overall signOut function error:', error);
      toast.error(error.message || "Failed to sign out.");
    } finally {
      // setLoading(false);
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