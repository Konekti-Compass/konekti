
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      belong: {
        Row: {
          belongId: string
          code: number | null
          createdAt: string | null
          name: string
          profileId: number | null
          updatedAt: string | null
        }
        Insert: {
          belongId?: string
          code?: number | null
          createdAt?: string | null
          name: string
          profileId?: number | null
          updatedAt?: string | null
        }
        Update: {
          belongId?: string
          code?: number | null
          createdAt?: string | null
          name?: string
          profileId?: number | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "belong_code_fkey"
            columns: ["code"]
            isOneToOne: false
            referencedRelation: "belong_code"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "belong_profileid_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profileId"]
          },
        ]
      }
      belong_code: {
        Row: {
          code: number
          color: string
          count: number | null
          createdAt: string | null
          description: string | null
          imageUrl: string | null
          name: string
          updatedAt: string | null
        }
        Insert: {
          code?: number
          color: string
          count?: number | null
          createdAt?: string | null
          description?: string | null
          imageUrl?: string | null
          name: string
          updatedAt?: string | null
        }
        Update: {
          code?: number
          color?: string
          count?: number | null
          createdAt?: string | null
          description?: string | null
          imageUrl?: string | null
          name?: string
          updatedAt?: string | null
        }
        Relationships: []
      }
      friend: {
        Row: {
          createdAt: string | null
          friendId: number
          mutual: boolean
          receiverId: number | null
          senderId: number | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string | null
          friendId?: number
          mutual: boolean
          receiverId?: number | null
          senderId?: number | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string | null
          friendId?: number
          mutual?: boolean
          receiverId?: number | null
          senderId?: number | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friend_receiverId_fkey"
            columns: ["receiverId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profileId"]
          },
          {
            foreignKeyName: "friend_senderid_fkey"
            columns: ["senderId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profileId"]
          },
        ]
      }
      profile: {
        Row: {
          authorId: string | null
          avatarUrl: string | null
          color: string
          createdAt: string | null
          displayName: string
          hobby: string
          introduction: string
          name: string
          profileId: number
          talent: string
          updatedAt: string | null
        }
        Insert: {
          authorId?: string | null
          avatarUrl?: string | null
          color: string
          createdAt?: string | null
          displayName: string
          hobby: string
          introduction: string
          name: string
          profileId?: number
          talent: string
          updatedAt?: string | null
        }
        Update: {
          authorId?: string | null
          avatarUrl?: string | null
          color?: string
          createdAt?: string | null
          displayName?: string
          hobby?: string
          introduction?: string
          name?: string
          profileId?: number
          talent?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_authorid_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["userId"]
          },
        ]
      }
      user: {
        Row: {
          createdAt: string | null
          updatedAt: string | null
          userId: string
        }
        Insert: {
          createdAt?: string | null
          updatedAt?: string | null
          userId: string
        }
        Update: {
          createdAt?: string | null
          updatedAt?: string | null
          userId?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
