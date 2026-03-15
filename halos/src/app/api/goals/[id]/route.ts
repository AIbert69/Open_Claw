import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
  if (body.progress !== undefined) { fields.push("progress = ?"); values.push(body.progress); }

  fields.push("updatedAt = ?");
  values.push(now);
  values.push(id);

  db.prepare(`UPDATE Goal SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  const goal = db.prepare("SELECT * FROM Goal WHERE id = ?").get(id);
  return NextResponse.json(goal);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  db.prepare("DELETE FROM Goal WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
