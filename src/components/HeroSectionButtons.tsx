
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const HeroSectionButtons = () => {
  const handleGetStarted = async () => {
    try {
      // Force complete sign out to clear any existing session
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear all auth-related storage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Force page refresh to completely clear state
      window.location.href = '/signup';
    } catch (error) {
      console.error('Error signing out:', error);
      // Still redirect even if sign out fails
      window.location.href = '/signup';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        size="lg" 
        className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      <Button 
        variant="outline" 
        size="lg" 
        asChild
        className="border-2 border-[#3A2D70] text-[#3A2D70] px-8 py-3 rounded-full hover:bg-[#3A2D70] hover:text-white transition-all duration-300"
      >
        <Link to="/our-story">Learn More</Link>
      </Button>
    </div>
  );
};

export default HeroSectionButtons;
