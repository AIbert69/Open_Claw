import Database from "better-sqlite3";
import path from "path";

const globalForDb = globalThis as unknown as { db: Database.Database };

function createDb() {
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

export const db = globalForDb.db || createDb();

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

// Helper to generate IDs
export function cuid() {
  return "c" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
