
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

interface UserDataContextType {
  userData: UserData;
  loading: boolean;
  approveReschedule: (appointmentId: string) => void;
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

  const value: UserDataContextType = {
    userData,
    loading,
    approveReschedule,
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
