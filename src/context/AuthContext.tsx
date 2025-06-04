// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Adjust this type to exactly match your `users` table schema
type UserDetails = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "partner" | "customer";
  created_at: string;
};

type PartnerApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "not_found"
  | string
  | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: "admin" | "partner" | "customer",
    linkedPartnerId?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cleanupAuthState = () => {
    console.log("AuthContext: Cleaning up auth state");
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
        localStorage.removeItem(key);
      }
    });
    if (typeof sessionStorage !== "undefined") {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
          sessionStorage.removeItem(key);
        }
      });
    }
    setSession(null);
    setUser(null);
    setUserDetails(null);
  };

  const fetchUserDetails = async (
    userId: string
  ): Promise<UserDetails | null> => {
    try {
      console.log("AuthContext: Fetching user details for ID:", userId);
      const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, role, created_at")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("AuthContext: Error fetching user details:", error);
        return null;
      }
      console.log("AuthContext: User details fetched successfully:", data);
      return data as UserDetails;
    } catch (err) {
      console.error("AuthContext: Exception fetching user details:", err);
      return null;
    }
  };

  const checkPartnerApplicationStatus = async (
    userEmail: string
  ): Promise<PartnerApplicationStatus> => {
    try {
      const normalizedEmail = userEmail.trim().toLowerCase();
      console.log(
        "AuthContext: Checking partner application status for email:",
        normalizedEmail
      );
      const { data, error } = await supabase
        .from("partner_applications")
        .select("status")
        .ilike("email", normalizedEmail)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(
          "AuthContext: Error checking partner application status:",
          error
        );
        return null;
      }

      const status = data?.status?.trim().toLowerCase() || "not_found";
      console.log("AuthContext: Partner application status result:", status);
      return status as PartnerApplicationStatus;
    } catch (err) {
      console.error(
        "AuthContext: Exception checking partner application status:",
        err
      );
      return null;
    }
  };

  const redirectBasedOnRole = async (currentDetails: UserDetails) => {
    const { role, email: userEmail } = currentDetails;
    console.log("AuthContext: redirectBasedOnRole called for role:", role);

    if (role === "admin") {
      console.log("AuthContext: Navigating admin to /admin");
      navigate("/admin", { replace: true });
    } else if (role === "partner") {
      const applicationStatus = await checkPartnerApplicationStatus(userEmail);
      console.log(
        "AuthContext: Partner application status for redirect:",
        applicationStatus
      );
      if (applicationStatus === "approved") {
        console.log("AuthContext: Navigating approved partner to /partner");
        navigate("/partner", { replace: true });
      } else {
        console.log(
          "AuthContext: Navigating unapproved/pending partner to /partner/application-status"
        );
        navigate("/partner/application-status", { replace: true });
      }
    } else if (role === "customer") {
      console.log("AuthContext: Navigating customer to /customer");
      navigate("/customer", { replace: true });
    } else {
      console.warn("AuthContext: Unknown role for redirect:", role);
      navigate("/", { replace: true });
    }
  };

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
        console.log("AuthContext: User signed in, checking email confirmation");

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
          await redirectBasedOnRole(details);
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
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log("AuthContext: Starting sign in process for:", email);

      cleanupAuthState();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("AuthContext: Sign in error:", error.message);

        if (
          error.message === "Email not confirmed" ||
          (error.message.toLowerCase().includes("email") &&
            error.message.toLowerCase().includes("confirm"))
        ) {
          throw new Error("UNCONFIRMED_EMAIL");
        }
        if (error.message === "Invalid login credentials") {
          throw new Error(
            "Invalid email or password. Please check your credentials and try again."
          );
        }
        throw new Error(error.message || "Sign in failed.");
      }

      if (data.user && !data.user.email_confirmed_at) {
        console.log(
          "AuthContext: Sign in successful but email not confirmed"
        );
        await supabase.auth.signOut();
        throw new Error("UNCONFIRMED_EMAIL");
      }

      console.log("AuthContext: Sign in successful");
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error("AuthContext: Sign in process error:", error);
      if (error.message !== "UNCONFIRMED_EMAIL") {
        toast.error(error.message || "Sign in failed.");
      }
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    role: "admin" | "partner" | "customer",
    linkedPartnerId?: string
  ) => {
    setLoading(true);
    try {
      console.log(
        "AuthContext: Starting sign up process for:",
        email,
        "role:",
        role
      );

      const userDataForSignUp: any = {
        full_name: fullName,
        role,
        ...(linkedPartnerId ? { linked_partner_id: linkedPartnerId } : {}),
      };

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userDataForSignUp,
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.error("AuthContext: Sign up error:", error.message);
        if (
          error.message.includes("User already registered")
        ) {
          throw new Error(
            "An account with this email already exists. Please try signing in instead."
          );
        }
        throw new Error(error.message || "Sign up failed.");
      }

      console.log("AuthContext: Sign up successful");
      toast.success(
        "Registration successful! Please check your email to confirm your account."
      );
    } catch (error: any) {
      console.error("AuthContext: Sign up process error:", error);
      toast.error(error.message || "Sign up failed.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendConfirmation = async (email: string) => {
    try {
      console.log("AuthContext: Resending confirmation email for:", email);
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.error(
          "AuthContext: Error resending confirmation:",
          error
        );
        throw new Error(
          error.message || "Failed to resend confirmation email."
        );
      }

      toast.success("Confirmation email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("AuthContext: Resend confirmation error:", error);
      toast.error(error.message || "Failed to resend confirmation email.");
      throw error;
    }
  };

  const signOut = async () => {
    console.log("A
