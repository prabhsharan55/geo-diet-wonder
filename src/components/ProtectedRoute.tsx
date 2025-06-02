
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "partner" | "customer";
  requireApproval?: boolean;
};

const ProtectedRoute = ({ children, requiredRole, requireApproval = false }: ProtectedRouteProps) => {
  const { user, userDetails, loading } = useAuth();
  const [partnerStatus, setPartnerStatus] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  // Check partner application status if needed
  useEffect(() => {
    if (user?.email && userDetails?.role === 'partner' && requireApproval) {
      setStatusLoading(true);
      
      const checkPartnerStatus = async () => {
        const userEmail = user.email.trim().toLowerCase();
        
        const { data, error } = await supabase
          .from("partner_applications")
          .select("status")
          .ilike("email", userEmail)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Error checking partner status:', error);
          setPartnerStatus(null);
        } else if (!data) {
          setPartnerStatus('not_found');
        } else {
          setPartnerStatus(data.status?.trim().toLowerCase() || null);
        }
        
        setStatusLoading(false);
      };

      checkPartnerStatus();
    } else {
      setStatusLoading(false);
    }
  }, [user?.email, userDetails?.role, requireApproval]);

  console.log('ProtectedRoute check:', { 
    user: !!user, 
    userDetails: userDetails ? { role: userDetails.role, approval_status: userDetails.approval_status } : null, 
    loading, 
    statusLoading,
    partnerStatus,
    requiredRole,
    requireApproval
  });

  // Show loading state while checking auth
  if (loading || statusLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Not authenticated - redirect to auth
  if (!user) {
    console.log('No user, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }

  // If user exists but userDetails is null, wait a bit more
  if (!userDetails) {
    console.log('User exists but no userDetails, showing loading...');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check role requirement
  if (requiredRole && userDetails?.role !== requiredRole) {
    console.log('Wrong role, redirecting based on actual role:', userDetails?.role);
    if (userDetails?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userDetails?.role === 'partner') {
      // For partners, check application status
      if (partnerStatus === 'pending' || partnerStatus === 'not_found' || !partnerStatus) {
        return <Navigate to="/partner/application-status" replace />;
      } else {
        return <Navigate to="/partner" replace />;
      }
    } else if (userDetails?.role === 'customer') {
      return <Navigate to="/customer" replace />;
    } else {
      return <Navigate to="/auth" replace />;
    }
  }

  // Check approval requirement for partners
  if (requireApproval && userDetails?.role === 'partner') {
    if (partnerStatus !== 'approved') {
      return <Navigate to="/partner/application-status" replace />;
    }
  }

  // Access granted
  console.log('Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;
