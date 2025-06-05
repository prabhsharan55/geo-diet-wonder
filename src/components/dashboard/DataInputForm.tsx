import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserData } from '@/context/UserDataContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const DataInputForm = () => {
  const { userData, updateUserData, addProgressEntry, addNutritionEntry, addActivityEntry, addAppointment, loading: contextLoading } = useUserData();
  
  const [basicData, setBasicData] = useState({
    name: userData.name,
    currentWeight: userData.currentWeight,
    workoutCompleted: userData.workoutCompleted,
    caloriesTracked: userData.caloriesTracked
  });

  const [progressData, setProgressData] = useState({
    month: '',
    weight: '',
    calories: ''
  });

  const [nutritionData, setNutritionData] = useState({
    date: '',
    protein: '',
    carbs: '',
    fats: ''
  });

  const [activityData, setActivityData] = useState({
    date: '',
    steps: '',
    minutes: ''
  });

  const [appointmentData, setAppointmentData] = useState({
    title: '',
    date: '',
    time: ''
  });

  const [submitting, setSubmitting] = useState({
    basic: false,
    progress: false,
    nutrition: false,
    activity: false,
    appointment: false
  });

  const handleBasicUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(prev => ({ ...prev, basic: true }));
    
    try {
      await updateUserData(basicData);
    } finally {
      setSubmitting(prev => ({ ...prev, basic: false }));
    }
  };

  const handleProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(prev => ({ ...prev, progress: true }));
    
    try {
      await addProgressEntry({
        month: progressData.month,
        weight: Number(progressData.weight),
        calories: Number(progressData.calories)
      });
      setProgressData({ month: '', weight: '', calories: '' });
    } finally {
      setSubmitting(prev => ({ ...prev, progress: false }));
    }
  };

  const handleNutritionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(prev => ({ ...prev, nutrition: true }));
    
    try {
      await addNutritionEntry({
        date: nutritionData.date,
        protein: Number(nutritionData.protein),
        carbs: Number(nutritionData.carbs),
        fats: Number(nutritionData.fats)
      });
      setNutritionData({ date: '', protein: '', carbs: '', fats: '' });
    } finally {
      setSubmitting(prev => ({ ...prev, nutrition: false }));
    }
  };

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(prev => ({ ...prev, activity: true }));
    
    try {
      await addActivityEntry({
        date: activityData.date,
        steps: Number(activityData.steps),
        minutes: Number(activityData.minutes)
      });
      setActivityData({ date: '', steps: '', minutes: '' });
    } finally {
      setSubmitting(prev => ({ ...prev, activity: false }));
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(prev => ({ ...prev, appointment: true }));
    
    try {
      await addAppointment({
        title: appointmentData.title,
        date: appointmentData.date,
        time: appointmentData.time,
        status: 'booked'
      });
      setAppointmentData({ title: '', date: '', time: '' });
    } finally {
      setSubmitting(prev => ({ ...prev, appointment: false }));
    }
  };

  if (contextLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading your data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Update Your Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <form onSubmit={handleBasicUpdate} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={basicData.name}
                  onChange={(e) => setBasicData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="weight">Current Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={basicData.currentWeight}
                  onChange={(e) => setBasicData(prev => ({ ...prev, currentWeight: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="workouts">Workouts Completed</Label>
                <Input
                  id="workouts"
                  type="number"
                  value={basicData.workoutCompleted}
                  onChange={(e) => setBasicData(prev => ({ ...prev, workoutCompleted: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="calories">Calories Tracked</Label>
                <Input
                  id="calories"
                  type="number"
                  value={basicData.caloriesTracked}
                  onChange={(e) => setBasicData(prev => ({ ...prev, caloriesTracked: Number(e.target.value) }))}
                />
              </div>
              <Button type="submit" disabled={submitting.basic}>
                {submitting.basic && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="progress">
            <form onSubmit={handleProgressSubmit} className="space-y-4">
              <div>
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  value={progressData.month}
                  onChange={(e) => setProgressData(prev => ({ ...prev, month: e.target.value }))}
                  placeholder="e.g., May"
                />
              </div>
              <div>
                <Label htmlFor="progressWeight">Weight (lbs)</Label>
                <Input
                  id="progressWeight"
                  type="number"
                  value={progressData.weight}
                  onChange={(e) => setProgressData(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="progressCalories">Total Calories</Label>
                <Input
                  id="progressCalories"
                  type="number"
                  value={progressData.calories}
                  onChange={(e) => setProgressData(prev => ({ ...prev, calories: e.target.value }))}
                />
              </div>
              <Button type="submit" disabled={submitting.progress}>
                {submitting.progress && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Progress Entry
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="nutrition">
            <form onSubmit={handleNutritionSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nutritionDate">Date</Label>
                <Input
                  id="nutritionDate"
                  type="date"
                  value={nutritionData.date}
                  onChange={(e) => setNutritionData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={nutritionData.protein}
                  onChange={(e) => setNutritionData(prev => ({ ...prev, protein: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={nutritionData.carbs}
                  onChange={(e) => setNutritionData(prev => ({ ...prev, carbs: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="fats">Fats (g)</Label>
                <Input
                  id="fats"
                  type="number"
                  value={nutritionData.fats}
                  onChange={(e) => setNutritionData(prev => ({ ...prev, fats: e.target.value }))}
                />
              </div>
              <Button type="submit" disabled={submitting.nutrition}>
                {submitting.nutrition && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Nutrition Entry
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="activity">
            <form onSubmit={handleActivitySubmit} className="space-y-4">
              <div>
                <Label htmlFor="activityDate">Date</Label>
                <Input
                  id="activityDate"
                  type="date"
                  value={activityData.date}
                  onChange={(e) => setActivityData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="steps">Steps</Label>
                <Input
                  id="steps"
                  type="number"
                  value={activityData.steps}
                  onChange={(e) => setActivityData(prev => ({ ...prev, steps: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="minutes">Exercise Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  value={activityData.minutes}
                  onChange={(e) => setActivityData(prev => ({ ...prev, minutes: e.target.value }))}
                />
              </div>
              <Button type="submit" disabled={submitting.activity}>
                {submitting.activity && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Activity Entry
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="appointments">
            <form onSubmit={handleAppointmentSubmit} className="space-y-4">
              <div>
                <Label htmlFor="appointmentTitle">Appointment Title</Label>
                <Input
                  id="appointmentTitle"
                  value={appointmentData.title}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Nutritionist Consultation"
                />
              </div>
              <div>
                <Label htmlFor="appointmentDate">Date</Label>
                <Input
                  id="appointmentDate"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                  placeholder="e.g., May 22, 2025"
                />
              </div>
              <div>
                <Label htmlFor="appointmentTime">Time</Label>
                <Input
                  id="appointmentTime"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))}
                  placeholder="e.g., 2:30 PM"
                />
              </div>
              <Button type="submit" disabled={submitting.appointment}>
                {submitting.appointment && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Appointment
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataInputForm;
