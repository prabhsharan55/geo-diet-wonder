// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface UserDetails {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "partner" | "customer";
  linked_partner_id?: string;
  created_at?: string;
}

interface AuthContextValue {
  user: UserDetails | null;                     // renamed from userDetails
  loading: boolean;                             // renamed from loading
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
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

  // 1) Listen for Supabase auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: u, error } = await supabase
          .from("users")
          // Remove `approval_status` since that column does not exist
          .select("id, email, full_name, role, linked_partner_id, created_at")
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

    // 1a) On mount, check whether there's an existing session
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: u } = await supabase
          .from("users")
          .select("id, email, full_name, role, linked_partner_id, created_at")
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

  // 2) signIn
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
    // onAuthStateChange listener will populate `user`
  };

  // 3) Generic signUp (only Supabase Auth; user table insert handled elsewhere)
  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      throw error;
    }
    // Don’t insert into `users` here—SignupWizard or a component should do that
  };

  // 4) signUpCustomer inserts into `users` table
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
      created_at: new Date().toISOString(),
    });
    if (insertErr) {
      setLoading(false);
      throw insertErr;
    }
    // onAuthStateChange listener will fire next
  };

  // 5) signUpPartner inserts into `users` and `clinics`
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
    // Insert into `users` table
    const { error: userErr } = await supabase.from("users").insert({
      id: userId,
      email,
      full_name: fullName,
      role: "partner",
      created_at: new Date().toISOString(),
    });
    if (userErr) {
      setLoading(false);
      throw userErr;
    }

    // Insert into `clinics` table (use actual column names from your schema)
    const { error: clinicErr } = await supabase.from("clinics").insert({
      owner_email: email,            // if your table uses owner_email instead of user_id
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
    // onAuthStateChange listener will fire next
  };

  // 6) resendConfirmation
  const resendConfirmation = async (email: string) => {
    setLoading(true);
    // The Supabase JS method is `.resendConfirmationEmail(...)`—adjust to your installed version
    const { data, error } = await supabase.auth.resendConfirmationEmail(email);
    setLoading(false);
    if (error) {
      throw error;
    }
    return data;
  };

  // 7) signOut
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
