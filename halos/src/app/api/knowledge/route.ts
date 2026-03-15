import { NextResponse } from "next/server";
import { db, cuid } from "@/lib/db";

export async function GET() {
  const entries = db
    .prepare("SELECT * FROM KnowledgeEntry ORDER BY createdAt DESC")
    .all();
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, source, tags } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  const id = cuid();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO KnowledgeEntry (id, title, content, source, tags, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, title, content, source || null, tags || "", now, now);

  db.prepare(
    `INSERT INTO Activity (id, type, description, createdAt)
     VALUES (?, 'knowledge_added', ?, ?)`
  ).run(cuid(), `${title} added to knowledge base`, now);

  const entry = db.prepare("SELECT * FROM KnowledgeEntry WHERE id = ?").get(id);
  return NextResponse.json(entry, { status: 201 });
}
