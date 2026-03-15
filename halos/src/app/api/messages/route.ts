import { NextResponse } from "next/server";
import { db, cuid } from "@/lib/db";
import { getMockResponse } from "@/lib/mock-responses";

interface AgentRow {
  id: string;
  name: string;
  role: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId");

  if (!agentId) {
    return NextResponse.json({ error: "agentId is required" }, { status: 400 });
  }

  const messages = db
    .prepare("SELECT * FROM Message WHERE agentId = ? ORDER BY createdAt ASC")
    .all(agentId);

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { content, agentId } = body;

  if (!content || !agentId) {
    return NextResponse.json(
      { error: "content and agentId are required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();

  // Save user message
  const userMsgId = cuid();
  db.prepare(
    `INSERT INTO Message (id, content, role, agentId, createdAt)
     VALUES (?, ?, 'user', ?, ?)`
  ).run(userMsgId, content, agentId, now);

  // Get agent info for mock response
  const agent = db.prepare("SELECT * FROM Agent WHERE id = ?").get(agentId) as AgentRow | undefined;
  const agentRole = agent?.role || "boss";
  const mockReply = getMockResponse(agentRole);

  // Save agent response (slight delay in timestamp)
  const agentMsgId = cuid();
  const replyTime = new Date(Date.now() + 500).toISOString();
  db.prepare(
    `INSERT INTO Message (id, content, role, agentId, createdAt)
     VALUES (?, ?, 'agent', ?, ?)`
  ).run(agentMsgId, mockReply, agentId, replyTime);

  // Log activity
  db.prepare(
    `INSERT INTO Activity (id, type, description, agentId, createdAt)
     VALUES (?, 'agent_message', ?, ?, ?)`
  ).run(cuid(), `Chat with ${agent?.name || "agent"}`, agentId, now);

  const userMsg = db.prepare("SELECT * FROM Message WHERE id = ?").get(userMsgId);
  const agentMsg = db.prepare("SELECT * FROM Message WHERE id = ?").get(agentMsgId);

  return NextResponse.json({ userMessage: userMsg, agentMessage: agentMsg }, { status: 201 });
}
