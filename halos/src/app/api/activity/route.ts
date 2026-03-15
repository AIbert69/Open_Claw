import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const activities = db
    .prepare(
      `SELECT Activity.*, Agent.name as agentName, Agent.color as agentColor, Agent.avatar as agentAvatar
       FROM Activity
       LEFT JOIN Agent ON Activity.agentId = Agent.id
       ORDER BY Activity.createdAt DESC
       LIMIT 50`
    )
    .all();
  return NextResponse.json(activities);
}
