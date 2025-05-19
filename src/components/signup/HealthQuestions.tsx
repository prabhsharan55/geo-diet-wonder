
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type HealthQuestionsProps = {
  onSubmit: (healthData: Record<string, string>) => void;
};

const HealthQuestions = ({ onSubmit }: HealthQuestionsProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({
    weightGoal: "",
    activityLevel: "",
    dietRestrictions: "",
    healthConditions: ""
  });

  const handleChange = (question: string, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  const isComplete = Object.values(answers).every(value => value !== "");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Tell us about your health goals</h2>
        <p className="text-muted-foreground">Answer a few questions to help us customize your experience</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">What is your weight management goal?</h3>
          <RadioGroup value={answers.weightGoal} onValueChange={(value) => handleChange("weightGoal", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lose" id="lose" />
              <Label htmlFor="lose">Lose weight</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maintain" id="maintain" />
              <Label htmlFor="maintain">Maintain current weight</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gain" id="gain" />
              <Label htmlFor="gain">Gain weight</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">What's your current activity level?</h3>
          <RadioGroup value={answers.activityLevel} onValueChange={(value) => handleChange("activityLevel", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sedentary" id="sedentary" />
              <Label htmlFor="sedentary">Sedentary (little or no exercise)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light activity (1-3 days/week)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate">Moderately active (3-5 days/week)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very" id="very" />
              <Label htmlFor="very">Very active (6-7 days/week)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Do you have any dietary restrictions?</h3>
          <RadioGroup value={answers.dietRestrictions} onValueChange={(value) => handleChange("dietRestrictions", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">No restrictions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vegetarian" id="vegetarian" />
              <Label htmlFor="vegetarian">Vegetarian</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vegan" id="vegan" />
              <Label htmlFor="vegan">Vegan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="glutenFree" id="glutenFree" />
              <Label htmlFor="glutenFree">Gluten-free</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Do you have any health conditions we should know about?</h3>
          <RadioGroup value={answers.healthConditions} onValueChange={(value) => handleChange("healthConditions", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="noConditions" />
              <Label htmlFor="noConditions">No health conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="diabetes" id="diabetes" />
              <Label htmlFor="diabetes">Diabetes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hypertension" id="hypertension" />
              <Label htmlFor="hypertension">Hypertension</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#291759] to-[#858CD3]"
            disabled={!isComplete}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HealthQuestions;
