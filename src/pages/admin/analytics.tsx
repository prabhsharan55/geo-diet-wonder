
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";

const AnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Comprehensive performance metrics and data analytics</p>
        </div>
        
        <div className="flex justify-end mb-6">
          <Select defaultValue="last30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">24,892</div>
              <div className="text-sm text-gray-500">Total Visitors</div>
              <div className="text-xs text-green-600">+12% from last period</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">1,583</div>
              <div className="text-sm text-gray-500">Packages Sold</div>
              <div className="text-xs text-green-600">+8% from last period</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">3,247</div>
              <div className="text-sm text-gray-500">Email Signups</div>
              <div className="text-xs text-green-600">+15% from last period</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">$143,286</div>
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-xs text-green-600">+10% from last period</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Analytics</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Package sales over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Sales chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Package Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Package distribution chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Partner Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Partner performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="traffic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Website visitor metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Traffic chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Traffic sources chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Page Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Page performance chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="conversion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>User conversion journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Conversion funnel would be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email to Customer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Email conversion chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cart Abandonment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Cart abandonment chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
