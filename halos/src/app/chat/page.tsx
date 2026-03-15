"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  isOnline: boolean;
  description: string | null;
}

export default function ChatPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then(setAgents);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-2">Chat</h1>
      <p className="text-muted text-sm mb-6">
        Select an agent to start a conversation.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            href={`/chat/${agent.id}`}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium"
                style={{ backgroundColor: agent.color }}
              >
                {agent.avatar || agent.name[0].toUpperCase()}
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  agent.isOnline ? "bg-green-400" : "bg-gray-300"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm capitalize">
                  {agent.name}
                </span>
                <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                  {agent.role}
                </span>
              </div>
              {agent.description && (
                <p className="text-xs text-muted mt-0.5 truncate">
                  {agent.description}
                </p>
              )}
            </div>
            <MessageSquare size={18} className="text-muted shrink-0" />
          </Link>
        ))}
      </div>

      {agents.length === 0 && (
        <p className="text-center text-muted text-sm py-12">
          No agents yet. Create one from the sidebar.
        </p>
      )}
    </div>
  );
}
