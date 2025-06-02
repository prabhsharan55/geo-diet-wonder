import { BarChart2, Clock, PlusCircle, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PartnerLayout from "@/components/partner/PartnerLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PartnerDashboard = () => {
  // Fetch real customer statistics
  const { data: customerStats } = useQuery({
    queryKey: ['partner-customer-stats'],
    queryFn: async () => {
      const { data: allCustomers, error: allError } = await supabase
        .from('customers')
        .select('id, access_status, expiry_date');

      if (allError) throw allError;

      const activeCustomers = allCustomers?.filter(c => c.access_status === 'active') || [];
      const frozenCustomers = allCustomers?.filter(c => c.access_status === 'frozen') || [];
      
      // Calculate expiring soon (within 7 days)
      const today = new Date();
      const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expiringSoon = allCustomers?.filter(c => {
        if (!c.expiry_date) return false;
        const expiryDate = new Date(c.expiry_date);
        return expiryDate >= today && expiryDate <= sevenDaysFromNow;
      }) || [];

      return {
        total: allCustomers?.length || 0,
        active: activeCustomers.length,
        frozen: frozenCustomers.length,
        expiring: expiringSoon.length
      };
    },
  });

  // Fetch recent customer activity
  const { data: recentActivity } = useQuery({
    queryKey: ['partner-recent-activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          id,
          email,
          access_status,
          created_at,
          users!customers_user_id_fkey(
            id,
            full_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    },
  });

  const getActivityText = (customer: any) => {
    switch (customer.access_status) {
      case 'active':
        return 'Active access';
      case 'frozen':
        return 'Access frozen';
      case 'expired':
        return 'Access expired';
      default:
        return 'Unknown status';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'frozen':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

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
            title="Frozen Access" 
            value={customerStats?.frozen?.toString() || "0"} 
            description="Temporarily suspended" 
            className="bg-gradient-to-br from-[#FFF9E6] to-white"
          />
          <StatCard 
            title="Expiring Soon" 
            value={customerStats?.expiring?.toString() || "0"} 
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
                      {recentActivity.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-[#BED1AB] flex items-center justify-center text-[#160041]">
                                {(customer.users?.full_name || customer.email).charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-3">
                                <div>{customer.users?.full_name || 'No Name'}</div>
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
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.access_status)}`}>
                              {customer.access_status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <p>No recent activity found</p>
                    <p className="text-sm">Customer activity will appear here</p>
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
