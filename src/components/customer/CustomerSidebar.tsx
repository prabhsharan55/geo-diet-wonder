import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, CalendarDays, Activity, Utensils, BarChart2, MessageSquare, Video, Settings, CircleHelp } from "lucide-react";
interface CustomerSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}
const CustomerSidebar = ({
  sidebarOpen,
  setSidebarOpen
}: CustomerSidebarProps) => {
  const location = useLocation();
  const navItems = [{
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/customer"
  }, {
    title: "My Program",
    icon: CalendarDays,
    path: "/customer/program"
  }, {
    title: "CGM Tracker",
    icon: Activity,
    path: "/customer/cgm"
  }, {
    title: "GeoDiet Coach",
    icon: Utensils,
    path: "/customer/coach"
  }, {
    title: "Progress & Reports",
    icon: BarChart2,
    path: "/customer/progress"
  }, {
    title: "Ask a Coach",
    icon: MessageSquare,
    path: "/customer/ask-coach"
  }, {
    title: "Video Library",
    icon: Video,
    path: "/customer/videos"
  }, {
    title: "Settings & Profile",
    icon: Settings,
    path: "/customer/settings"
  }, {
    title: "Support",
    icon: CircleHelp,
    path: "/customer/support"
  }];
  return <div className={cn("h-screen bg-gradient-to-b from-[#160041] to-[#8D97DE] text-white transition-all", sidebarOpen ? "w-64" : "w-20")}>
      <div className="flex items-center justify-between p-5">
        <Link to="/customer">
          <h2 className={cn("font-lyon text-2xl font-semibold", !sidebarOpen && "hidden")}>Prabhsharan </h2>
          <h2 className={cn("font-lyon text-2xl font-semibold", sidebarOpen && "hidden")}>
            W
          </h2>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white focus:outline-none">
          {sidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>}
        </button>
      </div>

      <div className="mt-8">
        {navItems.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center py-3 px-5 transition-all", location.pathname === item.path ? "bg-white/20" : "hover:bg-white/10", !sidebarOpen && "justify-center")}>
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">{item.title}</span>}
          </Link>)}
      </div>
    </div>;
};
export default CustomerSidebar;