
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export type ActivityEntry = {
  id: string;
  user_id: string;
  date: string;
  steps: number;
  exercise_minutes: number;
  created_at: string;
  updated_at: string;
};

export const useActivityData = () => {
  const { user } = useAuth();
  const [activityData, setActivityData] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchActivityData();
    }
  }, [user]);

  const fetchActivityData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('activity_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching activity data:', error);
        return;
      }

      setActivityData(data || []);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addActivityEntry = async (entry: Omit<ActivityEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('activity_entries')
        .insert({
          user_id: user.id,
          ...entry
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding activity entry:', error);
        toast.error('Failed to add activity entry');
        return;
      }

      setActivityData(prev => [data, ...prev]);
      toast.success('Activity data added!');
    } catch (error) {
      console.error('Error adding activity entry:', error);
      toast.error('Failed to add activity entry');
    }
  };

  return {
    activityData,
    loading,
    addActivityEntry,
    refetch: fetchActivityData
  };
};
