import { NextResponse } from "next/server";
import { db, cuid } from "@/lib/db";

export async function GET() {
  const tasks = db.prepare("SELECT * FROM Task ORDER BY createdAt ASC").all();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, priority, agentId } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const id = cuid();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO Task (id, title, completed, priority, agentId, createdAt, updatedAt)
     VALUES (?, ?, 0, ?, ?, ?, ?)`
  ).run(id, title, priority || "medium", agentId || null, now, now);

  db.prepare(
    `INSERT INTO Activity (id, type, description, createdAt)
     VALUES (?, 'task_created', ?, ?)`
  ).run(cuid(), `New task: ${title}`, now);

  const task = db.prepare("SELECT * FROM Task WHERE id = ?").get(id);
  return NextResponse.json(task, { status: 201 });
}
