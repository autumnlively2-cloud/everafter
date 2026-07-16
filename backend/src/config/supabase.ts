/**
 * Supabase client factory.
 * Creates a typed Supabase client using environment variables.
 * Use this from services and repositories to access the database.
 */

import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Lazy-loading singleton — only creates the client when first called
let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (client) return client;

  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables. " +
        "Add them to .env or connect via the database card.",
    );
  }

  client = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return client;
}

/**
 * Returns a Supabase client with the service role key for admin operations.
 * Requires SUPABASE_SERVICE_ROLE_KEY to be set.
 */
export function getServiceClient() {
  const url = env.SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for admin operations.",
    );
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type SupabaseClient = ReturnType<typeof createClient>;