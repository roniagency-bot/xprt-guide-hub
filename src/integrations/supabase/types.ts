export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      content_audit: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          page_path: string
          reviewed_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          page_path: string
          reviewed_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          page_path?: string
          reviewed_at?: string | null
          status?: string
        }
        Relationships: []
      }
      download_tokens: {
        Row: {
          click_count: number
          created_at: string
          email: string
          first_clicked_at: string | null
          lang: string
          last_clicked_at: string | null
          lead_submission_id: string | null
          slug: string
          token: string
        }
        Insert: {
          click_count?: number
          created_at?: string
          email: string
          first_clicked_at?: string | null
          lang?: string
          last_clicked_at?: string | null
          lead_submission_id?: string | null
          slug: string
          token: string
        }
        Update: {
          click_count?: number
          created_at?: string
          email?: string
          first_clicked_at?: string | null
          lang?: string
          last_clicked_at?: string | null
          lead_submission_id?: string | null
          slug?: string
          token?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      faq_categories: {
        Row: {
          created_at: string
          description_en: string | null
          display_order: number
          id: string
          name_en: string
          name_es: string | null
          service_category_id: string | null
          service_page_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          display_order?: number
          id?: string
          name_en: string
          name_es?: string | null
          service_category_id?: string | null
          service_page_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          display_order?: number
          id?: string
          name_en?: string
          name_es?: string | null
          service_category_id?: string | null
          service_page_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "faq_categories_service_category_id_fkey"
            columns: ["service_category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_categories_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_items: {
        Row: {
          category_id: string | null
          created_at: string
          cta_lead_magnet_id: string | null
          funnel_stage: Database["public"]["Enums"]["funnel_stage"]
          id: string
          is_published: boolean
          is_speakable: boolean
          long_answer_en: string | null
          long_answer_es: string | null
          meta_description: string | null
          meta_title: string | null
          question_en: string
          question_es: string | null
          related_faq_ids: string[]
          service_page_id: string | null
          short_answer_en: string
          short_answer_es: string | null
          slug: string
          updated_at: string
          view_count: number
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          cta_lead_magnet_id?: string | null
          funnel_stage?: Database["public"]["Enums"]["funnel_stage"]
          id?: string
          is_published?: boolean
          is_speakable?: boolean
          long_answer_en?: string | null
          long_answer_es?: string | null
          meta_description?: string | null
          meta_title?: string | null
          question_en: string
          question_es?: string | null
          related_faq_ids?: string[]
          service_page_id?: string | null
          short_answer_en: string
          short_answer_es?: string | null
          slug: string
          updated_at?: string
          view_count?: number
        }
        Update: {
          category_id?: string | null
          created_at?: string
          cta_lead_magnet_id?: string | null
          funnel_stage?: Database["public"]["Enums"]["funnel_stage"]
          id?: string
          is_published?: boolean
          is_speakable?: boolean
          long_answer_en?: string | null
          long_answer_es?: string | null
          meta_description?: string | null
          meta_title?: string | null
          question_en?: string
          question_es?: string | null
          related_faq_ids?: string[]
          service_page_id?: string | null
          short_answer_en?: string
          short_answer_es?: string | null
          slug?: string
          updated_at?: string
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "faq_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "faq_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_items_lead_magnet_fk"
            columns: ["cta_lead_magnet_id"]
            isOneToOne: false
            referencedRelation: "lead_magnets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_items_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      internal_cta_links: {
        Row: {
          created_at: string
          description: string | null
          href: string
          id: string
          key: string
          label_en: string
          label_es: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          href: string
          id?: string
          key: string
          label_en: string
          label_es?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          href?: string
          id?: string
          key?: string
          label_en?: string
          label_es?: string | null
        }
        Relationships: []
      }
      lead_magnet_events: {
        Row: {
          created_at: string
          event: string
          id: string
          ip_hash: string | null
          metadata: Json | null
          referer: string | null
          slug: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event: string
          id?: string
          ip_hash?: string | null
          metadata?: Json | null
          referer?: string | null
          slug: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event?: string
          id?: string
          ip_hash?: string | null
          metadata?: Json | null
          referer?: string | null
          slug?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      lead_magnets: {
        Row: {
          asset_url: string | null
          bullets_en: string[]
          bullets_es: string[]
          category_id: string | null
          created_at: string
          description_en: string | null
          description_es: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          service_page_id: string | null
          slug: string
          state_restriction: Database["public"]["Enums"]["us_state"] | null
          subtitle_en: string | null
          subtitle_es: string | null
          thank_you_message_en: string | null
          title_en: string
          title_es: string | null
          updated_at: string
        }
        Insert: {
          asset_url?: string | null
          bullets_en?: string[]
          bullets_es?: string[]
          category_id?: string | null
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          service_page_id?: string | null
          slug: string
          state_restriction?: Database["public"]["Enums"]["us_state"] | null
          subtitle_en?: string | null
          subtitle_es?: string | null
          thank_you_message_en?: string | null
          title_en: string
          title_es?: string | null
          updated_at?: string
        }
        Update: {
          asset_url?: string | null
          bullets_en?: string[]
          bullets_es?: string[]
          category_id?: string | null
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          service_page_id?: string | null
          slug?: string
          state_restriction?: Database["public"]["Enums"]["us_state"] | null
          subtitle_en?: string | null
          subtitle_es?: string | null
          thank_you_message_en?: string | null
          title_en?: string
          title_es?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_magnets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_magnets_service_page_id_fkey"
            columns: ["service_page_id"]
            isOneToOne: false
            referencedRelation: "service_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_submissions: {
        Row: {
          category_tag: string | null
          consent: boolean
          created_at: string
          email: string
          full_name: string
          id: string
          lead_magnet_id: string | null
          notes: string | null
          phone: string | null
          source_path: string | null
          state: Database["public"]["Enums"]["us_state"] | null
        }
        Insert: {
          category_tag?: string | null
          consent?: boolean
          created_at?: string
          email: string
          full_name: string
          id?: string
          lead_magnet_id?: string | null
          notes?: string | null
          phone?: string | null
          source_path?: string | null
          state?: Database["public"]["Enums"]["us_state"] | null
        }
        Update: {
          category_tag?: string | null
          consent?: boolean
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          lead_magnet_id?: string | null
          notes?: string | null
          phone?: string | null
          source_path?: string | null
          state?: Database["public"]["Enums"]["us_state"] | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_submissions_lead_magnet_id_fkey"
            columns: ["lead_magnet_id"]
            isOneToOne: false
            referencedRelation: "lead_magnets"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_submissions: {
        Row: {
          answers: Json
          category_tag: string | null
          consent: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          page_url: string | null
          phone: string | null
          quiz_slug: string
          result_type: string
          score: number
          source_path: string | null
          state: string | null
        }
        Insert: {
          answers?: Json
          category_tag?: string | null
          consent?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          page_url?: string | null
          phone?: string | null
          quiz_slug: string
          result_type: string
          score?: number
          source_path?: string | null
          state?: string | null
        }
        Update: {
          answers?: Json
          category_tag?: string | null
          consent?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          page_url?: string | null
          phone?: string | null
          quiz_slug?: string
          result_type?: string
          score?: number
          source_path?: string | null
          state?: string | null
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description_en: string | null
          description_es: string | null
          display_order: number
          id: string
          line: Database["public"]["Enums"]["line_of_business"]
          meta_description: string | null
          meta_title: string | null
          name_en: string
          name_es: string | null
          slug: string
          state_restriction: Database["public"]["Enums"]["us_state"] | null
          tagline_en: string | null
          tagline_es: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          display_order?: number
          id?: string
          line: Database["public"]["Enums"]["line_of_business"]
          meta_description?: string | null
          meta_title?: string | null
          name_en: string
          name_es?: string | null
          slug: string
          state_restriction?: Database["public"]["Enums"]["us_state"] | null
          tagline_en?: string | null
          tagline_es?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_es?: string | null
          display_order?: number
          id?: string
          line?: Database["public"]["Enums"]["line_of_business"]
          meta_description?: string | null
          meta_title?: string | null
          name_en?: string
          name_es?: string | null
          slug?: string
          state_restriction?: Database["public"]["Enums"]["us_state"] | null
          tagline_en?: string | null
          tagline_es?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      service_pages: {
        Row: {
          body_en: string | null
          body_es: string | null
          category_id: string
          common_mistakes_en: string | null
          created_at: string
          display_order: number
          hero_headline_en: string | null
          hero_headline_es: string | null
          hero_sub_en: string | null
          hero_sub_es: string | null
          id: string
          is_published: boolean
          meta_description: string | null
          meta_title: string | null
          name_en: string
          name_es: string | null
          slug: string
          state_restriction: Database["public"]["Enums"]["us_state"] | null
          updated_at: string
          what_it_covers_en: string | null
          who_its_for_en: string | null
        }
        Insert: {
          body_en?: string | null
          body_es?: string | null
          category_id: string
          common_mistakes_en?: string | null
          created_at?: string
          display_order?: number
          hero_headline_en?: string | null
          hero_headline_es?: string | null
          hero_sub_en?: string | null
          hero_sub_es?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          name_en: string
          name_es?: string | null
          slug: string
          state_restriction?: Database["public"]["Enums"]["us_state"] | null
          updated_at?: string
          what_it_covers_en?: string | null
          who_its_for_en?: string | null
        }
        Update: {
          body_en?: string | null
          body_es?: string | null
          category_id?: string
          common_mistakes_en?: string | null
          created_at?: string
          display_order?: number
          hero_headline_en?: string | null
          hero_headline_es?: string | null
          hero_sub_en?: string | null
          hero_sub_es?: string | null
          id?: string
          is_published?: boolean
          meta_description?: string | null
          meta_title?: string | null
          name_en?: string
          name_es?: string | null
          slug?: string
          state_restriction?: Database["public"]["Enums"]["us_state"] | null
          updated_at?: string
          what_it_covers_en?: string | null
          who_its_for_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_pages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      state_rules: {
        Row: {
          body_en: string
          body_es: string | null
          created_at: string
          id: string
          source_url: string | null
          state: Database["public"]["Enums"]["us_state"]
          topic: string
          updated_at: string
        }
        Insert: {
          body_en: string
          body_es?: string | null
          created_at?: string
          id?: string
          source_url?: string | null
          state: Database["public"]["Enums"]["us_state"]
          topic: string
          updated_at?: string
        }
        Update: {
          body_en?: string
          body_es?: string | null
          created_at?: string
          id?: string
          source_url?: string | null
          state?: Database["public"]["Enums"]["us_state"]
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      funnel_stage: "tofu" | "mofu" | "bofu"
      line_of_business: "personal" | "commercial" | "bonds" | "dealership"
      us_state: "NV" | "CO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
      funnel_stage: ["tofu", "mofu", "bofu"],
      line_of_business: ["personal", "commercial", "bonds", "dealership"],
      us_state: ["NV", "CO"],
    },
  },
} as const
