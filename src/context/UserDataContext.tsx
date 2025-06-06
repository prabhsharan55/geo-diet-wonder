import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  name: string;
  currentWeight: number | null;
  workoutCompleted: number;
  caloriesTracked: number;
  progressData: Array<{
    month: string;
    weight: number;
    calories: number;
  }>;
  nutritionData: Array<{
    id: string;
    date: string;
    protein: number;
    carbs: number;
    fats: number;
  }>;
  activityData: Array<{
    id: string;
    date: string;
    steps: number;
    minutes: number;
  }>;
  program: {
    planName: string;
    currentWeek: number;
    totalWeeks: number;
    videos: Array<{
      id: string;
      title: string;
      watched: boolean;
      week: number;
    }>;
    mealLogs: Array<{
      id: string;
      date: string;
      meal: string;
      calories: number;
    }>;
    weightLogs: Array<{
      id: string;
      date: string;
      weight: number;
    }>;
    weeks: Array<{
      weekNumber: number;
      tasks: {
        videos: Array<{
          id: string;
          title: string;
          watched: boolean;
          week: number;
          duration?: string;
          accessType?: string;
          dayRequired?: number;
        }>;
        mealLogs: Array<{
          id: string;
          date: string;
          meal: string;
          calories: number;
          mealType?: string;
          description?: string;
          time?: string;
          photo?: string;
        }>;
        weightLogs: Array<{
          id: string;
          date: string;
          weight: number;
          notes?: string;
          photo?: string;
        }>;
      };
      recommendedVideos: Array<{
        id: string;
        title: string;
        duration: string;
      }>;
    }>;
  };
  appointments: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    status: 'booked' | 'pending' | 'rescheduled';
    rescheduleRequest?: {
      requestedDate: string;
      requestedTime: string;
      reason: string;
    };
  }>;
}

export interface MealLog {
  id: string;
  date: string;
  meal: string;
  calories: number;
  mealType?: string;
  description?: string;
  time?: string;
  photo?: string;
}

export interface Video {
  id: string;
  title: string;
  watched: boolean;
  week: number;
  duration?: string;
  accessType?: string;
  dayRequired?: number;
}

export interface WeightLog {
  id: string;
  date: string;
  weight: number;
  notes?: string;
  photo?: string;
}

interface UserDataContextType {
  userData: UserData;
  loading: boolean;
  approveReschedule: (appointmentId: string) => void;
  requestReschedule: (appointmentId: string, requestedDate: string, requestedTime: string, reason: string) => void;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  addProgressEntry: (entry: { month: string; weight: number; calories: number }) => Promise<void>;
  addNutritionEntry: (entry: { date: string; protein: number; carbs: number; fats: number }) => Promise<void>;
  addActivityEntry: (entry: { date: string; steps: number; minutes: number }) => Promise<void>;
  addAppointment: (appointment: { title: string; date: string; time: string; status: string }) => Promise<void>;
  markVideoWatched: (weekNumber: number, videoId: string) => void;
  addMealLog: (weekNumber: number, mealLog: Omit<MealLog, 'id'>) => void;
  addWeightLog: (weekNumber: number, weightLog: Omit<WeightLog, 'id'>) => void;
  editMealLog: (weekNumber: number, id: string, mealLog: Partial<MealLog>) => void;
  deleteMealLog: (weekNumber: number, id: string) => void;
  editWeightLog: (weekNumber: number, id: string, weightLog: Partial<WeightLog>) => void;
  deleteWeightLog: (weekNumber: number, id: string) => void;
  completeWeek: (week: number) => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [loading] = useState(false);
  
  // Mock user data - no authentication required
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    currentWeight: 180,
    workoutCompleted: 12,
    caloriesTracked: 8500,
    progressData: [
      { month: "Jan", weight: 185, calories: 2100 },
      { month: "Feb", weight: 183, calories: 2050 },
      { month: "Mar", weight: 181, calories: 2000 },
      { month: "Apr", weight: 180, calories: 1950 },
      { month: "May", weight: 178, calories: 1900 },
      { month: "Jun", weight: 176, calories: 1850 },
    ],
    nutritionData: [
      { id: "1", date: "2024-01-15", protein: 150, carbs: 200, fats: 70 },
      { id: "2", date: "2024-01-16", protein: 140, carbs: 180, fats: 65 },
      { id: "3", date: "2024-01-17", protein: 160, carbs: 220, fats: 75 },
    ],
    activityData: [
      { id: "1", date: "2024-01-15", steps: 8500, minutes: 45 },
      { id: "2", date: "2024-01-16", steps: 9200, minutes: 60 },
      { id: "3", date: "2024-01-17", steps: 7800, minutes: 30 },
    ],
    program: {
      planName: "Weight Loss Program",
      currentWeek: 3,
      totalWeeks: 12,
      videos: [
        { id: "1", title: "Introduction to Nutrition", watched: true, week: 1 },
        { id: "2", title: "Exercise Basics", watched: true, week: 1 },
        { id: "3", title: "Meal Planning", watched: false, week: 2 },
      ],
      mealLogs: [
        { id: "1", date: "2024-01-15", meal: "Breakfast: Oatmeal with fruits", calories: 350 },
        { id: "2", date: "2024-01-15", meal: "Lunch: Grilled chicken salad", calories: 450 },
      ],
      weightLogs: [
        { id: "1", date: "2024-01-15", weight: 180 },
        { id: "2", date: "2024-01-08", weight: 182 },
      ],
      weeks: [
        {
          weekNumber: 1,
          tasks: {
            videos: [
              { id: "1", title: "Introduction to Nutrition", watched: true, week: 1, duration: "15 min", accessType: "always", dayRequired: 1 },
              { id: "2", title: "Exercise Basics", watched: true, week: 1, duration: "12 min", accessType: "always", dayRequired: 1 },
            ],
            mealLogs: [
              { id: "1", date: "2024-01-15", meal: "Breakfast: Oatmeal with fruits", calories: 350, mealType: "breakfast", description: "Healthy start", time: "08:00" },
            ],
            weightLogs: [
              { id: "1", date: "2024-01-15", weight: 180, notes: "Morning weight" },
            ],
          },
          recommendedVideos: [
            { id: "r1", title: "Nutrition Basics", duration: "10 min" },
          ],
        },
        {
          weekNumber: 2,
          tasks: {
            videos: [
              { id: "3", title: "Meal Planning", watched: false, week: 2, duration: "18 min", accessType: "always", dayRequired: 1 },
            ],
            mealLogs: [],
            weightLogs: [],
          },
          recommendedVideos: [
            { id: "r2", title: "Advanced Meal Planning", duration: "15 min" },
          ],
        },
        {
          weekNumber: 3,
          tasks: {
            videos: [],
            mealLogs: [],
            weightLogs: [],
          },
          recommendedVideos: [],
        },
      ],
    },
    appointments: [
      {
        id: "1",
        title: "Initial Consultation",
        date: "2024-01-15",
        time: "10:00 AM",
        status: "booked"
      },
      {
        id: "2", 
        title: "Follow-up Session",
        date: "2024-01-22",
        time: "2:00 PM",
        status: "pending",
        rescheduleRequest: {
          requestedDate: "2024-01-23",
          requestedTime: "3:00 PM",
          reason: "Schedule conflict"
        }
      }
    ]
  });

  const approveReschedule = (appointmentId: string) => {
    setUserData(prev => ({
      ...prev,
      appointments: prev.appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'rescheduled' as const }
          : apt
      )
    }));
  };

  const requestReschedule = (appointmentId: string, requestedDate: string, requestedTime: string, reason: string) => {
    setUserData(prev => ({
      ...prev,
      appointments: prev.appointments.map(apt => 
        apt.id === appointmentId 
          ? { 
              ...apt, 
              status: 'pending' as const,
              rescheduleRequest: { requestedDate, requestedTime, reason }
            }
          : apt
      )
    }));
  };

  const updateUserData = async (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const addProgressEntry = async (entry: { month: string; weight: number; calories: number }) => {
    setUserData(prev => ({
      ...prev,
      progressData: [...prev.progressData, entry]
    }));
  };

  const addNutritionEntry = async (entry: { date: string; protein: number; carbs: number; fats: number }) => {
    const newEntry = {
      id: Date.now().toString(),
      ...entry
    };
    setUserData(prev => ({
      ...prev,
      nutritionData: [...prev.nutritionData, newEntry]
    }));
  };

  const addActivityEntry = async (entry: { date: string; steps: number; minutes: number }) => {
    const newEntry = {
      id: Date.now().toString(),
      ...entry
    };
    setUserData(prev => ({
      ...prev,
      activityData: [...prev.activityData, newEntry]
    }));
  };

  const addAppointment = async (appointment: { title: string; date: string; time: string; status: string }) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...appointment,
      status: appointment.status as 'booked' | 'pending' | 'rescheduled'
    };
    setUserData(prev => ({
      ...prev,
      appointments: [...prev.appointments, newAppointment]
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
    const newMealLog = {
      id: Date.now().toString(),
      ...mealLog
    };
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
    const newWeightLog = {
      id: Date.now().toString(),
      ...weightLog
    };
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

  const editMealLog = (weekNumber: number, id: string, mealLog: Partial<MealLog>) => {
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
                  mealLogs: week.tasks.mealLogs.map(log =>
                    log.id === id ? { ...log, ...mealLog } : log
                  )
                }
              }
            : week
        )
      }
    }));
  };

  const deleteMealLog = (weekNumber: number, id: string) => {
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
                  mealLogs: week.tasks.mealLogs.filter(log => log.id !== id)
                }
              }
            : week
        )
      }
    }));
  };

  const editWeightLog = (weekNumber: number, id: string, weightLog: Partial<WeightLog>) => {
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
                  weightLogs: week.tasks.weightLogs.map(log =>
                    log.id === id ? { ...log, ...weightLog } : log
                  )
                }
              }
            : week
        )
      }
    }));
  };

  const deleteWeightLog = (weekNumber: number, id: string) => {
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
                  weightLogs: week.tasks.weightLogs.filter(log => log.id !== id)
                }
              }
            : week
        )
      }
    }));
  };

  const completeWeek = (week: number) => {
    setUserData(prev => ({
      ...prev,
      program: {
        ...prev.program,
        currentWeek: Math.max(prev.program.currentWeek, week + 1)
      }
    }));
  };

  const value: UserDataContextType = {
    userData,
    loading,
    approveReschedule,
    requestReschedule,
    updateUserData,
    addProgressEntry,
    addNutritionEntry,
    addActivityEntry,
    addAppointment,
    markVideoWatched,
    addMealLog,
    addWeightLog,
    editMealLog,
    deleteMealLog,
    editWeightLog,
    deleteWeightLog,
    completeWeek,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
