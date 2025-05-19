
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  MailCheck,
  BarChart2,
  Clock,
  Video,
  Bell,
  Settings,
  CircleHelp,
} from "lucide-react";

interface PartnerSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const PartnerSidebar = ({ sidebarOpen, setSidebarOpen }: PartnerSidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/partner",
    },
    {
      title: "Client Management",
      icon: Users,
      path: "/partner/clients",
    },
    {
      title: "Access Requests",
      icon: MailCheck,
      path: "/partner/requests",
    },
    {
      title: "Progress Reports",
      icon: BarChart2,
      path: "/partner/reports",
    },
    {
      title: "Freeze / Extend Plans",
      icon: Clock,
      path: "/partner/plans",
    },
    {
      title: "Video & Content",
      icon: Video,
      path: "/partner/content",
    },
    {
      title: "Announcements",
      icon: Bell,
      path: "/partner/announcements",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/partner/settings",
    },
    {
      title: "Support & Help",
      icon: CircleHelp,
      path: "/partner/support",
    },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-gradient-to-b from-[#160041] to-[#8D97DE] text-white transition-all",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-5">
        <Link to="/partner">
          <h2 className={cn("font-lyon text-2xl font-semibold", !sidebarOpen && "hidden")}>
            GeoDiet Partner
          </h2>
          <h2 className={cn("font-lyon text-2xl font-semibold", sidebarOpen && "hidden")}>
            GP
          </h2>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white focus:outline-none"
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center py-3 px-5 transition-all",
              location.pathname === item.path
                ? "bg-white/20"
                : "hover:bg-white/10",
              !sidebarOpen && "justify-center"
            )}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">{item.title}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PartnerSidebar;
