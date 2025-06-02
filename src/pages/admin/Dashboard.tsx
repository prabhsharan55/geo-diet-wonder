
import { useState } from "react";
import { 
  Tabs,
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PartnerApplications from "@/components/admin/PartnerApplications";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome to the GeoDiet + Wonder Health Admin Panel</p>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Customers" 
            value="2,549"
            description="+12% from last month" 
          />
          <StatCard 
            title="Active Packages" 
            value="1,832"
            description="87% renewal rate" 
          />
          <StatCard 
            title="Partner Clinics" 
            value="48"
            description="+3 this month" 
          />
          <StatCard 
            title="Monthly Revenue" 
            value="$89,204"
            description="+8.2% YTD" 
          />
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="applications">
            <TabsList className="mb-6">
              <TabsTrigger value="applications">Partner Applications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="partners">Partners</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <PartnerApplications />
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Analytics charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="partners">
              <Card>
                <CardHeader>
                  <CardTitle>Partner Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Partner data and management tools will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Customer data and management tools will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Content management tools will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
