import { NextResponse } from "next/server";
import { db, cuid } from "@/lib/db";

export async function GET() {
  const agents = db.prepare("SELECT * FROM Agent ORDER BY createdAt ASC").all();
  return NextResponse.json(agents);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, role, description, avatar, color } = body;

  if (!name || !role) {
    return NextResponse.json({ error: "Name and role are required" }, { status: 400 });
  }

  const id = cuid();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO Agent (id, name, role, description, avatar, color, isOnline, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)`
  ).run(id, name, role, description || null, avatar || name[0].toUpperCase(), color || "#6366f1", now, now);

  // Log activity
  db.prepare(
    `INSERT INTO Activity (id, type, description, agentId, createdAt)
     VALUES (?, 'agent_created', ?, ?, ?)`
  ).run(cuid(), `Agent ${name} was created for ${role}`, id, now);

  const agent = db.prepare("SELECT * FROM Agent WHERE id = ?").get(id);
  return NextResponse.json(agent, { status: 201 });
}
