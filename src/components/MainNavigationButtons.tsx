
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MainNavigationButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/partner-signup">
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          Join as Partner
        </Button>
      </Link>
      <Link to="/auth">
        <Button
          className="bg-gradient-to-r from-[#291759] to-[#858CD3] text-white"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
};

export default MainNavigationButtons;
