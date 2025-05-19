import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Menu } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { profile, loading } = useUserProfile();
  const [weightChange, setWeightChange] = useState("-3 lbs");
  const [workoutsCompleted, setWorkoutsCompleted] = useState("12");
  const [caloriesTracked, setCaloriesTracked] = useState("19,203");
  const [cgmReadings, setCgmReadings] = useState("210");

  // Simulate loading dashboard data
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    if (profile) {
      // Calculate relative values based on profile data if available
      if (profile.weight) {
        // Simulating weight loss of 1-2% from current weight
        const weightLoss = Math.round(profile.weight * 0.015);
        setWeightChange(`-${weightLoss} kg from last week`);
      }
    }
  }, [profile]);

  const displayName = profile?.full_name?.split(' ')[0] || 'User';
  const currentWeight = profile?.weight ? `${profile.weight} kg` : '172 lbs';

  return (
    <div className="flex h-screen bg-gray-50">
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
        fixed md:static z-30 h-full md:translate-x-0
      `}>
        <DashboardSidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto p-6 md:p-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500">Welcome back, {displayName}!</p>
          </div>
          <Button className="bg-gradient-to-r from-[#3A2D70] to-[#7072B7] rounded-full">
            View Analytics <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </header>
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatCard 
                title="Current Weight" 
                value={currentWeight}
                description={weightChange} 
              />
              <StatCard 
                title="Workouts Completed" 
                value={workoutsCompleted}
                description="+2 from last week" 
              />
              <StatCard 
                title="Calories Tracked" 
                value={caloriesTracked}
                description="93% of weekly target" 
              />
              <StatCard 
                title="CGM Readings" 
                value={cgmReadings}
                description="98% compliance" 
              />
            </div>
            
            <div className="mt-8">
              <Tabs defaultValue="progress">
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
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
