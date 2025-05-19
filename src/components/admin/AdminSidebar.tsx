
import { Link } from "react-router-dom";
import { 
  Users, 
  ClipboardCheck, 
  LayoutDashboard, 
  Settings, 
  ChartBar, 
  FileText, 
  MapPin, 
  Mail, 
  Lock,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useState } from "react";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menu: string) => {
    if (openMenus.includes(menu)) {
      setOpenMenus(openMenus.filter(m => m !== menu));
    } else {
      setOpenMenus([...openMenus, menu]);
    }
  };

  const isMenuOpen = (menu: string) => openMenus.includes(menu);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-200 ease-in-out
        fixed md:static z-30 h-full md:translate-x-0 bg-white border-r border-gray-200
        w-64 overflow-y-auto
      `}>
        <div className="p-6">
          <Link to="/admin">
            <h1 className="text-2xl font-normal">
              <span className="text-black">Geo</span>
              <span className="text-[#1B5E20]">Di</span>
              <span className="text-black">et</span>
              <span className="ml-1 text-sm text-gray-500">Admin</span>
            </h1>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-4 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="px-4 pb-4">
          <ul className="space-y-1">
            <li>
              <Link to="/admin">
                <Button variant="ghost" className="w-full justify-start">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </li>
            
            <li>
              <Collapsible
                open={isMenuOpen('partners')}
                onOpenChange={() => toggleMenu('partners')}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Partners/Clinics
                    </span>
                    <span className="text-xs">▼</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 py-2 space-y-2">
                    <Link to="/admin/partners">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        All Partners
                      </Button>
                    </Link>
                    <Link to="/admin/partners/add">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Add Partner
                      </Button>
                    </Link>
                    <Link to="/admin/partners/map">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Partner Map
                      </Button>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </li>
            
            <li>
              <Collapsible
                open={isMenuOpen('customers')}
                onOpenChange={() => toggleMenu('customers')}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Customers
                    </span>
                    <span className="text-xs">▼</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 py-2 space-y-2">
                    <Link to="/admin/customers">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        All Customers
                      </Button>
                    </Link>
                    <Link to="/admin/customers/reports">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Reports
                      </Button>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </li>
            
            <li>
              <Collapsible
                open={isMenuOpen('packages')}
                onOpenChange={() => toggleMenu('packages')}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Packages
                    </span>
                    <span className="text-xs">▼</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 py-2 space-y-2">
                    <Link to="/admin/packages">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        All Packages
                      </Button>
                    </Link>
                    <Link to="/admin/packages/add">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Create Package
                      </Button>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </li>
            
            <li>
              <Collapsible
                open={isMenuOpen('content')}
                onOpenChange={() => toggleMenu('content')}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Content
                    </span>
                    <span className="text-xs">▼</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 py-2 space-y-2">
                    <Link to="/admin/content/videos">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Videos
                      </Button>
                    </Link>
                    <Link to="/admin/content/blog">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Blog
                      </Button>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </li>
            
            <li>
              <Link to="/admin/analytics">
                <Button variant="ghost" className="w-full justify-start">
                  <ChartBar className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
            </li>
            
            <li>
              <Link to="/admin/partner-locator">
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Partner Locator
                </Button>
              </Link>
            </li>
            
            <li>
              <Link to="/admin/email">
                <Button variant="ghost" className="w-full justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Tools
                </Button>
              </Link>
            </li>
            
            <li>
              <Collapsible
                open={isMenuOpen('legal')}
                onOpenChange={() => toggleMenu('legal')}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Legal Settings
                    </span>
                    <span className="text-xs">▼</span>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-6 py-2 space-y-2">
                    <Link to="/admin/legal/terms">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Terms & Conditions
                      </Button>
                    </Link>
                    <Link to="/admin/legal/policy">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Refund Policy
                      </Button>
                    </Link>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </li>
            
            <li>
              <Link to="/admin/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;
