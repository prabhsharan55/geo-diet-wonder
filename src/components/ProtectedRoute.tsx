
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "partner" | "customer";
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userDetails, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If role is required and user doesn't have the role, redirect to appropriate dashboard
  if (requiredRole && userDetails?.role !== requiredRole) {
    // Redirect based on the user's actual role
    if (userDetails?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userDetails?.role === 'partner') {
      return <Navigate to="/partner" replace />;
    } else if (userDetails?.role === 'customer') {
      return <Navigate to="/customer" replace />;
    }
    
    // If role is still loading or undefined, redirect to auth page
    return <Navigate to="/auth" replace />;
  }

  // If authenticated and has the required role (or no role required), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
