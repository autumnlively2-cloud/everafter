/**
 * Example CRUD scaffolding for a "Client" resource.
 *
 * This demonstrates the clean architecture pattern:
 *   Model  →  Repository  →  Service  →  Controller  →  Route
 *
 * When you're ready to add a real resource:
 * 1. Copy this file and rename "Client" to your resource name.
 * 2. Define the model in src/models.
 * 3. Create a repository extending BaseRepository.
 * 4. Create a service with business logic.
 * 5. Create a controller handling HTTP concerns.
 * 6. Register the routes in src/routes/index.ts.
 */

// --- Model ---
// (defined in src/models/index.ts — see Client interface)

// --- Repository ---
import { BaseRepository } from "../../repositories/base";
import type { Client } from "../../models";

export class ClientRepository extends BaseRepository<Client> {
  private counter = 0;

  async create(data: Omit<Client, "id" | "created_at" | "updated_at">): Promise<Client> {
    const now = new Date().toISOString();
    this.counter++;
    const client: Client = {
      id: `client-${this.counter}`,
      ...data,
      created_at: now,
      updated_at: now,
    };
    this.items.set(client.id, client);
    return client;
  }
}

// --- Service ---
import { NotFoundError, ConflictError } from "../../utils/errors";

export class ClientService {
  constructor(private repo: ClientRepository) {}

  async list() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const client = await this.repo.findById(id);
    if (!client) throw new NotFoundError("Client");
    return client;
  }

  async create(data: Omit<Client, "id" | "created_at" | "updated_at">) {
    // Example business rule: check for duplicate slug
    const all = (await this.repo.findAll()) as Client[];
    const existing = all.find((c) => c.slug === data.slug);
    if (existing) throw new ConflictError(`Client with slug "${data.slug}" already exists`);

    return this.repo.create(data);
  }

  async update(id: string, data: Partial<Omit<Client, "id" | "created_at" | "updated_at">>) {
    const updated = await this.repo.update(id, data);
    if (!updated) throw new NotFoundError("Client");
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new NotFoundError("Client");
    return deleted;
  }
}

// --- Controller ---
import type { Context } from "hono";

const clientService = new ClientService(new ClientRepository());

export async function listClients(c: Context) {
  const clients = await clientService.list();
  return c.json({ success: true, data: clients });
}

export async function getClient(c: Context) {
  const id = c.req.param("id");
  const client = await clientService.getById(id);
  return c.json({ success: true, data: client });
}

export async function createClient(c: Context) {
  const body = await c.req.json();
  const client = await clientService.create(body);
  return c.json({ success: true, data: client }, 201);
}

export async function updateClient(c: Context) {
  const id = c.req.param("id");
  const body = await c.req.json();
  const client = await clientService.update(id, body);
  return c.json({ success: true, data: client });
}

export async function deleteClient(c: Context) {
  const id = c.req.param("id");
  await clientService.delete(id);
  return c.json({ success: true, data: null }, 204);
}

// --- Routes ---
import { Hono } from "hono";

export const clientRoutes = new Hono();
clientRoutes.get("/", listClients);
clientRoutes.get("/:id", getClient);
clientRoutes.post("/", createClient);
clientRoutes.put("/:id", updateClient);
clientRoutes.delete("/:id", deleteClient);