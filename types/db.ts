/**
 * Supabase 데이터베이스 타입.
 * 추후 `supabase gen types typescript --linked > types/db.ts` 로 자동 생성 교체.
 * 지금은 supabase/schema.sql (스펙 Section 5) 기준 수기 작성.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string;
          current_xp: number;
          current_streak: number;
          longest_streak: number;
          last_active_date: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          current_xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_active_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          current_xp?: number;
          current_streak?: number;
          longest_streak?: number;
          last_active_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      units: {
        Row: {
          id: string;
          sort_order: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: string;
          sort_order: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: string;
          sort_order?: number;
          title?: string;
          description?: string | null;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          id: string;
          unit_id: string;
          sort_order: number;
          title: string;
        };
        Insert: {
          id?: string;
          unit_id: string;
          sort_order: number;
          title: string;
        };
        Update: {
          id?: string;
          unit_id?: string;
          sort_order?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lessons_unit_id_fkey";
            columns: ["unit_id"];
            referencedRelation: "units";
            referencedColumns: ["id"];
          },
        ];
      };
      exercises: {
        Row: {
          id: string;
          lesson_id: string;
          sort_order: number;
          exercise_type: "mcq" | "input";
          prompt: string;
          correct_answer: string;
          options: Json | null;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          sort_order: number;
          exercise_type: "mcq" | "input";
          prompt: string;
          correct_answer: string;
          options?: Json | null;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          sort_order?: number;
          exercise_type?: "mcq" | "input";
          prompt?: string;
          correct_answer?: string;
          options?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "exercises_lesson_id_fkey";
            columns: ["lesson_id"];
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      user_lesson_progress: {
        Row: {
          user_id: string;
          lesson_id: string;
          completed_at: string;
          best_score: number | null;
          attempts: number;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          completed_at?: string;
          best_score?: number | null;
          attempts?: number;
        };
        Update: {
          user_id?: string;
          lesson_id?: string;
          completed_at?: string;
          best_score?: number | null;
          attempts?: number;
        };
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey";
            columns: ["lesson_id"];
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_lesson_progress_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
