/**
 * Database models matching the Supabase schema.
 * These mirror the tables in supabase/migrations/.
 */

// --- Profiles ---

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "reader" | "creator" | "admin";
  created_at: string;
}

// --- Characters ---

export interface Character {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  age: number | null;
  personality: string | null;
  appearance: string | null;
  backstory: string | null;
  favorite_animal: string | null;
  favorite_toy: string | null;
  created_at: string;
}

// --- Books ---

export interface Book {
  id: string;
  title: string;
  description: string | null;
  author_id: string;
  cover_url: string | null;
  price: number;
  category: string | null;
  published: boolean;
  created_at: string;
}

// --- Orders ---

export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export interface Order {
  id: string;
  user_id: string;
  book_id: string;
  status: OrderStatus;
  total: number;
  created_at: string;
}

// --- Reviews ---

export interface Review {
  id: string;
  user_id: string;
  book_id: string;
  rating: number;
  review: string | null;
}

// --- Pagination ---

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}