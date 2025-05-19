
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, ChevronRight, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenuOpen(prevMenu => prevMenu === menu ? null : menu);
  };
  
  return (
    <header className="w-full sticky top-0 z-50 bg-white">
      {/* Announcement Bar */}
      <div className="w-full h-[50px] md:h-[69px] bg-gradient-to-r from-[#160041] to-[#8D97DE] flex items-center justify-center">
        <p className="text-white text-sm md:text-lg font-normal px-4 text-center">95% pay $0 for nutritionist support. How?</p>
      </div>

      {/* Navigation */}
      <div className="w-full h-[80px] md:h-[116px] bg-white border-b border-gray-100 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1920px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal">
                <span className="text-black">Geo</span>
                <span className="text-[#1B5E20]">Di</span>
                <span className="text-black">et</span>
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 lg:gap-12">
            <div className="flex items-center gap-6 lg:gap-12">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`text-[#2C2C2C] text-lg bg-transparent hover:bg-transparent ${isActive("/shop") ? "font-medium" : ""}`}
                    >
                      Shop
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] bg-white">
                        <Link to="/shop/cgm" className="block p-2 hover:bg-gray-100 rounded-md">CGM Monitoring</Link>
                        <Link to="/shop/workouts" className="block p-2 hover:bg-gray-100 rounded-md">Workout Plans</Link>
                        <Link to="/shop/diet" className="block p-2 hover:bg-gray-100 rounded-md">Diet Plans</Link>
                        <div className="pt-2 mt-2 border-t border-gray-100">
                          <Link to="/shop" className="block p-2 hover:bg-gray-100 rounded-md font-medium">View All Products</Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`text-[#2C2C2C] text-lg bg-transparent hover:bg-transparent ${isActive("/nutritionists") ? "font-medium" : ""}`}
                    >
                      Nutritionists
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-6 w-[400px] bg-white">
                        <Link to="/nutritionists/find" className="block p-2 hover:bg-gray-100 rounded-md">Find a Nutritionist</Link>
                        <Link to="/nutritionists/become" className="block p-2 hover:bg-gray-100 rounded-md">Become a Nutritionist</Link>
                        <Link to="/nutritionists/about" className="block p-2 hover:bg-gray-100 rounded-md">About our Experts</Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link to="/journal" className={`text-[#2C2C2C] text-lg ${isActive("/journal") ? "font-medium" : ""}`}>Journal</Link>
              <Link to="/our-story" className={`text-[#2C2C2C] text-lg ${isActive("/our-story") ? "font-medium" : ""}`}>Our Story</Link>
              <Link to="/contact" className={`text-[#2C2C2C] text-lg ${isActive("/contact") ? "font-medium" : ""}`}>Contact</Link>
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              variant="outline" 
              className="rounded-full px-4 sm:px-8 h-[40px] md:h-[50px] hidden sm:flex"
              asChild
            >
              <Link to="/customer">SIGN IN</Link>
            </Button>
            
            <Button className="rounded-full px-4 sm:px-6 h-[40px] md:h-[50px] bg-[#1A0546] hidden sm:flex" asChild>
              <Link to="/partner">JOIN AS PARTNER</Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-4 px-6 border-b border-gray-100 shadow-md">
          <div className="flex flex-col gap-2">
            {/* Shop Mobile Menu */}
            <div className="border-b border-gray-100 pb-2">
              <button 
                className="flex items-center justify-between w-full text-[#2C2C2C] text-lg py-3"
                onClick={() => toggleMobileSubmenu('shop')}
              >
                <span>Shop</span>
                {mobileSubmenuOpen === 'shop' ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              
              {mobileSubmenuOpen === 'shop' && (
                <div className="pl-4 py-2 flex flex-col gap-2">
                  <Link to="/shop" className="py-2 text-[#2C2C2C]">All Products</Link>
                  <Link to="/shop/cgm" className="py-2 text-[#2C2C2C]">CGM Monitoring</Link>
                  <Link to="/shop/workouts" className="py-2 text-[#2C2C2C]">Workout Plans</Link>
                  <Link to="/shop/diet" className="py-2 text-[#2C2C2C]">Diet Plans</Link>
                </div>
              )}
            </div>
            
            {/* Nutritionists Mobile Menu */}
            <div className="border-b border-gray-100 pb-2">
              <button 
                className="flex items-center justify-between w-full text-[#2C2C2C] text-lg py-3"
                onClick={() => toggleMobileSubmenu('nutritionists')}
              >
                <span>Nutritionists</span>
                {mobileSubmenuOpen === 'nutritionists' ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              
              {mobileSubmenuOpen === 'nutritionists' && (
                <div className="pl-4 py-2 flex flex-col gap-2">
                  <Link to="/nutritionists/find" className="py-2 text-[#2C2C2C]">Find a Nutritionist</Link>
                  <Link to="/nutritionists/become" className="py-2 text-[#2C2C2C]">Become a Nutritionist</Link>
                  <Link to="/nutritionists/about" className="py-2 text-[#2C2C2C]">About our Experts</Link>
                </div>
              )}
            </div>
            
            {/* Other links */}
            <Link to="/journal" className="text-[#2C2C2C] text-lg py-3 border-b border-gray-100">Journal</Link>
            <Link to="/our-story" className="text-[#2C2C2C] text-lg py-3 border-b border-gray-100">Our Story</Link>
            <Link to="/contact" className="text-[#2C2C2C] text-lg py-3 border-b border-gray-100">Contact</Link>
            
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/customer" className="w-full">
                <Button variant="outline" className="rounded-full w-full">
                  SIGN IN
                </Button>
              </Link>
              <Link to="/partner" className="w-full">
                <Button className="rounded-full w-full bg-[#1A0546]">
                  JOIN AS PARTNER
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
