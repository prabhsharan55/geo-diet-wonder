
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  UserPlus, 
  FileText, 
  Video, 
  Megaphone, 
  Settings, 
  HelpCircle,
  Utensils
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/partner", icon: BarChart3 },
  { name: "Client Management", href: "/partner/client-management", icon: Users },
  { name: "Access Requests", href: "/partner/access-requests", icon: UserPlus },
  { name: "Plans Management", href: "/partner/plans-management", icon: FileText },
  { name: "Content Management", href: "/partner/content-management", icon: Video },
  { name: "Meal Planning", href: "/partner/meal-planning", icon: Utensils },
  { name: "Announcements", href: "/partner/announcements", icon: Megaphone },
  { name: "Settings", href: "/partner/settings", icon: Settings },
  { name: "Support", href: "/partner/support", icon: HelpCircle },
];

const PartnerSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-[#160041] text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default PartnerSidebar;
