import { createContext, useContext, ReactNode } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useNutritionData } from '@/hooks/useNutritionData';
import { useActivityData } from '@/hooks/useActivityData';
import { useAppointments } from '@/hooks/useAppointments';

export type AppointmentStatus = 'booked' | 'pending' | 'rescheduled';

export type Appointment = {
  id: string;
  title: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  rescheduleRequest?: {
    requestedDate: string;
    requestedTime: string;
    reason: string;
    requestedAt: string;
  };
};

export type VideoAccess = 'open' | 'daily' | 'locked';

export type Video = {
  id: string;
  title: string;
  duration: string;
  watched: boolean;
  accessType: VideoAccess;
  dayRequired?: number; // for daily videos
  url: string;
};

export type MealLog = {
  id: string;
  date: string;
  mealType: string;
  photo?: string;
  description: string;
  time: string;
  completed: boolean;
};

export type WeightLog = {
  id: string;
  date: string;
  weight: number;
  photo?: string;
  notes: string;
  completed: boolean;
};

export type WeekTask = {
  videos: Video[];
  mealLogs: MealLog[];
  weightLogs: WeightLog[];
};

export type ProgramWeek = {
  weekNumber: number;
  status: 'completed' | 'current' | 'locked';
  completion: number;
  focus: string;
  tasks: WeekTask;
  recommendedVideos: Video[];
};

export type UserProgram = {
  planName: string;
  totalWeeks: number;
  currentWeek: number;
  weeks: ProgramWeek[];
};

export type UserData = {
  name: string;
  currentWeight: number;
  workoutCompleted: number;
  caloriesTracked: number;
  progressData: Array<{ month: string; weight: number; calories: number }>;
  nutritionData: Array<{ date: string; protein: number; carbs: number; fats: number }>;
  activityData: Array<{ date: string; steps: number; minutes: number }>;
  appointments: Appointment[];
  program: UserProgram;
};

type UserDataContextType = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  addProgressEntry: (entry: { month: string; weight: number; calories: number }) => void;
  addNutritionEntry: (entry: { date: string; protein: number; carbs: number; fats: number }) => void;
  addActivityEntry: (entry: { date: string; steps: number; minutes: number }) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  requestReschedule: (appointmentId: string, requestedDate: string, requestedTime: string, reason: string) => void;
  approveReschedule: (appointmentId: string) => void;
  markVideoWatched: (weekNumber: number, videoId: string) => void;
  addMealLog: (weekNumber: number, mealLog: Omit<MealLog, 'id'>) => void;
  addWeightLog: (weekNumber: number, weightLog: Omit<WeightLog, 'id'>) => void;
  editMealLog: (weekNumber: number, mealLogId: string, updatedMealLog: Partial<MealLog>) => void;
  deleteMealLog: (weekNumber: number, mealLogId: string) => void;
  editWeightLog: (weekNumber: number, weightLogId: string, updatedWeightLog: Partial<WeightLog>) => void;
  deleteWeightLog: (weekNumber: number, weightLogId: string) => void;
  completeWeek: (weekNumber: number) => void;
  loading: boolean;
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const { profile, updateProfile, loading: profileLoading } = useUserProfile();
  const { nutritionData, addNutritionEntry, loading: nutritionLoading } = useNutritionData();
  const { activityData, addActivityEntry, loading: activityLoading } = useActivityData();
  const { appointments, addAppointment, loading: appointmentsLoading } = useAppointments();

  const loading = profileLoading || nutritionLoading || activityLoading || appointmentsLoading;

  // Convert database data to the expected format
  const userData: UserData = {
    name: profile?.full_name || 'User',
    currentWeight: profile?.current_weight || 172,
    workoutCompleted: profile?.workout_completed || 0,
    caloriesTracked: profile?.calories_tracked || 0,
    progressData: [
      { month: 'Jan', weight: 180, calories: 18500 },
      { month: 'Feb', weight: 178, calories: 19000 },
      { month: 'Mar', weight: 175, calories: 19203 },
      { month: 'Apr', weight: 172, calories: 19500 },
    ],
    nutritionData: nutritionData.map(entry => ({
      date: entry.date,
      protein: entry.protein,
      carbs: entry.carbs,
      fats: entry.fats
    })),
    activityData: activityData.map(entry => ({
      date: entry.date,
      steps: entry.steps,
      minutes: entry.exercise_minutes
    })),
    appointments: appointments.map(apt => ({
      id: apt.id,
      title: apt.title,
      date: apt.date,
      time: apt.time,
      status: apt.status as AppointmentStatus,
      rescheduleRequest: apt.reschedule_request
    })),
    program: {
      planName: 'GeoDiet Premium Program',
      totalWeeks: 12,
      currentWeek: 3,
      weeks: [
        {
          weekNumber: 1,
          status: 'completed',
          completion: 100,
          focus: 'Understanding your glucose responses to different foods and begin identifying your personal food triggers.',
          tasks: {
            videos: [
              { id: 'v1', title: 'Welcome to GeoDiet', duration: '5 min', watched: true, accessType: 'open', url: '#' },
              { id: 'v2', title: 'CGM Basics', duration: '8 min', watched: true, accessType: 'open', url: '#' }
            ],
            mealLogs: [],
            weightLogs: []
          },
          recommendedVideos: []
        },
        {
          weekNumber: 2,
          status: 'completed',
          completion: 100,
          focus: 'Learn to interpret your CGM data and identify patterns in your glucose responses.',
          tasks: {
            videos: [
              { id: 'v3', title: 'Reading Your Data', duration: '6 min', watched: true, accessType: 'open', url: '#' },
              { id: 'v4', title: 'Pattern Recognition', duration: '7 min', watched: true, accessType: 'daily', dayRequired: 3, url: '#' }
            ],
            mealLogs: [],
            weightLogs: []
          },
          recommendedVideos: []
        },
        {
          weekNumber: 3,
          status: 'current',
          completion: 65,
          focus: 'Start making targeted dietary adjustments based on your glucose response patterns.',
          tasks: {
            videos: [
              { id: 'v5', title: 'Dietary Adjustments', duration: '10 min', watched: true, accessType: 'open', url: '#' },
              { id: 'v6', title: 'Meal Timing', duration: '8 min', watched: false, accessType: 'daily', dayRequired: 5, url: '#' },
              { id: 'v7', title: 'Exercise Impact', duration: '6 min', watched: false, accessType: 'open', url: '#' }
            ],
            mealLogs: [
              { id: 'm1', date: '2025-06-01', mealType: 'Breakfast', description: 'Oatmeal with berries', time: '08:00', completed: true },
              { id: 'm2', date: '2025-06-01', mealType: 'Lunch', description: 'Grilled chicken salad', time: '12:30', completed: true }
            ],
            weightLogs: [
              { id: 'w1', date: '2025-06-01', weight: 172, notes: 'Morning weight', completed: true }
            ]
          },
          recommendedVideos: [
            { id: 'rv1', title: 'Understanding Your CGM Data', duration: '5 min', watched: false, accessType: 'open', url: '#' },
            { id: 'rv2', title: 'Food & Glucose Response', duration: '7 min', watched: false, accessType: 'open', url: '#' }
          ]
        }
      ]
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    const profileUpdates: any = {};
    
    if (data.name) profileUpdates.full_name = data.name;
    if (data.currentWeight) profileUpdates.current_weight = data.currentWeight;
    if (data.workoutCompleted !== undefined) profileUpdates.workout_completed = data.workoutCompleted;
    if (data.caloriesTracked !== undefined) profileUpdates.calories_tracked = data.caloriesTracked;

    if (Object.keys(profileUpdates).length > 0) {
      await updateProfile(profileUpdates);
    }
  };

  const addProgressEntry = (entry: { month: string; weight: number; calories: number }) => {
    // For now, we'll keep this in local state until we create a progress_entries table
    console.log('Progress entry to be saved:', entry);
  };

  const handleAddNutritionEntry = async (entry: { date: string; protein: number; carbs: number; fats: number }) => {
    await addNutritionEntry(entry);
  };

  const handleAddActivityEntry = async (entry: { date: string; steps: number; minutes: number }) => {
    await addActivityEntry({
      date: entry.date,
      steps: entry.steps,
      exercise_minutes: entry.minutes
    });
  };

  const handleAddAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    await addAppointment({
      title: appointment.title,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    });
  };

  const requestReschedule = (appointmentId: string, requestedDate: string, requestedTime: string, reason: string) => {
    console.log('Reschedule request:', { appointmentId, requestedDate, requestedTime, reason });
  };

  const approveReschedule = (appointmentId: string) => {
    console.log('Approve reschedule:', appointmentId);
  };

  const markVideoWatched = (weekNumber: number, videoId: string) => {
    console.log('Mark video watched:', { weekNumber, videoId });
  };

  const addMealLog = (weekNumber: number, mealLog: Omit<MealLog, 'id'>) => {
    console.log('Add meal log:', { weekNumber, mealLog });
  };

  const addWeightLog = (weekNumber: number, weightLog: Omit<WeightLog, 'id'>) => {
    console.log('Add weight log:', { weekNumber, weightLog });
  };

  const editMealLog = (weekNumber: number, mealLogId: string, updatedMealLog: Partial<MealLog>) => {
    console.log('Edit meal log:', { weekNumber, mealLogId, updatedMealLog });
  };

  const deleteMealLog = (weekNumber: number, mealLogId: string) => {
    console.log('Delete meal log:', { weekNumber, mealLogId });
  };

  const editWeightLog = (weekNumber: number, weightLogId: string, updatedWeightLog: Partial<WeightLog>) => {
    console.log('Edit weight log:', { weekNumber, weightLogId, updatedWeightLog });
  };

  const deleteWeightLog = (weekNumber: number, weightLogId: string) => {
    console.log('Delete weight log:', { weekNumber, weightLogId });
  };

  const completeWeek = (weekNumber: number) => {
    console.log('Complete week:', weekNumber);
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      updateUserData,
      addProgressEntry,
      addNutritionEntry: handleAddNutritionEntry,
      addActivityEntry: handleAddActivityEntry,
      addAppointment: handleAddAppointment,
      requestReschedule,
      approveReschedule,
      markVideoWatched,
      addMealLog,
      addWeightLog,
      editMealLog,
      deleteMealLog,
      editWeightLog,
      deleteWeightLog,
      completeWeek,
      loading
    }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
