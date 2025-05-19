
import { useState } from "react";
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const CustomerDashboard = () => {
  const { userDetails } = useAuth();
  const { profile } = useUserProfile();
  const [activeTab, setActiveTab] = useState("progress");
  
  const userName = profile?.full_name || userDetails?.full_name || "User";
  const firstNameOnly = userName.split(' ')[0];

  return (
    <CustomerLayout>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {firstNameOnly}!</h1>
          <p className="text-gray-500">Here's your health journey at a glance</p>
        </div>
        <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full">
          View Analytics <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Current Weight" 
          value={`${profile?.weight || 172} ${profile?.health_data?.weight_unit || 'lbs'}`}
          description="-3 lbs from last week" 
        />
        <StatCard 
          title="Workouts Completed" 
          value="12"
          description="+2 from last week" 
        />
        <StatCard 
          title="Calories Tracked" 
          value="19,203"
          description="93% of weekly target" 
        />
        <StatCard 
          title="CGM Readings" 
          value="210"
          description="98% compliance" 
        />
      </div>
      
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Progress chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Nutrition data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Activity data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                    <div>
                      <h3 className="font-medium">Nutritionist Consultation</h3>
                      <p className="text-sm text-gray-500">May 22, 2025 - 2:30 PM</p>
                    </div>
                    <Button variant="outline">Reschedule</Button>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                    <div>
                      <h3 className="font-medium">CGM Review Session</h3>
                      <p className="text-sm text-gray-500">May 29, 2025 - 10:00 AM</p>
                    </div>
                    <Button variant="outline">Reschedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
};

export default CustomerDashboard;
