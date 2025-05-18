
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full">
      {/* Announcement Bar */}
      <div className="w-full h-[69px] bg-gradient-to-r from-[#160041] to-[#8D97DE] flex items-center justify-center">
        <p className="text-white text-lg font-normal">95% pay $0 for nutritionist support. How?</p>
      </div>

      {/* Navigation */}
      <div className="w-full h-[116px] bg-white border-b border-gray-100 px-4 md:px-8 lg:px-40">
        <div className="max-w-[1920px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-4xl md:text-5xl font-normal">
                <span className="text-black">Geo</span>
                <span className="text-[#1B5E20]">Di</span>
                <span className="text-black">et</span>
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-12">
              <Link to="/shop" className="flex items-center gap-1">
                <span className="text-[#2C2C2C] text-lg">Shop</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L6 9L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              
              <Link to="/nutritionists" className="flex items-center gap-1">
                <span className="text-[#2C2C2C] text-lg">Nutritionists</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L6 9L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link to="/journal" className="text-[#2C2C2C] text-lg">Journal</Link>
              <Link to="/our-story" className="text-[#2C2C2C] text-lg">Our Story</Link>
              <Link to="/contact" className="text-[#2C2C2C] text-lg">Contact</Link>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="rounded-full px-8 h-[50px] hidden md:flex"
              asChild
            >
              <Link to="/dashboard">SIGN IN</Link>
            </Button>
            
            <Button className="rounded-full px-6 h-[50px] bg-[#1A0546] hidden md:flex">
              JOIN AS PARTNER
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 border-b border-gray-100 shadow-md">
          <div className="flex flex-col gap-4">
            <Link to="/shop" className="text-[#2C2C2C] text-lg py-2">Shop</Link>
            <Link to="/nutritionists" className="text-[#2C2C2C] text-lg py-2">Nutritionists</Link>
            <Link to="/journal" className="text-[#2C2C2C] text-lg py-2">Journal</Link>
            <Link to="/our-story" className="text-[#2C2C2C] text-lg py-2">Our Story</Link>
            <Link to="/contact" className="text-[#2C2C2C] text-lg py-2">Contact</Link>
            <Link to="/dashboard" className="text-[#2C2C2C] text-lg py-2">Sign In</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
