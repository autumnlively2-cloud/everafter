/**
 * Base repository pattern — abstract data access layer.
 * All repositories should extend this base class.
 * Makes it easy to swap storage backends (in-memory → SQL → API).
 */

import type { Identifiable, PaginatedResult, PaginationParams } from "../models";

export interface Repository<T extends Identifiable> {
  findAll(params?: PaginationParams): Promise<PaginatedResult<T> | T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Omit<T, "id" | "created_at" | "updated_at">): Promise<T>;
  update(id: string, data: Partial<Omit<T, "id" | "created_at" | "updated_at">>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

/**
 * In-memory repository — useful as a starting point before switching to a real DB.
 * Models the base CRUD contract that all repositories follow.
 */
export abstract class BaseRepository<T extends Identifiable>
  implements Repository<T>
{
  protected items: Map<string, T> = new Map();

  async findAll(params?: PaginationParams): Promise<PaginatedResult<T> | T[]> {
    const all = Array.from(this.items.values());
    if (!params) return all;

    const { page, limit } = params;
    const start = (page - 1) * limit;
    const paginated = all.slice(start, start + limit);

    return {
      data: paginated,
      pagination: {
        page,
        limit,
        total: all.length,
        totalPages: Math.ceil(all.length / limit),
      },
    };
  }

  async findById(id: string): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  abstract create(data: unknown): Promise<T>;

  async update(
    id: string,
    data: Partial<Omit<T, "id" | "created_at" | "updated_at">>,
  ): Promise<T | null> {
    const existing = this.items.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.items.set(id, updated as T);
    return updated as T;
  }

  async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }
}