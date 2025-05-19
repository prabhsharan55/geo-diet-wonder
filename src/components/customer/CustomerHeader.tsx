
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerHeaderUser from "./CustomerHeaderUser";

interface CustomerHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const CustomerHeader = ({ sidebarOpen, setSidebarOpen }: CustomerHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1">
        <h2 className="text-lg font-medium">GeoDiet Dashboard</h2>
      </div>
      <CustomerHeaderUser />
    </header>
  );
};

export default CustomerHeader;
