// src/components/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client"; // Ensure this path is correct

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "partner" | "customer";
  requireApproval?: boolean; // For partner routes that need approval from 'partner_applications'
};

type PartnerApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "not_found"
  | string
  | null;

const ProtectedRoute = ({
  children,
  requiredRole,
  requireApproval = false,
}: ProtectedRouteProps) => {
  const { user, userDetails, loading: authLoading } = useAuth();
  const [partnerApplicationStatus, setPartnerApplicationStatus] =
    useState<PartnerApplicationStatus>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    if (
      user &&
      userDetails?.role === "partner" &&
      requiredRole === "partner" &&
      requireApproval
    ) {
      setStatusLoading(true);

      const checkPartnerDbStatus = async () => {
        if (!user.email) {
          console.error(
            "ProtectedRoute: Partner email not available for status check."
          );
          setPartnerApplicationStatus("not_found");
          setStatusLoading(false);
          return;
        }
        const userEmail = user.email.trim().toLowerCase();
        console.log(
          "ProtectedRoute: Checking partner application status for email:",
          userEmail
        );

        const { data, error } = await supabase
          .from("partner_applications")
          .select("status")
          .ilike("email", userEmail)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error(
            "ProtectedRoute: Error checking partner application status:",
            error
          );
          setPartnerApplicationStatus(null);
        } else if (!data) {
          console.log(
            "ProtectedRoute: No partner application found for email:",
            userEmail
          );
          setPartnerApplicationStatus("not_found");
        } else {
          const status = data.status?.trim().toLowerCase() || null;
          console.log(
            "ProtectedRoute: Partner application status from DB:",
            status
          );
          setPartnerApplicationStatus(status as PartnerApplicationStatus);
        }
        setStatusLoading(false);
      };

      checkPartnerDbStatus();
    } else {
      if (userDetails?.role !== "partner" || !requireApproval) {
        setStatusLoading(false);
        setPartnerApplicationStatus(null);
      }
    }
  }, [user, userDetails?.role, requiredRole, requireApproval]);

  const isLoading = authLoading || statusLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to={requiredRole === "admin" ? "/admin/login" : "/auth"} replace />
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading user details...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Role mismatch
  if (requiredRole && userDetails.role !== requiredRole) {
    if (userDetails.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (userDetails.role === "partner") {
      return <Navigate to="/partner" replace />;
    } else if (userDetails.role === "customer") {
      return <Navigate to="/customer" replace />;
    } else {
      return <Navigate to="/auth" replace />;
    }
  }

  // Partner approval required for certain routes
  if (requiredRole === "partner" && requireApproval) {
    if (partnerApplicationStatus !== "approved") {
      return <Navigate to="/partner/application-status" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
