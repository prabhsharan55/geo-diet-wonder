
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export type AppointmentEntry = {
  id: string;
  user_id: string;
  title: string;
  date: string;
  time: string;
  status: string;
  reschedule_request: any;
  created_at: string;
  updated_at: string;
};

export const useAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching appointments:', error);
        return;
      }

      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (appointment: Omit<AppointmentEntry, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'reschedule_request'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          ...appointment
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding appointment:', error);
        toast.error('Failed to add appointment');
        return;
      }

      setAppointments(prev => [data, ...prev]);
      toast.success('Appointment added!');
    } catch (error) {
      console.error('Error adding appointment:', error);
      toast.error('Failed to add appointment');
    }
  };

  return {
    appointments,
    loading,
    addAppointment,
    refetch: fetchAppointments
  };
};
