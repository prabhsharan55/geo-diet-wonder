
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import HealthQuestions from "./HealthQuestions";
import UserDetailsForm from "./UserDetailsForm";
import PlanSelection from "./PlanSelection";
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
}

const SignupWizard = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    healthData: {},
    selectedPlan: ""
  });
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();

  const handleHealthDataSubmit = (healthData: Record<string, string>) => {
    setUserData(prev => ({ ...prev, healthData }));
    setStep(2);
  };

  const handleUserDetailsSubmit = (details: {
    fullName: string;
    email: string;
    password: string;
    mobile: string;
    city: string;
  }) => {
    setUserData(prev => ({ ...prev, ...details }));
    setStep(3);
  };

  const handlePlanSelection = async (plan: string) => {
    try {
      setUserData(prev => ({ ...prev, selectedPlan: plan }));
      
      // Register the user with Supabase
      await signUp(
        userData.email,
        userData.password,
        userData.fullName,
        {
          mobile: userData.mobile,
          city: userData.city,
          healthData: userData.healthData,
          selectedPlan: plan
        }
      );
      
      toast.success("Registration successful! Welcome to GeoDiet!");
      
      // Force navigate and reload to ensure auth state is properly updated
      window.location.href = '/customer';
    } catch (error: any) {
      toast.error(error.message || "Failed to complete registration");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center ${step >= 1 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className="ml-2 font-medium">Health Questions</span>
          </div>
          <div className="h-1 flex-1 mx-4 bg-gray-200">
            <div className={`h-1 bg-primary ${step > 1 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span className="ml-2 font-medium">User Details</span>
          </div>
          <div className="h-1 flex-1 mx-4 bg-gray-200">
            <div className={`h-1 bg-primary ${step > 2 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}>
              "3"
            </div>
            <span className="ml-2 font-medium">Choose Plan</span>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {step === 1 && (
            <HealthQuestions onSubmit={handleHealthDataSubmit} />
          )}
          
          {step === 2 && (
            <UserDetailsForm onSubmit={handleUserDetailsSubmit} />
          )}
          
          {step === 3 && (
            <PlanSelection onSelectPlan={handlePlanSelection} isLoading={loading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupWizard;
