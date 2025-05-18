
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  LogIn 
} from "lucide-react";

const DashboardSidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#E6E8FF] p-6 flex flex-col">
      <div className="mb-10">
        <Link to="/">
          <h1 className="text-2xl font-normal">
            <span className="text-black">Won</span>
            <span className="text-[#1B5E20]">de</span>
            <span className="text-black">r</span>
          </h1>
        </Link>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto pt-6 border-t border-gray-200">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-gray-500">
            <LogIn className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
