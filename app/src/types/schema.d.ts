
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
          createdAt: string
          name: string
          profileId: number
          updatedAt: string
        }
        Insert: {
          belongId?: string
          code?: number | null
          createdAt?: string
          name: string
          profileId: number
          updatedAt?: string
        }
        Update: {
          belongId?: string
          code?: number | null
          createdAt?: string
          name?: string
          profileId?: number
          updatedAt?: string
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
            foreignKeyName: "belong_profileId_fkey"
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
          createdAt: string
          description: string | null
          imageUrl: string | null
          name: string
          updatedAt: string
        }
        Insert: {
          code?: number
          color: string
          count?: number | null
          createdAt?: string
          description?: string | null
          imageUrl?: string | null
          name: string
          updatedAt?: string
        }
        Update: {
          code?: number
          color?: string
          count?: number | null
          createdAt?: string
          description?: string | null
          imageUrl?: string | null
          name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      friend: {
        Row: {
          createdAt: string
          friendId: number
          mutual: boolean
          receiverId: number
          senderId: number
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          friendId?: number
          mutual?: boolean
          receiverId: number
          senderId: number
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          friendId?: number
          mutual?: boolean
          receiverId?: number
          senderId?: number
          updatedAt?: string
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
            foreignKeyName: "friend_senderId_fkey"
            columns: ["senderId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["profileId"]
          },
        ]
      }
      profile: {
        Row: {
          authorId: string
          avatarUrl: string | null
          color: string
          createdAt: string
          displayName: string
          hobby: string
          introduction: string
          name: string
          profileId: number
          talent: string
          updatedAt: string
        }
        Insert: {
          authorId: string
          avatarUrl?: string | null
          color: string
          createdAt?: string
          displayName: string
          hobby: string
          introduction: string
          name: string
          profileId?: number
          talent: string
          updatedAt?: string
        }
        Update: {
          authorId?: string
          avatarUrl?: string | null
          color?: string
          createdAt?: string
          displayName?: string
          hobby?: string
          introduction?: string
          name?: string
          profileId?: number
          talent?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_authorId_fkey"
            columns: ["authorId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["userId"]
          },
        ]
      }
      user: {
        Row: {
          createdAt: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          updatedAt?: string
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
