
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import SignupWizard from "@/components/signup/SignupWizard";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const SignupPage = () => {
  const { user } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/customer" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container mx-auto py-12">
        <SignupWizard />
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
