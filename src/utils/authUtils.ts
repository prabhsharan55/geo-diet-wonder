
// src/utils/authUtils.ts

import { supabase } from "@/integrations/supabase/client";
import { UserDetails, PartnerApplicationStatus } from "@/types/auth";

export const cleanupAuthState = () => {
  console.log("AuthUtils: Cleaning up auth state");
  localStorage.clear();
  
  sessionStorage.clear();
};

export const fetchUserDetails = async (
  userId: string
): Promise<UserDetails | null> => {
  try {
    console.log("AuthUtils: Fetching user details for ID:", userId);
    const { data, error } = await supabase
      .from("users")
      .select("id, email, full_name, role, created_at")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("AuthUtils: Error fetching user details:", error);
      return null;
    }
    console.log("AuthUtils: User details fetched successfully:", data);
    return data as UserDetails;
  } catch (err) {
    console.error("AuthUtils: Exception fetching user details:", err);
    return null;
  }
};

export const checkPartnerApplicationStatus = async (
  userEmail: string
): Promise<PartnerApplicationStatus> => {
  try {
    const normalizedEmail = userEmail.trim().toLowerCase();
    console.log(
      "AuthUtils: Checking partner application status for email:",
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
        "AuthUtils: Error checking partner application status:",
        error
      );
      return null;
    }

    const status = data?.status?.trim().toLowerCase() || "not_found";
    console.log("AuthUtils: Partner application status result:", status);
    return status as PartnerApplicationStatus;
  } catch (err) {
    console.error(
      "AuthUtils: Exception checking partner application status:",
      err
    );
    return null;
  }
};
