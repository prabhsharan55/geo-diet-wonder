
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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, metadata?: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent multiple initialization attempts
    if (authChecked) return;
    
    let mounted = true;
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession?.user) {
          // Defer data fetching to prevent deadlocks
          setTimeout(() => {
            if (mounted) {
              fetchUserDetails(currentSession.user.id);
            }
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setUserDetails(null);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            await fetchUserDetails(currentSession.user.id);
          }
          
          setLoading(false);
          setAuthChecked(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setLoading(false);
          setAuthChecked(true);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [authChecked]);

  const fetchUserDetails = async (userId: string | undefined) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user details:', error);
        return;
      }
      
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

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

  const signIn = async (email: string, password: string) => {
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
      
      if (error) throw error;
      
      if (data.user) {
        toast.success("Signed in successfully");
        
        // Fetch role and redirect accordingly
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();
        
        if (userData?.role === 'admin') {
          navigate('/admin');
        } else if (userData?.role === 'partner') {
          navigate('/partner');
        } else {
          navigate('/customer');
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, metadata?: Record<string, any>) => {
    setLoading(true);
    try {
      // Clean up existing state
      cleanupAuthState();
      
      // Prepare the user metadata
      const userData = {
        full_name: fullName,
        ...metadata
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
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
              role: 'customer',
              // Save additional metadata that we want to query
              mobile: metadata?.mobile,
              city: metadata?.city
            }
          ]);
        
        if (insertError) {
          console.error("Error storing user details:", insertError);
          throw new Error("Failed to complete registration");
        }
        
        // Create a new customer record
        const { error: customerError } = await supabase
          .from('customers')
          .insert([
            {
              user_id: data.user.id,
              email: data.user.email,
              // Save the selected plan info
              selected_plan: metadata?.selectedPlan
            }
          ]);
        
        if (customerError) {
          console.error("Error creating customer record:", customerError);
          throw new Error("Failed to complete registration");
        }
        
        toast.success("Registration successful! Welcome to GeoDiet!");
        
        // Automatically sign in
        // This is handled by onAuthStateChange already
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
