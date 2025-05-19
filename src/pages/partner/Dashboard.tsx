
import { BarChart2, Clock, PlusCircle, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";

const PartnerDashboard = () => {
  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Welcome back, HealthFirst Clinic!</h2>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline">View Reports</Button>
            <Button>Add New Client</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Clients" 
            value="143" 
            description="+12 this month" 
            icon={<Users />} 
          />
          <StatCard 
            title="Active Clients" 
            value="98" 
            description="68% of total" 
            className="bg-gradient-to-br from-[#E6E8FF] to-white"
          />
          <StatCard 
            title="Pending Approvals" 
            value="7" 
            description="Requires attention" 
            className="bg-gradient-to-br from-[#FFF9E6] to-white"
          />
          <StatCard 
            title="Expiring Soon" 
            value="15" 
            description="Within 7 days" 
            className="bg-gradient-to-br from-[#FFEFEF] to-white"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <PlusCircle className="h-10 w-10 mb-2 text-[#160041]" />
                <h4 className="text-lg font-medium">Add New Client</h4>
                <p className="text-sm text-gray-500 mb-3">Register new client access</p>
                <Button variant="outline" size="sm">Add Client</Button>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-10 w-10 mb-2 text-[#160041]" />
                <h4 className="text-lg font-medium">Manage Access</h4>
                <p className="text-sm text-gray-500 mb-3">Extend or freeze client plans</p>
                <Button variant="outline" size="sm">Manage Plans</Button>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Upload className="h-10 w-10 mb-2 text-[#160041]" />
                <h4 className="text-lg font-medium">Upload Content</h4>
                <p className="text-sm text-gray-500 mb-3">Share videos with clients</p>
                <Button variant="outline" size="sm">Upload</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Client Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Recent Client Activity</h3>
            <Button variant="link" size="sm">View All</Button>
          </div>
          <Card>
            <Tabs defaultValue="all">
              <div className="p-4 border-b">
                <TabsList>
                  <TabsTrigger value="all">All Activity</TabsTrigger>
                  <TabsTrigger value="progress">Progress Updates</TabsTrigger>
                  <TabsTrigger value="requests">Access Requests</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="p-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
                              {["JD", "TK", "SM", "RL", "AB"][i]}
                            </div>
                            <div className="ml-3">
                              <div>{["John Doe", "Taylor Kim", "Sam Miller", "Rebecca Lee", "Alex Brown"][i]}</div>
                              <div className="text-xs text-gray-500">{["john@example.com", "taylor@example.com", "sam@example.com", "rebecca@example.com", "alex@example.com"][i]}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {["Completed weekly check-in", "Missed appointment", "Uploaded progress photo", "Requested access extension", "New access request"][i]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {["Today", "Yesterday", "2 days ago", "3 days ago", "1 week ago"][i]}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            ["bg-green-100 text-green-800", "bg-red-100 text-red-800", "bg-blue-100 text-blue-800", "bg-yellow-100 text-yellow-800", "bg-purple-100 text-purple-800"][i]
                          }`}>
                            {["Completed", "Attention needed", "In progress", "Pending", "New"][i]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent value="progress" className="p-4">
                <p>Client progress tracking information will appear here.</p>
              </TabsContent>
              <TabsContent value="requests" className="p-4">
                <p>New client access requests will appear here.</p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default PartnerDashboard;
