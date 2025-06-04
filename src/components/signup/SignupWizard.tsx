
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import HealthQuestions from "./HealthQuestions";
import UserDetailsForm from "./UserDetailsForm";
import PlanSelection from "./PlanSelection";
import ClinicSelection from "./ClinicSelection";
import SignupSuccess from "./SignupSuccess";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

type UserData = {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  city: string;
  healthData: Record<string, string>;
  selectedPlan: string;
  linkedPartnerId: string;
}

const SignupWizard = () => {
  const [step, setStep] = useState(1);
  const [signupComplete, setSignupComplete] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    healthData: {},
    selectedPlan: "",
    linkedPartnerId: ""
  });
  const { signUp, loading } = useAuth();

  const handleClinicSelection = (partnerId: string) => {
    console.log('Clinic selected:', partnerId);
    setUserData(prev => ({ ...prev, linkedPartnerId: partnerId }));
    setStep(2);
  };

  const handleHealthDataSubmit = (healthData: Record<string, string>) => {
    console.log('Health data submitted:', healthData);
    setUserData(prev => ({ ...prev, healthData }));
    setStep(3);
  };

  const handleUserDetailsSubmit = (details: {
    fullName: string;
    email: string;
    password: string;
    mobile: string;
    city: string;
  }) => {
    console.log('User details submitted:', details);
    setUserData(prev => ({ ...prev, ...details }));
    setStep(4);
  };

  const handlePlanSelection = async (plan: string) => {
    console.log('Plan selected:', plan);
    console.log('Final user data:', { ...userData, selectedPlan: plan });
    
    try {
      setUserData(prev => ({ ...prev, selectedPlan: plan }));
      
      // Register the user as a customer
      await signUp(
        userData.email,
        userData.password,
        userData.fullName,
        'customer',
        userData.linkedPartnerId
      );
      
      console.log('Signup completed successfully');
      setSignupComplete(true);
      toast.success("Registration successful! Please check your email to confirm your account.");
      
    } catch (error: any) {
      console.error('Signup error:', error);
      
      // Handle specific signup errors with better messaging
      let errorMessage = "Failed to complete registration";
      
      if (error.message?.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Please try signing in instead.";
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message?.includes('Password')) {
        errorMessage = "Password must be at least 6 characters long.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    }
  };

  // Show success page after signup
  if (signupComplete) {
    return <SignupSuccess email={userData.email} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className="ml-2 font-medium text-sm">Choose Partner</span>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary transition-all duration-300 ${step > 1 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span className="ml-2 font-medium text-sm">Health Questions</span>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary transition-all duration-300 ${step > 2 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 3 ? <Check className="h-4 w-4" /> : "3"}
            </div>
            <span className="ml-2 font-medium text-sm">User Details</span>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary transition-all duration-300 ${step > 3 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 4 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary text-white" : "bg-gray-200"}`}>
              "4"
            </div>
            <span className="ml-2 font-medium text-sm">Choose Plan</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {step === 1 && (
            <ClinicSelection onSelectClinic={handleClinicSelection} />
          )}
          
          {step === 2 && (
            <HealthQuestions onSubmit={handleHealthDataSubmit} />
          )}
          
          {step === 3 && (
            <UserDetailsForm onSubmit={handleUserDetailsSubmit} />
          )}
          
          {step === 4 && (
            <PlanSelection onSelectPlan={handlePlanSelection} isLoading={loading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupWizard;
