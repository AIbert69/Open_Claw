"use client";

import { useState, useEffect } from "react";
import {
  UserPlus,
  CheckCircle2,
  MessageSquare,
  BookOpen,
  ListTodo,
  Activity,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  agentId: string | null;
  agentName: string | null;
  agentColor: string | null;
  agentAvatar: string | null;
  createdAt: string;
}

const typeIcons: Record<string, typeof Activity> = {
  agent_created: UserPlus,
  task_completed: CheckCircle2,
  task_created: ListTodo,
  agent_message: MessageSquare,
  knowledge_added: BookOpen,
};

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetch("/api/activity")
      .then((r) => r.json())
      .then(setActivities);
  }, []);

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Activity</h1>

      <div className="space-y-1">
        {activities.map((activity) => {
          const Icon = typeIcons[activity.type] || Activity;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 px-4 py-3 bg-white rounded-lg border border-gray-100"
            >
              <div className="mt-0.5 p-1.5 rounded-lg bg-gray-100">
                <Icon size={16} className="text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  {activity.agentName && (
                    <span className="flex items-center gap-1 text-xs text-muted">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-medium"
                        style={{
                          backgroundColor: activity.agentColor || "#6366f1",
                        }}
                      >
                        {activity.agentAvatar || activity.agentName[0].toUpperCase()}
                      </div>
                      {activity.agentName}
                    </span>
                  )}
                  <span className="text-xs text-muted">
                    {formatTime(activity.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {activities.length === 0 && (
          <p className="text-center text-muted text-sm py-12">
            No activity yet.
          </p>
        )}
      </div>
    </div>
  );
}
