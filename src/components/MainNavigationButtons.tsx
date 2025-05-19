
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogIn, LogOut, User } from "lucide-react";

const MainNavigationButtons = () => {
  const { user, userDetails, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/signup");
  };

  // Function to get user initials for avatar
  const getUserInitials = () => {
    if (!userDetails?.full_name) return "U";
    
    return userDetails.full_name
      .split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex items-center gap-2">
      {!user ? (
        <>
          <Link to="/auth">
            <Button variant="outline" className="hidden md:flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          </Link>
          <Button
            className="bg-gradient-to-r from-[#291759] to-[#858CD3] text-white"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {userDetails?.full_name || "User"}
              <p className="text-xs text-muted-foreground">{userDetails?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/customer")}>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default MainNavigationButtons;
