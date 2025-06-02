import { createContext, useContext, useState, ReactNode } from 'react';

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
};

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    name: 'Prabhsharan',
    currentWeight: 172,
    workoutCompleted: 12,
    caloriesTracked: 19203,
    progressData: [
      { month: 'Jan', weight: 180, calories: 18500 },
      { month: 'Feb', weight: 178, calories: 19000 },
      { month: 'Mar', weight: 175, calories: 19203 },
      { month: 'Apr', weight: 172, calories: 19500 },
    ],
    nutritionData: [
      { date: '2025-05-01', protein: 120, carbs: 250, fats: 80 },
      { date: '2025-05-02', protein: 115, carbs: 230, fats: 75 },
      { date: '2025-05-03', protein: 125, carbs: 260, fats: 85 },
    ],
    activityData: [
      { date: '2025-05-01', steps: 8500, minutes: 45 },
      { date: '2025-05-02', steps: 9200, minutes: 52 },
      { date: '2025-05-03', steps: 7800, minutes: 38 },
    ],
    appointments: [
      { id: '1', title: 'Nutritionist Consultation', date: 'May 22, 2025', time: '2:30 PM', status: 'booked' },
      { id: '2', title: 'Progress Review Session', date: 'May 29, 2025', time: '10:00 AM', status: 'booked' },
    ],
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
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const addProgressEntry = (entry: { month: string; weight: number; calories: number }) => {
    setUserData(prev => ({
      ...prev,
      progressData: [...prev.progressData, entry]
    }));
  };

  const addNutritionEntry = (entry: { date: string; protein: number; carbs: number; fats: number }) => {
    setUserData(prev => ({
      ...prev,
      nutritionData: [...prev.nutritionData, entry]
    }));
  };

  const addActivityEntry = (entry: { date: string; steps: number; minutes: number }) => {
    setUserData(prev => ({
      ...prev,
      activityData: [...prev.activityData, entry]
    }));
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setUserData(prev => ({
      ...prev,
      appointments: [...prev.appointments, newAppointment]
    }));
  };

  const requestReschedule = (appointmentId: string, requestedDate: string, requestedTime: string, reason: string) => {
    setUserData(prev => ({
      ...prev,
      appointments: prev.appointments.map(appointment => 
        appointment.id === appointmentId 
          ? {
              ...appointment,
              status: 'pending' as AppointmentStatus,
              rescheduleRequest: {
                requestedDate,
                requestedTime,
                reason,
                requestedAt: new Date().toISOString()
              }
            }
          : appointment
      )
    }));
  };

  const approveReschedule = (appointmentId: string) => {
    setUserData(prev => ({
      ...prev,
      appointments: prev.appointments.map(appointment => 
        appointment.id === appointmentId && appointment.rescheduleRequest
          ? {
              ...appointment,
              date: appointment.rescheduleRequest.requestedDate,
              time: appointment.rescheduleRequest.requestedTime,
              status: 'rescheduled' as AppointmentStatus,
              rescheduleRequest: undefined
            }
          : appointment
      )
    }));
  };

  const markVideoWatched = (weekNumber: number, videoId: string) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  videos: week.tasks.videos.map(video =>
                    video.id === videoId ? { ...video, watched: true } : video
                  )
                }
              }
            : week
        )
      }
    }));
  };

  const addMealLog = (weekNumber: number, mealLog: Omit<MealLog, 'id'>) => {
    const newMealLog = { ...mealLog, id: Date.now().toString() };
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  mealLogs: [...week.tasks.mealLogs, newMealLog]
                }
              }
            : week
        )
      }
    }));
  };

  const addWeightLog = (weekNumber: number, weightLog: Omit<WeightLog, 'id'>) => {
    const newWeightLog = { ...weightLog, id: Date.now().toString() };
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  weightLogs: [...week.tasks.weightLogs, newWeightLog]
                }
              }
            : week
        )
      }
    }));
  };

  const editMealLog = (weekNumber: number, mealLogId: string, updatedMealLog: Partial<MealLog>) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  mealLogs: week.tasks.mealLogs.map(mealLog =>
                    mealLog.id === mealLogId ? { ...mealLog, ...updatedMealLog } : mealLog
                  )
                }
              }
            : week
        )
      }
    }));
  };

  const deleteMealLog = (weekNumber: number, mealLogId: string) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  mealLogs: week.tasks.mealLogs.filter(mealLog => mealLog.id !== mealLogId)
                }
              }
            : week
        )
      }
    }));
  };

  const editWeightLog = (weekNumber: number, weightLogId: string, updatedWeightLog: Partial<WeightLog>) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  weightLogs: week.tasks.weightLogs.map(weightLog =>
                    weightLog.id === weightLogId ? { ...weightLog, ...updatedWeightLog } : weightLog
                  )
                }
              }
            : week
        )
      }
    }));
  };

  const deleteWeightLog = (weekNumber: number, weightLogId: string) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        weeks: prev.program.weeks.map(week => 
          week.weekNumber === weekNumber 
            ? {
                ...week,
                tasks: {
                  ...week.tasks,
                  weightLogs: week.tasks.weightLogs.filter(weightLog => weightLog.id !== weightLogId)
                }
              }
            : week
        )
      }
    }));
  };

  const completeWeek = (weekNumber: number) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        currentWeek: weekNumber + 1,
        weeks: prev.program.weeks.map(week => {
          if (week.weekNumber === weekNumber) {
            return { ...week, status: 'completed' as const, completion: 100 };
          } else if (week.weekNumber === weekNumber + 1) {
            return { ...week, status: 'current' as const };
          }
          return week;
        })
      }
    }));
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      updateUserData,
      addProgressEntry,
      addNutritionEntry,
      addActivityEntry,
      addAppointment,
      requestReschedule,
      approveReschedule,
      markVideoWatched,
      addMealLog,
      addWeightLog,
      editMealLog,
      deleteMealLog,
      editWeightLog,
      deleteWeightLog,
      completeWeek
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
