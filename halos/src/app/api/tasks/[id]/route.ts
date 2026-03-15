import { NextResponse } from "next/server";
import { db, cuid } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const now = new Date().toISOString();

  const fields: string[] = [];
  const values: unknown[] = [];

  if (body.title !== undefined) { fields.push("title = ?"); values.push(body.title); }
  if (body.completed !== undefined) { fields.push("completed = ?"); values.push(body.completed ? 1 : 0); }
  if (body.priority !== undefined) { fields.push("priority = ?"); values.push(body.priority); }

  fields.push("updatedAt = ?");
  values.push(now);
  values.push(id);

  db.prepare(`UPDATE Task SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  if (body.completed) {
    const task = db.prepare("SELECT title FROM Task WHERE id = ?").get(id) as { title: string } | undefined;
    if (task) {
      db.prepare(
        `INSERT INTO Activity (id, type, description, createdAt) VALUES (?, 'task_completed', ?, ?)`
      ).run(cuid(), `Task completed: ${task.title}`, now);
    }
  }

  const task = db.prepare("SELECT * FROM Task WHERE id = ?").get(id);
  return NextResponse.json(task);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  db.prepare("DELETE FROM Task WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
