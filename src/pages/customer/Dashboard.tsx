
import CustomerLayout from "@/components/customer/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useUserData } from "@/context/UserDataContext";
import ProgressChart from "@/components/charts/ProgressChart";
import NutritionChart from "@/components/charts/NutritionChart";
import ActivityChart from "@/components/charts/ActivityChart";
import RescheduleAppointmentDialog from "@/components/customer/RescheduleAppointmentDialog";
import { useState } from "react";

const CustomerDashboard = () => {
  const { userData, approveReschedule } = useUserData();
  const [rescheduleDialog, setRescheduleDialog] = useState<{
    isOpen: boolean;
    appointmentId: string;
    appointmentTitle: string;
  }>({
    isOpen: false,
    appointmentId: "",
    appointmentTitle: "",
  });
  
  const firstNameOnly = userData.name.split(' ')[0];

  const handleRescheduleClick = (appointmentId: string, appointmentTitle: string) => {
    setRescheduleDialog({
      isOpen: true,
      appointmentId,
      appointmentTitle,
    });
  };

  const handleCloseRescheduleDialog = () => {
    setRescheduleDialog({
      isOpen: false,
      appointmentId: "",
      appointmentTitle: "",
    });
  };

  // Simulate clinic approval (for demo purposes)
  const handleApproveReschedule = (appointmentId: string) => {
    approveReschedule(appointmentId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rescheduled':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Rescheduled</Badge>;
      case 'booked':
      default:
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Booked</Badge>;
    }
  };

  const getActionButtons = (appointment: any) => {
    switch (appointment.status) {
      case 'pending':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Pending Approval
            </Button>
            {/* Demo button to simulate clinic approval */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleApproveReschedule(appointment.id)}
              className="text-xs"
            >
              Approve (Demo)
            </Button>
          </div>
        );
      case 'rescheduled':
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleRescheduleClick(appointment.id, appointment.title)}
          >
            Reschedule Again
          </Button>
        );
      case 'booked':
      default:
        return (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleRescheduleClick(appointment.id, appointment.title)}
          >
            Reschedule
          </Button>
        );
    }
  };

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
                    <div key={appointment.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{appointment.title}</h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        {appointment.rescheduleRequest && appointment.status === 'pending' && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-gray-600">
                            <p><strong>Requested:</strong> {appointment.rescheduleRequest.requestedDate} at {appointment.rescheduleRequest.requestedTime}</p>
                            <p><strong>Reason:</strong> {appointment.rescheduleRequest.reason}</p>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        {getActionButtons(appointment)}
                      </div>
                    </div>
                  ))}
                  {userData.appointments.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No appointments scheduled. Use the form in Progress & Reports to add appointments.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <RescheduleAppointmentDialog
        appointmentId={rescheduleDialog.appointmentId}
        appointmentTitle={rescheduleDialog.appointmentTitle}
        isOpen={rescheduleDialog.isOpen}
        onClose={handleCloseRescheduleDialog}
      />
    </CustomerLayout>
  );
};

export default CustomerDashboard;
