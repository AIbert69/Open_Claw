"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Hash,
  ListTodo,
  BookOpen,
  Zap,
  Settings,
  Plus,
} from "lucide-react";
import { AddAgentModal } from "@/components/agents/AddAgentModal";

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
  isOnline: boolean;
}

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/activity", label: "Activity", icon: Hash },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/skills", label: "Skills", icon: Zap },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(19);

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    const res = await fetch("/api/agents");
    if (res.ok) {
      const data = await res.json();
      setAgents(data);
    }
  }

  async function handleAgentCreated() {
    await fetchAgents();
    setShowAddModal(false);
  }

  return (
    <>
      <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">H</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Halos</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-light text-accent"
                    : "text-muted hover:bg-gray-100 hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === "Chat" && unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Agents Section */}
        <div className="mt-6 px-3 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Agents
            </span>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-muted hover:text-foreground transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-0.5">
            {agents.map((agent) => (
              <Link
                key={agent.id}
                href={`/chat/${agent.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === `/chat/${agent.id}`
                    ? "bg-accent-light text-accent"
                    : "text-foreground hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.avatar || agent.name[0].toUpperCase()}
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      agent.isOnline ? "bg-green-400" : "bg-gray-300"
                    }`}
                  />
                </div>
                <span className="font-medium">{agent.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {showAddModal && (
        <AddAgentModal
          onClose={() => setShowAddModal(false)}
          onCreated={handleAgentCreated}
        />
      )}
    </>
  );
}
