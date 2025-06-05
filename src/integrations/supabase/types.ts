export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_entries: {
        Row: {
          created_at: string
          date: string
          exercise_minutes: number
          id: string
          steps: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          exercise_minutes: number
          id?: string
          steps: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          exercise_minutes?: number
          id?: string
          steps?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          created_at: string
          date: string
          id: string
          reschedule_request: Json | null
          status: string
          time: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          reschedule_request?: Json | null
          status?: string
          time: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          reschedule_request?: Json | null
          status?: string
          time?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      clinics: {
        Row: {
          address: string
          created_at: string
          id: string
          name: string
          owner_email: string
          region: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          name: string
          owner_email: string
          region: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          name?: string
          owner_email?: string
          region?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          access_status: Database["public"]["Enums"]["access_status"]
          clinic_id: string | null
          created_at: string
          email: string
          expiry_date: string | null
          extended_days: number | null
          freeze_reason: string | null
          freeze_until: string | null
          id: string
          purchase_date: string
          user_id: string
        }
        Insert: {
          access_status?: Database["public"]["Enums"]["access_status"]
          clinic_id?: string | null
          created_at?: string
          email: string
          expiry_date?: string | null
          extended_days?: number | null
          freeze_reason?: string | null
          freeze_until?: string | null
          id?: string
          purchase_date?: string
          user_id: string
        }
        Update: {
          access_status?: Database["public"]["Enums"]["access_status"]
          clinic_id?: string | null
          created_at?: string
          email?: string
          expiry_date?: string | null
          extended_days?: number | null
          freeze_reason?: string | null
          freeze_until?: string | null
          id?: string
          purchase_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "customers_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plans: {
        Row: {
          calories: number | null
          clinic_id: string
          created_at: string
          customer_id: string
          date: string
          description: string
          feedback: string | null
          id: string
          meal_type: string
          name: string
          updated_at: string
        }
        Insert: {
          calories?: number | null
          clinic_id: string
          created_at?: string
          customer_id: string
          date: string
          description: string
          feedback?: string | null
          id?: string
          meal_type: string
          name: string
          updated_at?: string
        }
        Update: {
          calories?: number | null
          clinic_id?: string
          created_at?: string
          customer_id?: string
          date?: string
          description?: string
          feedback?: string | null
          id?: string
          meal_type?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plans_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plans_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_entries: {
        Row: {
          carbs: number
          created_at: string
          date: string
          fats: number
          id: string
          protein: number
          updated_at: string
          user_id: string
        }
        Insert: {
          carbs: number
          created_at?: string
          date: string
          fats: number
          id?: string
          protein: number
          updated_at?: string
          user_id: string
        }
        Update: {
          carbs?: number
          created_at?: string
          date?: string
          fats?: number
          id?: string
          protein?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          address: string
          clinic_name: string
          created_at: string
          email: string
          id: string
          notes: string | null
          owner_name: string
          phone: string | null
          region: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          zip_code: string | null
        }
        Insert: {
          address: string
          clinic_name: string
          created_at?: string
          email: string
          id?: string
          notes?: string | null
          owner_name: string
          phone?: string | null
          region: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          zip_code?: string | null
        }
        Update: {
          address?: string
          clinic_name?: string
          created_at?: string
          email?: string
          id?: string
          notes?: string | null
          owner_name?: string
          phone?: string | null
          region?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      progress_reports: {
        Row: {
          created_at: string
          customer_id: string
          energy_level: number | null
          glucose_avg: number | null
          id: string
          week: number
          weight: number | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          energy_level?: number | null
          glucose_avg?: number | null
          id?: string
          week: number
          weight?: number | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          energy_level?: number | null
          glucose_avg?: number | null
          id?: string
          week?: number
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_reports_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          calories_tracked: number | null
          city: string | null
          created_at: string
          current_weight: number | null
          full_name: string
          gender: string | null
          health_data: Json | null
          height: number | null
          id: string
          mobile: string | null
          selected_plan: string | null
          user_id: string
          weight: number | null
          workout_completed: number | null
        }
        Insert: {
          calories_tracked?: number | null
          city?: string | null
          created_at?: string
          current_weight?: number | null
          full_name: string
          gender?: string | null
          health_data?: Json | null
          height?: number | null
          id?: string
          mobile?: string | null
          selected_plan?: string | null
          user_id: string
          weight?: number | null
          workout_completed?: number | null
        }
        Update: {
          calories_tracked?: number | null
          city?: string | null
          created_at?: string
          current_weight?: number | null
          full_name?: string
          gender?: string | null
          health_data?: Json | null
          height?: number | null
          id?: string
          mobile?: string | null
          selected_plan?: string | null
          user_id?: string
          weight?: number | null
          workout_completed?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          clinic_id: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          clinic_id?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      videos: {
        Row: {
          clinic_id: string | null
          created_at: string
          id: string
          title: string
          uploaded_by: string | null
          url: string
          visibility: Database["public"]["Enums"]["content_visibility"]
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string
          id?: string
          title: string
          uploaded_by?: string | null
          url: string
          visibility?: Database["public"]["Enums"]["content_visibility"]
        }
        Update: {
          clinic_id?: string | null
          created_at?: string
          id?: string
          title?: string
          uploaded_by?: string | null
          url?: string
          visibility?: Database["public"]["Enums"]["content_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "videos_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_clinic_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_details: {
        Args: { user_id: string }
        Returns: {
          id: string
          full_name: string
          email: string
        }[]
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      access_status: "active" | "frozen" | "expired"
      content_visibility: "public" | "partner" | "customer"
      user_role: "admin" | "partner" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      access_status: ["active", "frozen", "expired"],
      content_visibility: ["public", "partner", "customer"],
      user_role: ["admin", "partner", "customer"],
    },
  },
} as const
