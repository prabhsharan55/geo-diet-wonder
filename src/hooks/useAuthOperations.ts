
// src/hooks/useAuthOperations.ts

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cleanupAuthState } from "@/utils/authUtils";

export const useAuthOperations = () => {
  const signIn = async (email: string, password: string) => {
    try {
      console.log("AuthOperations: Starting sign in process for:", email);

      cleanupAuthState();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("AuthOperations: Sign in error:", error.message);

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
          "AuthOperations: Sign in successful but email not confirmed"
        );
       await supabase.auth.signOut();
        throw new Error("UNCONFIRMED_EMAIL");
      }

      console.log("AuthOperations: Sign in successful");
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error("AuthOperations: Sign in process error:", error);
      if (error.message !== "UNCONFIRMED_EMAIL") {
        toast.error(error.message || "Sign in failed.");
      }
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
    try {
      console.log(
        "AuthOperations: Starting sign up process for:",
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
        console.error("AuthOperations: Sign up error:", error.message);
        if (error.message.includes("User already registered")) {
          throw new Error(
            "An account with this email already exists. Please try signing in instead."
          );
        }
        throw new Error(error.message || "Sign up failed.");
      }

      console.log("AuthOperations: Sign up successful");
      toast.success(
        "Registration successful! Please check your email to confirm your account."
      );
    } catch (error: any) {
      console.error("AuthOperations: Sign up process error:", error);
      toast.error(error.message || "Sign up failed.");
      throw error;
    }
  };

  const resendConfirmation = async (email: string) => {
    try {
      console.log("AuthOperations: Resending confirmation email for:", email);
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.error("AuthOperations: Error resending confirmation:", error);
        throw new Error(
          error.message || "Failed to resend confirmation email."
        );
      }

      toast.success("Confirmation email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("AuthOperations: Resend confirmation error:", error);
      toast.error(error.message || "Failed to resend confirmation email.");
      throw error;
    }
  };

  const signOut = async () => {
    console.log("AuthOperations: Starting sign out process");

    try {
      console.log("Entered in signout ")
      cleanupAuthState();
      console.log("Clearing session andlocal storage");

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("AuthOperations: Supabase sign out error:", error);
      }

      console.log("AuthOperations: Sign out successful, redirecting to home");
      toast.success("Signed out successfully");
      
      // Force a complete page reload to ensure clean state
      window.location.href = "/";
    } catch (error: any) {
      console.error("AuthOperations: Sign out process error:", error);
      toast.error(error.message || "Failed to sign out.");
      // Even if sign out fails, redirect to home
      window.location.href = "/";
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    resendConfirmation,
  };
};
