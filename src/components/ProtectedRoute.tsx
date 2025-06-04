import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client"; // Assuming this client is correctly initialized

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "partner" | "customer";
  requireApproval?: boolean; // Specifically for partners to access approved-only routes
};

// Define expected statuses from 'partner_applications' table
type PartnerApplicationStatus = 'pending' | 'approved' | 'rejected' | 'not_found' | string | null;

const ProtectedRoute = ({ children, requiredRole, requireApproval = false }: ProtectedRouteProps) => {
  const { user, userDetails, loading: authLoading } = useAuth(); // Renamed loading to authLoading
  const [partnerApplicationStatus, setPartnerApplicationStatus] = useState<PartnerApplicationStatus>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    // This effect should only run if the user is a partner and approval status needs to be checked
    // for this specific route (due to requireApproval = true).
    // It fetches from 'partner_applications', not 'users.approval_status'.
    if (user && userDetails?.role === 'partner' && requiredRole === 'partner' && requireApproval) {
      setStatusLoading(true);
      const checkPartnerDbStatus = async () => {
        // Ensure user.email is available for the query
        if (!user.email) {
            console.error('ProtectedRoute: Partner email not available for status check.');
            setPartnerApplicationStatus('not_found'); // Or handle as an error
            setStatusLoading(false);
            return;
        }
        const userEmail = user.email.trim().toLowerCase();
        console.log('ProtectedRoute: Checking partner application status for email:', userEmail);
        
        const { data, error } = await supabase
          .from("partner_applications") // This table should exist and have 'email' and 'status'
          .select("status")
          .ilike("email", userEmail) // Case-insensitive like
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('ProtectedRoute: Error checking partner application status:', error);
          setPartnerApplicationStatus(null); // Represents an error or unknown state
        } else if (!data) {
          console.log('ProtectedRoute: No partner application found for email:', userEmail);
          setPartnerApplicationStatus('not_found');
        } else {
          const status = data.status?.trim().toLowerCase() || null;
          console.log('ProtectedRoute: Partner application status from DB:', status);
          setPartnerApplicationStatus(status as PartnerApplicationStatus);
        }
        setStatusLoading(false);
      };

      checkPartnerDbStatus();
    } else {
      // If not a partner requiring approval check for this route, ensure statusLoading is false.
      if (userDetails?.role !== 'partner' || !requireApproval) {
        setStatusLoading(false);
        setPartnerApplicationStatus(null); // Reset if not applicable
      }
    }
  }, [user, userDetails?.role, requiredRole, requireApproval]); // user.email could be a dependency if stable


  // Consolidate loading state
  const isLoading = authLoading || statusLoading;

  if (process.env.NODE_ENV === 'development') { // Conditional logging
    console.log('ProtectedRoute Debug:', {
      isAuthenticated: !!user,
      roleFromAuthContext: userDetails?.role,
      approvalStatusFromUsersTable: userDetails?.approval_status, // From users table via AuthContext
      partnerApplicationStatusFromDb: partnerApplicationStatus, // From partner_applications table
      authLoading,
      partnerStatusLoading: statusLoading,
      requiredRole,
      requireApprovalForThisRoute: requireApproval,
      isActuallyLoading: isLoading,
    });
  }


  if (isLoading) {
    console.log('ProtectedRoute: Loading authentication or partner status...');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: No user found, redirecting to login.');
    // Redirect to admin login if trying to access an admin route, else general auth
    return <Navigate to={requiredRole === 'admin' ? "/admin/login" : "/auth"} replace />;
  }

  // User is authenticated, now check userDetails (which contains role, etc.)
  if (!userDetails) {
    // This state should ideally be brief if user is authenticated.
    // It might indicate userDetails are still being fetched by AuthContext.
    // AuthContext's 'loading' should cover this, but as a fallback:
    console.log('ProtectedRoute: User authenticated, but userDetails not yet available. Showing loader.');
    return (
      <div className="flex items-center justify-center h-screen">
         <p>Loading user details...</p> {/* Fallback loader */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Role check: Does the user have the required role for this route?
  if (requiredRole && userDetails.role !== requiredRole) {
    console.log(`ProtectedRoute: Role mismatch. User role: ${userDetails.role}, Required role: ${requiredRole}. Redirecting.`);
    // User has a role, but it's not the one required for this route.
    // Redirect them to their appropriate default dashboard.
    if (userDetails.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userDetails.role === 'partner') {
      // For partner, approval_status from 'users' table (via userDetails) is for general access.
      // The partnerApplicationStatus is for specific application check.
      // The redirect from redirectBasedOnRole should already handle this.
      // If they land here due to wrong role, send to their default.
      if (userDetails.approval_status === 'approved') {
         return <Navigate to="/partner" replace />;
      } else {
         return <Navigate to="/partner/application-status" replace />;
      }
    } else if (userDetails.role === 'customer') {
      return <Navigate to="/customer" replace />;
    } else {
      // Fallback if role is unknown or not handled above
      console.warn('ProtectedRoute: Unknown user role for redirect:', userDetails.role);
      return <Navigate to="/auth" replace />;
    }
  }

  // Approval check (specifically for partners on routes that require approval)
  // This uses partnerApplicationStatus fetched from 'partner_applications' if requireApproval is true.
  // Note: Your 'users' table also has an 'approval_status'. Ensure clarity on which one is used where.
  // This 'requireApproval' flag seems to imply a check against 'partner_applications.status'.
  if (requiredRole === 'partner' && requireApproval) {
    if (partnerApplicationStatus !== 'approved') {
      console.log(`ProtectedRoute: Partner requires approval for this route, but status is '${partnerApplicationStatus}'. Redirecting.`);
      return <Navigate to="/partner/application-status" replace />;
    }
  }

  // If all checks pass
  console.log(`ProtectedRoute: Access GRANTED for role '${userDetails.role}' to a route requiring '${requiredRole || 'any authenticated'}'.`);
  return <>{children}</>;
};

export default ProtectedRoute;





// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Assuming your routes use paths like:
//   /admin/*     → only admins
//   /partner/*   → only partners
//   /customer/*  → only customers
//   /auth/*      → sign-in / sign-up screens

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While loading the auth state, render nothing (or a spinner)
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's no logged-in user at all, redirect to /auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access:
  const path = location.pathname;

  // Admin pages
  if (path.startsWith("/admin")) {
    if (user.role !== "admin") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // Partner pages
  if (path.startsWith("/partner")) {
    if (user.role !== "partner") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // Customer pages
  if (path.startsWith("/customer")) {
    if (user.role !== "customer") {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // Any other route (public) – just render it
  return <Outlet />;
};

export default ProtectedRoute;
