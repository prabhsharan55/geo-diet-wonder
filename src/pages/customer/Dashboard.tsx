
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import { useUserData } from "@/context/UserDataContext";
import ProgressChart from "@/components/charts/ProgressChart";
import NutritionChart from "@/components/charts/NutritionChart";
import ActivityChart from "@/components/charts/ActivityChart";
import DataInputForm from "@/components/dashboard/DataInputForm";

const CustomerDashboard = () => {
  const { userData } = useUserData();
  
  const firstNameOnly = userData.name.split(' ')[0];

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

      <DataInputForm />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Current Weight" 
          value={`${userData.currentWeight} lbs`}
          description="-3 lbs from last week" 
        />
        <StatCard 
          title="Workouts Completed" 
          value={userData.workoutCompleted.toString()}
          description="+2 from last week" 
        />
        <StatCard 
          title="Calories Tracked" 
          value={userData.caloriesTracked.toLocaleString()}
          description="93% of weekly target" 
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
                <ProgressChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nutrition">
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Report</CardTitle>
              </CardHeader>
              <CardContent>
                <NutritionChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityChart />
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
                  {userData.appointments.map((appointment) => (
                    <div key={appointment.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
                      <div>
                        <h3 className="font-medium">{appointment.title}</h3>
                        <p className="text-sm text-gray-500">{appointment.date} - {appointment.time}</p>
                      </div>
                      <Button variant="outline">Reschedule</Button>
                    </div>
                  ))}
                  {userData.appointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No appointments scheduled. Use the form above to add appointments.
                    </div>
                  )}
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
