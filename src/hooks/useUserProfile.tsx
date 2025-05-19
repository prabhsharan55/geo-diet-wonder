
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export type UserProfile = {
  id: string;
  full_name: string;
  mobile: string | null;
  city: string | null;
  gender: string | null;
  weight: number | null;
  height: number | null;
  selected_plan: string | null;
  health_data: Record<string, string> | null;
  created_at: string;
  user_id: string;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const { data, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (profileError) {
          throw profileError;
        }
        
        // Type assertion after validating the data exists
        if (data) {
          setProfile(data as UserProfile);
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update the local profile state with the changes
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      return { success: true, error: null };
    } catch (err: any) {
      console.error('Error updating profile:', err);
      return { success: false, error: err.message };
    }
  };
  
  return { profile, loading, error, updateProfile };
};
