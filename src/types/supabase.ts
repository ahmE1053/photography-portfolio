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
      contact_requests: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          phone: string;
          email: string;
          message: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          name: string;
          phone: string;
          email: string;
          message: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          name?: string;
          phone?: string;
          email?: string;
          message?: string;
        };
      };
    };
  };
}
