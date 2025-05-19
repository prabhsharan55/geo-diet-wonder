
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "partner" | "customer";
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userDetails, loading } = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    // Only calculate the redirect path once when authentication is complete
    if (!loading) {
      if (!user) {
        setRedirectPath("/auth");
      } else if (requiredRole && userDetails?.role !== requiredRole) {
        // Redirect based on the user's actual role
        if (userDetails?.role === 'admin') {
          setRedirectPath("/admin");
        } else if (userDetails?.role === 'partner') {
          setRedirectPath("/partner");
        } else if (userDetails?.role === 'customer') {
          setRedirectPath("/customer");
        } else {
          setRedirectPath("/auth");
        }
      } else {
        // No redirect needed
        setRedirectPath(null);
      }
    }
  }, [user, userDetails?.role, loading, requiredRole]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Handle redirects
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated and has the required role (or no role required), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
