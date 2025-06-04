
// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserDetails, AuthContextType } from "@/types/auth";
import { fetchUserDetails } from "@/utils/authUtils";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuthOperations } from "@/hooks/useAuthOperations";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { redirectBasedOnRole } = useAuthRedirect();
  const { signIn, signUp, signOut, resendConfirmation } = useAuthOperations();

  // Memoize the redirect function to prevent infinite loops
  const handleRedirect = useCallback(async (details: UserDetails) => {
    await redirectBasedOnRole(details);
  }, [redirectBasedOnRole]);

  useEffect(() => {
    let mounted = true;
    console.log("AuthContext: Setting up auth state listener");

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!mounted) return;

      console.log(
        "AuthContext: Initial session check:",
        initialSession?.user?.id || "No session"
      );
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        if (!initialSession.user.email_confirmed_at) {
          console.log("AuthContext: Initial session with unconfirmed email");
          setLoading(false);
          return;
        }

        fetchUserDetails(initialSession.user.id).then((details) => {
          if (mounted && details) {
            setUserDetails(details);
          }
          if (mounted) setLoading(false);
        });
      } else {
        if (mounted) setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;

      console.log(
        "AuthContext: Auth state change:",
        event,
        "User ID:",
        currentSession?.user?.id || "No user"
      );

      if (event === "SIGNED_OUT") {
        console.log("AuthContext: Handling SIGNED_OUT event");
        setSession(null);
        setUser(null);
        setUserDetails(null);
        setLoading(false);
        return;
      }

      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (event === "SIGNED_IN" && currentSession?.user) {
        console.log(
          "AuthContext: User signed in, checking email confirmation"
        );

        if (!currentSession.user.email_confirmed_at) {
          console.log(
            "AuthContext: Email not confirmed, user should see confirmation screen"
          );
          setLoading(false);
          return;
        }

        const details = await fetchUserDetails(currentSession.user.id);
        if (details && mounted) {
          setUserDetails(details);
          await handleRedirect(details);
        }
        if (mounted) setLoading(false);
      } else {
        if (mounted) setLoading(false);
      }
    });

    return () => {
      console.log("AuthContext: Cleaning up auth listener");
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Remove redirectBasedOnRole from dependencies

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signIn(email, password);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "admin" | "partner" | "customer",
    linkedPartnerId?: string
  ) => {
    setLoading(true);
    try {
      await signUp(email, password, fullName, role, linkedPartnerId);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    // Immediately clear React state
    setSession(null);
    setUser(null);
    setUserDetails(null);
    
    await signOut();
    setLoading(false);
  };

  const value: AuthContextType = {
    session,
    user,
    userDetails,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    resendConfirmation,
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
