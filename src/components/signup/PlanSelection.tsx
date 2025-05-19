
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

type PlanSelectionProps = {
  onSelectPlan: (plan: string) => void;
  isLoading: boolean;
};

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    price: "15.99",
    billing: "monthly",
    features: [
      "Track CGM Data",
      "Basic Diet Recommendations",
      "Email Support"
    ]
  },
  {
    id: "standard",
    name: "Standard Plan",
    price: "29.99",
    billing: "monthly",
    popular: true,
    features: [
      "Track CGM Data",
      "Personalized Diet Plans",
      "Weekly Check-ins",
      "Priority Support",
      "Video Consultations"
    ]
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "49.99",
    billing: "monthly",
    features: [
      "Track CGM Data",
      "Advanced Personalized Diet Plans",
      "Daily Check-ins",
      "24/7 Priority Support",
      "Weekly Video Consultations",
      "Personalized Workout Plans",
      "Monthly Health Reports"
    ]
  }
];

const PlanSelection = ({ onSelectPlan, isLoading }: PlanSelectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground">Select a plan that works best for you</p>
      </div>

      <RadioGroup 
        value={selectedPlan} 
        onValueChange={setSelectedPlan}
        className="grid gap-6 md:grid-cols-3"
      >
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative rounded-lg border p-6 shadow-sm transition-all
              ${selectedPlan === plan.id ? "border-primary ring-2 ring-primary ring-opacity-50" : ""}
              ${plan.popular ? "border-primary" : ""}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
            )}
            
            <RadioGroupItem 
              value={plan.id} 
              id={plan.id} 
              className="hidden"
            />
            
            <Label htmlFor={plan.id} className="cursor-pointer block">
              <div className="mb-4 text-center">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billing}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="pt-4">
        <Button 
          onClick={() => selectedPlan && onSelectPlan(selectedPlan)}
          className="w-full bg-gradient-to-r from-[#291759] to-[#858CD3]"
          disabled={!selectedPlan || isLoading}
        >
          {isLoading ? "Creating Your Account..." : "Complete Registration"}
        </Button>
      </div>
    </div>
  );
};

export default PlanSelection;
