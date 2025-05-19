
import { Bell, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface CustomerHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const CustomerHeader = ({ sidebarOpen, setSidebarOpen }: CustomerHeaderProps) => {
  const userName = "Sarah";

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4 lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">
          Hi <span className="font-bold">{userName}</span>, ready to transform your health?
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-2 font-medium border-b">Notifications</div>
            <div className="py-2">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <p className="font-medium">Time to log your meal</p>
                <p className="text-sm text-gray-500">5 minutes ago</p>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <p className="font-medium">New video available</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <p className="font-medium">Coach has answered your question</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 font-normal">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-[#F4D374] text-[#160041]">S</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">Sarah Johnson</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/customer/settings" className="flex items-center w-full">
                Profile Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/customer/support" className="flex items-center w-full">
                Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <Link to="/" className="flex items-center gap-2 w-full">
                <LogOut className="h-4 w-4" />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default CustomerHeader;
