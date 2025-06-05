
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export type NutritionEntry = {
  id: string;
  user_id: string;
  date: string;
  protein: number;
  carbs: number;
  fats: number;
  created_at: string;
  updated_at: string;
};

export const useNutritionData = () => {
  const { user } = useAuth();
  const [nutritionData, setNutritionData] = useState<NutritionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchNutritionData();
    }
  }, [user]);

  const fetchNutritionData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('nutrition_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching nutrition data:', error);
        return;
      }

      setNutritionData(data || []);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNutritionEntry = async (entry: Omit<NutritionEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('nutrition_entries')
        .insert({
          user_id: user.id,
          ...entry
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding nutrition entry:', error);
        toast.error('Failed to add nutrition entry');
        return;
      }

      setNutritionData(prev => [data, ...prev]);
      toast.success('Nutrition data added!');
    } catch (error) {
      console.error('Error adding nutrition entry:', error);
      toast.error('Failed to add nutrition entry');
    }
  };

  return {
    nutritionData,
    loading,
    addNutritionEntry,
    refetch: fetchNutritionData
  };
};
