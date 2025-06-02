
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import HealthQuestions from "./HealthQuestions";
import UserDetailsForm from "./UserDetailsForm";
import PlanSelection from "./PlanSelection";
import ClinicSelection from "./ClinicSelection";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type UserData = {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  city: string;
  healthData: Record<string, string>;
  selectedPlan: string;
  clinicId: string;
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
    selectedPlan: "",
    clinicId: ""
  });
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();

  const handleClinicSelection = (clinicId: string) => {
    setUserData(prev => ({ ...prev, clinicId }));
    setStep(2);
  };

  const handleHealthDataSubmit = (healthData: Record<string, string>) => {
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
    setUserData(prev => ({ ...prev, ...details }));
    setStep(4);
  };

  const handlePlanSelection = async (plan: string) => {
    try {
      setUserData(prev => ({ ...prev, selectedPlan: plan }));
      
      // Register the user with Supabase Auth, including clinic metadata
      await signUp(
        userData.email,
        userData.password,
        userData.fullName,
        { 
          clinic_id: userData.clinicId,
          selectedPlan: plan
        }
      );
      
      // Get the current user - if signup was successful, we should have a user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Failed to create user account");
      }
      
      // Store profile data in user_profiles table
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          full_name: userData.fullName,
          mobile: userData.mobile,
          city: userData.city,
          health_data: userData.healthData,
          selected_plan: plan,
          gender: userData.healthData.gender || 'Not specified',
          weight: parseFloat(userData.healthData.weight || '0'),
          height: parseFloat(userData.healthData.height || '0'),
        });

      if (profileError) {
        console.error('Error saving profile data:', profileError);
        toast.error("Profile data could not be saved. Please update in settings.");
      } else {
        toast.success("Registration successful! Welcome to GeoDiet!");
      }
      
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
            <span className="ml-2 font-medium text-sm">Choose Clinic</span>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary ${step > 1 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 2 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span className="ml-2 font-medium text-sm">Health Questions</span>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary ${step > 2 ? "w-full" : "w-0"}`} />
          </div>
          <div className={`flex items-center ${step >= 3 ? "text-primary" : "text-gray-400"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-white" : "bg-gray-200"}`}>
              {step > 3 ? <Check className="h-4 w-4" /> : "3"}
            </div>
            <span className="ml-2 font-medium text-sm">User Details</span>
          </div>
          <div className="h-1 flex-1 mx-2 bg-gray-200">
            <div className={`h-1 bg-primary ${step > 3 ? "w-full" : "w-0"}`} />
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
