// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom"; // replaced next/router with react-router
import { supabase } from "@/integrations/supabase/client";

interface UserDetails {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "partner" | "customer";
  approval_status?: "pending" | "approved";
  linked_partner_id?: string;
  created_at?: string;
}

interface AuthContextValue {
  user: UserDetails | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
    extra?: any
  ) => Promise<void>;
  signUpCustomer: (
    email: string,
    password: string,
    fullName: string,
    partnerId: string
  ) => Promise<void>;
  signUpPartner: (
    email: string,
    password: string,
    fullName: string,
    clinicInfo: {
      name: string;
      address: string;
      postal_code: string;
      city: string;
      region: string;
    }
  ) => Promise<void>;
  resendConfirmation: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen for Supabase auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: u, error } = await supabase
          .from("users")
          .select(
            "id, email, full_name, role, approval_status, linked_partner_id, created_at"
          )
          .eq("id", session.user.id)
          .single();

        if (u && !error) {
          setUser(u as UserDetails);
        } else {
          setUser(null);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
      setLoading(false);
    });

    // On mount, check if there's already a session
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: u } = await supabase
          .from("users")
          .select(
            "id, email, full_name, role, approval_status, linked_partner_id, created_at"
          )
          .eq("id", session.user.id)
          .single();
        setUser(u as UserDetails);
      } else {
        setUser(null);
      }
      setLoading(false);
    })();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Basic signIn
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      throw error;
    }
    // onAuthStateChange will update `user`
  };

  // Generic signUp
  const signUp = async (
    email: string,
    password: string,
    fullName?: string,
    extra?: any
  ) => {
    setLoading(true);
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      throw error;
    }
    // DB insertion of `users` row should be handled elsewhere
  };

  // signUpCustomer
  const signUpCustomer = async (
    email: string,
    password: string,
    fullName: string,
    partnerId: string
  ) => {
    setLoading(true);
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authErr) {
      setLoading(false);
      throw authErr;
    }

    const userId = authData.user?.id!;
    const { error: insertErr } = await supabase.from("users").insert({
      id: userId,
      email,
      full_name: fullName,
      role: "customer",
      linked_partner_id: partnerId,
      approval_status: null,
      created_at: new Date().toISOString(),
    });
    if (insertErr) {
      setLoading(false);
      throw insertErr;
    }
    // onAuthStateChange will fire next
  };

  // signUpPartner
  const signUpPartner = async (
    email: string,
    password: string,
    fullName: string,
    clinicInfo: {
      name: string;
      address: string;
      postal_code: string;
      city: string;
      region: string;
    }
  ) => {
    setLoading(true);
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authErr) {
      setLoading(false);
      throw authErr;
    }

    const userId = authData.user?.id!;
    const { error: userErr } = await supabase.from("users").insert({
      id: userId,
      email,
      full_name: fullName,
      role: "partner",
      approval_status: "pending",
      created_at: new Date().toISOString(),
    });
    if (userErr) {
      setLoading(false);
      throw userErr;
    }

    const { error: clinicErr } = await supabase.from("clinics").insert({
      owner_email: email,
      name: clinicInfo.name,
      address: clinicInfo.address,
      postal_code: clinicInfo.postal_code,
      city: clinicInfo.city,
      region: clinicInfo.region,
      created_at: new Date().toISOString(),
    });
    if (clinicErr) {
      setLoading(false);
      throw clinicErr;
    }
    // onAuthStateChange will fire next
  };

  // resendConfirmation
  const resendConfirmation = async (email: string) => {
    setLoading(true);
    const { data, error } =
      await supabase.auth.resendConfirmationForEmail(email);
    setLoading(false);
    if (error) {
      throw error;
    }
    return data;
  };

  // signOut
  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("AuthContext: Sign out error:", error.message);
      setLoading(false);
      return;
    }
    setUser(null);
    setLoading(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signUpCustomer,
        signUpPartner,
        resendConfirmation,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
