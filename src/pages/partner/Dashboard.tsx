
// @ts-nocheck

import { BarChart2, Clock, PlusCircle, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useState, useEffect } from "react";

const PartnerDashboard = () => {
  // Mock data since we're not using authentication
  const mockClients = [
    {
      id: "1",
      full_name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "customer",
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2", 
      full_name: "Michael Chen",
      email: "michael.chen@email.com",
      role: "customer",
      created_at: "2024-01-20T14:30:00Z"
    },
    {
      id: "3",
      full_name: "Emily Davis",
      email: "emily.davis@email.com", 
      role: "customer",
      created_at: "2024-02-01T09:15:00Z"
    }
  ];

  const [customerStats, setCustomerStats] = useState({ total: 0, active: 0, pending: 0 });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Set up mock data
    setCustomerStats({
      total: mockClients.length,
      active: mockClients.length,
      pending: 0
    });
    setRecentActivity(mockClients);
  }, []);

  const getActivityText = (customer) => {
    return 'Active access';
  };

  const getStatusColor = (status) => {
    return 'bg-green-100 text-green-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  // Pre-render activity rows to prevent TypeScript deep inference
  const activityRows = recentActivity.map((customer) => (
    <tr key={customer.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
            {(customer.full_name || customer.email).charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <div>{customer.full_name || 'No Name'}</div>
            <div className="text-xs text-gray-500">{customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getActivityText(customer)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(customer.created_at)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor('active')}`}>
          active
        </span>
      </td>
    </tr>
  ));

  return (
    <PartnerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold">Welcome back, Partner!</h2>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline">View Reports</Button>
            <Button>Add New Client</Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Clients" 
            value={customerStats?.total?.toString() || "0"} 
            description={`${customerStats?.active || 0} active`} 
            icon={<Users />} 
          />
          <StatCard 
            title="Active Clients" 
            value={customerStats?.active?.toString() || "0"} 
            description={`${Math.round(((customerStats?.active || 0) / (customerStats?.total || 1)) * 100)}% of total`}
            className="bg-gradient-to-br from-[#E6E8FF] to-white"
          />
          <StatCard 
            title="New This Month" 
            value="0" 
            description="Recent signups" 
            className="bg-gradient-to-br from-[#FFF9E6] to-white"
          />
          <StatCard 
            title="Engagement" 
            value="85%" 
            description="Average activity" 
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
                <p className="text-sm text-gray-500 mb-3">Extend or manage client plans</p>
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
                {recentActivity && recentActivity.length > 0 ? (
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
                      {activityRows}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>No recent activity found</p>
                    <p className="text-sm">Customer activity will appear here once clients sign up</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="progress" className="p-4">
                <p className="text-gray-500">Client progress tracking information will appear here.</p>
              </TabsContent>
              <TabsContent value="requests" className="p-4">
                <p className="text-gray-500">New client access requests will appear here.</p>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default PartnerDashboard;
