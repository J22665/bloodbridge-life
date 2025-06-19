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
      blood_banks: {
        Row: {
          address: string
          city: string
          created_at: string | null
          id: string
          is_verified: boolean | null
          license_number: string
          operating_hours: string | null
          pin_code: string
          state: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          id: string
          is_verified?: boolean | null
          license_number: string
          operating_hours?: string | null
          pin_code: string
          state: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          license_number?: string
          operating_hours?: string | null
          pin_code?: string
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "blood_banks_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          age: number
          blood_group: Database["public"]["Enums"]["blood_group"]
          city: string
          created_at: string | null
          emergency_contact: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          is_available: boolean | null
          last_donation_date: string | null
          medical_conditions: string | null
          pin_code: string
          state: string
          weight: number | null
        }
        Insert: {
          age: number
          blood_group: Database["public"]["Enums"]["blood_group"]
          city: string
          created_at?: string | null
          emergency_contact?: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          is_available?: boolean | null
          last_donation_date?: string | null
          medical_conditions?: string | null
          pin_code: string
          state: string
          weight?: number | null
        }
        Update: {
          age?: number
          blood_group?: Database["public"]["Enums"]["blood_group"]
          city?: string
          created_at?: string | null
          emergency_contact?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          is_available?: boolean | null
          last_donation_date?: string | null
          medical_conditions?: string | null
          pin_code?: string
          state?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "donors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string
          city: string
          created_at: string | null
          emergency_contact: string | null
          id: string
          is_verified: boolean | null
          pin_code: string
          registration_number: string
          state: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          emergency_contact?: string | null
          id: string
          is_verified?: boolean | null
          pin_code: string
          registration_number: string
          state: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          emergency_contact?: string | null
          id?: string
          is_verified?: boolean | null
          pin_code?: string
          registration_number?: string
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone: string
          updated_at?: string | null
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      users: {
        Row: {
          eamil: string
          id: string
          name: string
        }
        Insert: {
          eamil: string
          id?: string
          name: string
        }
        Update: {
          eamil?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      gender: "male" | "female" | "other"
      user_type: "donor" | "blood_bank" | "hospital"
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
      blood_group: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      gender: ["male", "female", "other"],
      user_type: ["donor", "blood_bank", "hospital"],
    },
  },
} as const
