import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agent = db.prepare("SELECT * FROM Agent WHERE id = ?").get(id);
  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }
  return NextResponse.json(agent);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const now = new Date().toISOString();

  const fields: string[] = [];
  const values: unknown[] = [];

  if (body.name !== undefined) { fields.push("name = ?"); values.push(body.name); }
  if (body.role !== undefined) { fields.push("role = ?"); values.push(body.role); }
  if (body.description !== undefined) { fields.push("description = ?"); values.push(body.description); }
  if (body.avatar !== undefined) { fields.push("avatar = ?"); values.push(body.avatar); }
  if (body.color !== undefined) { fields.push("color = ?"); values.push(body.color); }
  if (body.isOnline !== undefined) { fields.push("isOnline = ?"); values.push(body.isOnline ? 1 : 0); }

  fields.push("updatedAt = ?");
  values.push(now);
  values.push(id);

  db.prepare(`UPDATE Agent SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  const agent = db.prepare("SELECT * FROM Agent WHERE id = ?").get(id);
  return NextResponse.json(agent);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  db.prepare("DELETE FROM Agent WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
