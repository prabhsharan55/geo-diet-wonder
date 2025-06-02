
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

export type UserData = {
  name: string;
  currentWeight: number;
  workoutCompleted: number;
  caloriesTracked: number;
  progressData: Array<{ month: string; weight: number; calories: number }>;
  nutritionData: Array<{ date: string; protein: number; carbs: number; fats: number }>;
  activityData: Array<{ date: string; steps: number; minutes: number }>;
  appointments: Appointment[];
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
    ]
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

  return (
    <UserDataContext.Provider value={{
      userData,
      updateUserData,
      addProgressEntry,
      addNutritionEntry,
      addActivityEntry,
      addAppointment,
      requestReschedule,
      approveReschedule
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
