
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "admin" | "partner" | "customer";
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userDetails, loading } = useAuth();

  console.log('ProtectedRoute check:', { 
    user: !!user, 
    userDetails: userDetails ? { role: userDetails.role } : null, 
    loading, 
    requiredRole 
  });

  // Show loading state
  if (loading) {
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

  // If userDetails is null but user exists, wait a moment for it to load
  if (!userDetails) {
    console.log('User exists but no userDetails yet, showing loading');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Has required role or no role required - allow access
  if (!requiredRole || userDetails?.role === requiredRole) {
    console.log('Access granted');
    return <>{children}</>;
  }

  // Wrong role - redirect based on actual role
  console.log('Wrong role, redirecting based on actual role:', userDetails?.role);
  if (userDetails?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (userDetails?.role === 'partner') {
    return <Navigate to="/partner" replace />;
  } else if (userDetails?.role === 'customer') {
    return <Navigate to="/customer" replace />;
  } else {
    return <Navigate to="/auth" replace />;
  }
};

export default ProtectedRoute;
