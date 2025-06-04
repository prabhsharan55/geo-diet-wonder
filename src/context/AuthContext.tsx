import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate }
from "react-router-dom";
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
  resendConfirmation: (email: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    console.log('AuthContext: Setting up auth state listener (useEffect runs)');
    setLoading(true); // Start with loading true when effect runs

    // Get initial session state
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!mounted) return;
      console.log('AuthContext: Initial session retrieved:', initialSession?.user?.id || 'No initial session');
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        if (initialSession.user.email_confirmed_at) {
          const details = await fetchUserDetails(initialSession.user.id);
          if (mounted && details) {
            setUserDetails(details);
          }
        } else {
          console.log('AuthContext: Initial session user email not confirmed.');
        }
      }
      if (mounted) setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (!mounted) return;
        console.log('AuthContext: onAuthStateChange event:', event, 'User ID:', currentSession?.user?.id || 'No user');

        setSession(currentSession); // Update session regardless of event type first
        setUser(currentSession?.user ?? null); // Update user

        if (event === 'SIGNED_OUT') {
          console.log('AuthContext: Handling SIGNED_OUT event in onAuthStateChange.');
          setUserDetails(null); // Clear user details
          setLoading(false); // Auth state resolved
          // Navigation to '/' should be handled by the signOut function itself
          // or by a ProtectedRoute if the user lands on a protected page while logged out.
          // If current page isn't '/', navigate.
          if (window.location.pathname !== '/') {
            // navigate('/', { replace: true }); // Optionally navigate here too
          }
          return; // Stop further processing for SIGNED_OUT
        }

        if (event === 'SIGNED_IN' && currentSession?.user) {
          console.log('AuthContext: SIGNED_IN event in onAuthStateChange.');
          if (!currentSession.user.email_confirmed_at) {
            console.log('AuthContext: Email not confirmed for SIGNED_IN user.');
            setUserDetails(null); // Clear any stale details
            setLoading(false);
            // Potentially navigate to a 'please confirm email' page or show a message
            return;
          }
          const details = await fetchUserDetails(currentSession.user.id);
          if (mounted && details) {
            setUserDetails(details);
            await redirectBasedOnRole(details);
          } else if (mounted) {
            // Failed to get details after sign in, something is wrong
            console.error('AuthContext: SIGNED_IN but failed to fetch userDetails.');
            setUserDetails(null); // Ensure details are cleared
            // Optionally sign out again or navigate to an error page
          }
        } else if (!currentSession?.user) {
            // If session becomes null for any other reason (e.g. token revoked, USER_DELETED)
            setUserDetails(null);
        }
        
        if (mounted) setLoading(false); // Set loading to false after processing other events
      }
    );

    return () => {
      console.log('AuthContext: Cleaning up auth listener (useEffect cleanup)');
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]); // navigate is a dependency

  const signIn = async (email: string, password: string) => {
    setLoading(true); // Indicate loading for the sign-in process
    try {
      console.log('AuthContext: Starting sign in process for:', email);
      
      // Optional: Attempt to sign out any lingering session first to ensure a clean slate.
      // await supabase.auth.signOut({ scope: 'global' });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('AuthContext: Sign in error from Supabase:', error.message);
        if (error.message === 'Email not confirmed' || 
            (error.message.toLowerCase().includes('email') && error.message.toLowerCase().includes('confirm'))) {
          throw new Error('UNCONFIRMED_EMAIL');
        }
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
        throw new Error(error.message || 'Sign in failed.');
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        console.log('AuthContext: Sign in successful but email not confirmed.');
        await supabase.auth.signOut(); // Sign out user if email is not confirmed
        throw new Error('UNCONFIRMED_EMAIL');
      }
      
      // If successful, onAuthStateChange with 'SIGNED_IN' will handle fetching details and redirecting.
      // We don't need to call setLoading(false) here as onAuthStateChange will do it.
      console.log('AuthContext: Sign in successful, onAuthStateChange will handle next steps.');
      toast.success("Signed in successfully!");
      
    } catch (error: any) {
      console.error('AuthContext: Sign in process caught error:', error);
      if (error.message !== 'UNCONFIRMED_EMAIL') { // Avoid double toasting for unconfirmed
        toast.error(error.message || "Sign in failed.");
      }
      setLoading(false); // Ensure loading is false if signIn itself fails
      throw error; // Re-throw for the UI component to handle
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'admin' | 'partner' | 'customer', linkedPartnerId?: string) => {
    setLoading(true);
    try {
      console.log('AuthContext: Starting sign up process for:', email, 'role:', role);
      const userDataForSignUp = {
        full_name: fullName,
        role: role,
        ...(role === 'customer' && linkedPartnerId && { linked_partner_id: linkedPartnerId }),
        ...(role === 'partner' && { approval_status: 'pending' }) // Assuming 'pending' is default
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userDataForSignUp, // This goes to raw_user_meta_data, ensure DB trigger copies it
          emailRedirectTo: `${window.location.origin}/auth` // Or your login/confirmation page
        },
      });
      
      if (error) {
        console.error('AuthContext: Sign up error from Supabase:', error.message);
        if (error.message.includes('User already registered')) {