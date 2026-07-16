/**
 * Supabase repository factory.
 * Provides typed CRUD helpers for any table.
 * Each method returns a Supabase query builder — callers chain .then() or await.
 */

import { getSupabaseClient, getServiceClient } from "../config/supabase";
import type { SupabaseClient } from "../config/supabase";
import type { PaginationParams, PaginatedResult } from "../models/supabase";

export type TableName =
  | "profiles"
  | "characters"
  | "books"
  | "orders"
  | "reviews";

/**
 * Generic repository for a Supabase table.
 * Uses the authenticated user's context by default; use `asAdmin()` for admin operations.
 */
export class SupabaseRepository<T extends Record<string, unknown>> {
  constructor(
    protected tableName: TableName,
    protected client: SupabaseClient = getSupabaseClient(),
  ) {}

  /**
   * Switch to the service-role client for admin operations.
   */
  asAdmin(): SupabaseRepository<T> {
    return new SupabaseRepository(this.tableName, getServiceClient());
  }

  /**
   * Switch to a specific client (e.g., one with a user's auth context).
   */
  asClient(client: SupabaseClient): SupabaseRepository<T> {
    return new SupabaseRepository(this.tableName, client);
  }

  // --- Read ---

  async findAll(params?: PaginationParams): Promise<PaginatedResult<T>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    const offset = (page - 1) * limit;

    const { data, error, count } = await this.client
      .from(this.tableName)
      .select("*", { count: "exact" })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return {
      data: (data ?? []) as T[],
      total: count ?? 0,
      page,
      limit,
    };
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code === "PGRST116") return null; // not found
    if (error) throw error;
    return data as T;
  }

  async findByField(
    field: string,
    value: unknown,
    params?: PaginationParams,
  ): Promise<PaginatedResult<T>> {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;
    const offset = (page - 1) * limit;

    const { data, error, count } = await this.client
      .from(this.tableName)
      .select("*", { count: "exact" })
      .eq(field, value)
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return {
      data: (data ?? []) as T[],
      total: count ?? 0,
      page,
      limit,
    };
  }

  // --- Create ---

  async create(data: Partial<T>): Promise<T> {
    const { data: created, error } = await this.client
      .from(this.tableName)
      .insert(data as Record<string, unknown>)
      .select()
      .single();

    if (error) throw error;
    return created as T;
  }

  // --- Update ---

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const { data: updated, error } = await this.client
      .from(this.tableName)
      .update(data as Record<string, unknown>)
      .eq("id", id)
      .select()
      .single();

    if (error && error.code === "PGRST116") return null;
    if (error) throw error;
    return updated as T;
  }

  // --- Delete ---

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.client
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) throw error;
    return (count ?? 0) > 0;
  }
}

/**
 * Lazy repository instances — created on first access, not at module load.
 * This avoids requiring SUPABASE_URL/SUPABASE_ANON_KEY at import time.
 */
function lazyRepo<T extends Record<string, unknown>>(table: TableName): SupabaseRepository<T> {
  let instance: SupabaseRepository<T> | null = null;
  return new Proxy({} as SupabaseRepository<T>, {
    get(_, prop) {
      if (!instance) instance = new SupabaseRepository<T>(table);
      const value = (instance as any)[prop];
      return typeof value === "function" ? value.bind(instance) : value;
    },
  });
}

export const profilesRepo = lazyRepo<import("../models/supabase").Profile>("profiles");
export const charactersRepo = lazyRepo<import("../models/supabase").Character>("characters");
export const booksRepo = lazyRepo<import("../models/supabase").Book>("books");
export const ordersRepo = lazyRepo<import("../models/supabase").Order>("orders");
export const reviewsRepo = lazyRepo<import("../models/supabase").Review>("reviews");