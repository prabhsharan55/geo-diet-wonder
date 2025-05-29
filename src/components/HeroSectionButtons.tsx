
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSectionButtons = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/customer");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        onClick={handleGetStarted}
        className="bg-gradient-to-r from-[#291759] to-[#858CD3] text-white rounded-full h-[62px] px-8 text-lg"
      >
        Get Started
        <ArrowRight className="ml-2 h-6 w-6" />
      </Button>
      <Button
        onClick={() => navigate("/shop")}
        variant="outline"
        className="border-2 border-[#291759] text-[#291759] rounded-full h-[62px] px-8 text-lg font-medium"
      >
        View Plans
      </Button>
    </div>
  );
};

export default HeroSectionButtons;
