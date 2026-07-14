/**
 * Base model types/db schema patterns.
 */

// --- Generic types for CRUD resources ---

export interface Identifiable {
  id: string;
}

export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export type BaseEntity = Identifiable & Timestamps;

// --- Example: Client resource (for future SaaS clients) ---

export interface Client extends BaseEntity {
  name: string;
  slug: string;
  email: string;
  status: "active" | "inactive";
}

// --- Example: Project resource ---

export interface Project extends BaseEntity {
  client_id: string;
  name: string;
  description?: string;
  status: "planning" | "active" | "completed" | "archived";
}

// --- Generic pagination ---

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// --- Generic API response wrappers ---

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}