
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: any | null;
  isAdmin: boolean;
  isPartner: boolean;
  isCustomer: boolean;
  signIn: (email: string, password: string, redirectTo?: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, metadata?: Record<string, any>, redirectTo?: string) => Promise<{data?: {user: User} | null, error?: Error | null} | void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const cleanupAuthState = () => {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  const forceSignOutAndRedirect = async () => {
    console.log('Force signing out user with no database record');
    cleanupAuthState();
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.warn('Error during force sign out:', err);
    }
    setSession(null);
    setUser(null);
    setUserDetails(null);
    toast.error("Your account data was not found. Please sign up again.");
    window.location.href = '/auth';
  };

  const fetchUserDetails = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (data) {
        console.log('User details fetched from DB:', data);
        setUserDetails(data);
        return data;
      } else if (!data && !error) {
        console.log('User authenticated but no database record found');
        return null;
      } else if (error) {
        console.warn('Could not fetch user details from DB:', error);
        return null;
      }
    } catch (err) {
      console.warn('Error fetching user details:', err);
      return null;
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
          // Fetch user details with a small delay to allow database operations to complete
          setTimeout(async () => {
            if (mounted) {
              const details = await fetchUserDetails(currentSession.user.id);
              if (!details) {
                await forceSignOutAndRedirect();
                return;
              }
            }
          }, 500); // Increased delay to allow for database operations
        } else if (event === 'SIGNED_OUT') {
          setUserDetails(null);
        }
        
        if (mounted) {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted && currentSession?.user) {
          console.log('Initial session check:', currentSession.user.id);
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Check if user exists in database
          const details = await fetchUserDetails(currentSession.user.id);
          if (!details) {
            await forceSignOutAndRedirect();
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
  }, []);

  const signIn = async (email: string, password: string, redirectTo?: string) => {
    setLoading(true);
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Provide more helpful error messages
        if (error.message === 'Email not confirmed') {
          throw new Error('Please check your email and click the confirmation link before signing in.');
        }
        throw error;
      }
      
      if (data.user) {
        // Fetch user details immediately after sign in
        const details = await fetchUserDetails(data.user.id);
        
        if (!details) {
          throw new Error('User account not found. Please contact support.');
        }
        
        toast.success("Signed in successfully");
        
        // Use the provided redirect path, don't override it
        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          // Use database role to determine redirect
          const userRole = details.role || 'customer';
          
          if (userRole === 'admin') {
            window.location.href = '/admin';
          } else if (userRole === 'partner') {
            window.location.href = '/partner';
          } else {
            window.location.href = '/customer';
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, metadata?: Record<string, any>, redirectTo?: string) => {
    setLoading(true);
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Determine role based on metadata or default to customer
      const userRole = metadata?.role || 'customer';
      
      // Prepare the user metadata
      const userData = {
        full_name: fullName,
        role: userRole,
        ...metadata
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
        // Store additional user details in the users table
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            { 
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              role: userRole,
              // Save additional metadata that we want to query
              ...(metadata?.clinic_id && { clinic_id: metadata.clinic_id })
            }
          ]);
        
        if (insertError) {
          console.error("Could not store user details in DB:", insertError);
          throw new Error("Failed to create user profile. Please try again.");
        }
        
        // Create role-specific records
        if (userRole === 'customer') {
          try {
            const { error: customerError } = await supabase
              .from('customers')
              .insert([
                {
                  user_id: data.user.id,
                  email: data.user.email,
                  // Save the selected plan info
                  ...(metadata?.selectedPlan && { selected_plan: metadata.selectedPlan })
                }
              ]);
            
            if (customerError) {
              console.warn("Could not create customer record:", customerError);
            }
          } catch (err) {
            console.warn("Error creating customer record:", err);
          }
        }
        
        // For partners, we need email confirmation, so don't redirect immediately
        if (userRole === 'partner') {
          toast.success("Registration successful! Please check your email to confirm your account before signing in.");
          return { data, error: null };
        }
        
        // For customers, set userDetails immediately if no email confirmation required
        if (userRole === 'customer') {
          const userDetailsData = {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            role: userRole,
            ...(metadata?.clinic_id && { clinic_id: metadata.clinic_id })
          };
          setUserDetails(userDetailsData);
        }
        
        toast.success("Registration successful! Welcome to GeoDiet!");
        
        // Use the provided redirect path, don't override it
        if (redirectTo) {
          window.location.href = redirectTo;
        } else {
          // Redirect based on role only if no specific redirect was provided
          if (userRole === 'admin') {
            window.location.href = '/admin';
          } else if (userRole === 'partner') {
            window.location.href = '/partner';
          } else {
            window.location.href = '/customer';
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Clean up auth state
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      toast.success("Signed out successfully");
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = userDetails?.role === 'admin';
  const isPartner = userDetails?.role === 'partner';
  const isCustomer = userDetails?.role === 'customer';

  const value = {
    session,
    user,
    userDetails,
    isAdmin,
    isPartner,
    isCustomer,
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
