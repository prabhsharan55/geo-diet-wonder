// src/context/AuthContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router"; // If you use React Router, swap this for useNavigate
import { supabase } from "@/integrations/supabase/client";

interface UserDetails {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "partner" | "customer";
  approval_status?: "pending" | "approved";
  linked_partner_id?: string;
}

interface AuthContextValue {
  userDetails: UserDetails | null;
  signIn: (email: string, password: string) => Promise<void>;
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
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  // Listen for Supabase auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          // Fetch the corresponding row from `users` table
          const { data: u, error } = await supabase
            .from("users")
            .select(
              "id, email, full_name, role, approval_status, linked_partner_id"
            )
            .eq("id", session.user.id)
            .single();

          if (u && !error) {
            setUserDetails(u as UserDetails);
          } else {
            setUserDetails(null);
          }
        } else if (event === "SIGNED_OUT") {
          setUserDetails(null);
        }
      }
    );

    // On mount, check if there's already a session
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: u } = await supabase
          .from("users")
          .select(
            "id, email, full_name, role, approval_status, linked_partner_id"
          )
          .eq("id", session.user.id)
          .single();
        setUserDetails(u as UserDetails);
      }
    })();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // signIn method
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    // onAuthStateChange will populate userDetails
  };

  // signUpCustomer
  const signUpCustomer = async (
    email: string,
    password: string,
    fullName: string,
    partnerId: string
  ) => {
    // Create Supabase Auth user
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authErr) {
      throw authErr;
    }

    // Insert into `users` table
    const userId = authData.user?.id!;
    const { error: insertErr } = await supabase.from("users").insert({
      id: userId,
      email,
      full_name: fullName,
      role: "customer",
      linked_partner_id: partnerId,
      approval_status: null,
    });
    if (insertErr) {
      throw insertErr;
    }
    // onAuthStateChange will fire and set userDetails
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
    // Create Supabase Auth user
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authErr) {
      throw authErr;
    }

    // Insert into `users` table
    const userId = authData.user?.id!;
    const { error: userErr } = await supabase.from("users").insert({
      id: userId,
      email,
      full_name: fullName,
      role: "partner",
      approval_status: "pending",
    });
    if (userErr) {
      throw userErr;
    }

    // Insert into `clinics` table
    const { error: clinicErr } = await supabase.from("clinics").insert({
      user_id: userId,
      name: clinicInfo.name,
      address: clinicInfo.address,
      postal_code: clinicInfo.postal_code,
      city: clinicInfo.city,
      region: clinicInfo.region,
    });
    if (clinicErr) {
      throw clinicErr;
    }
    // onAuthStateChange will set userDetails (role=partner, status=pending)
  };

  // signOut method
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("AuthContext: Sign out error:", error.message);
      return;
    }
    setUserDetails(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ userDetails, signIn, signUpCustomer, signUpPartner, signOut }}
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
