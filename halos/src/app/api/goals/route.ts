import { NextResponse } from "next/server";
import { db, cuid } from "@/lib/db";

export async function GET() {
  const goals = db.prepare("SELECT * FROM Goal ORDER BY createdAt ASC").all();
  return NextResponse.json(goals);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const id = cuid();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO Goal (id, title, completed, progress, createdAt, updatedAt)
     VALUES (?, ?, 0, 0, ?, ?)`
  ).run(id, title, now, now);

  const goal = db.prepare("SELECT * FROM Goal WHERE id = ?").get(id);
  return NextResponse.json(goal, { status: 201 });
}
