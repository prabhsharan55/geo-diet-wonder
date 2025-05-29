
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MainNavigationButtons = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/customer");
  };

  return (
    <div className="flex items-center gap-2">
      <Link to="/partner">
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          Join as Partner
        </Button>
      </Link>
      <Button
        className="bg-gradient-to-r from-[#291759] to-[#858CD3] text-white"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </div>
  );
};

export default MainNavigationButtons;
