"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Plus, Trash2, Target } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: number;
  priority: string;
  createdAt: string;
}

interface Goal {
  id: string;
  title: string;
  completed: number;
  progress: number;
  createdAt: string;
}

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<"tasks" | "goals">("tasks");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/api/tasks").then((r) => r.json()).then(setTasks);
    fetch("/api/goals").then((r) => r.json()).then(setGoals);
  }, []);

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newItem.trim() }),
    });
    if (res.ok) {
      const task = await res.json();
      setTasks([...tasks, task]);
      setNewItem("");
    }
  }

  async function addGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newItem.trim() }),
    });
    if (res.ok) {
      const goal = await res.json();
      setGoals([...goals, goal]);
      setNewItem("");
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: completed ? 1 : 0 } : t)));
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
  }

  async function deleteTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  }

  async function updateGoalProgress(id: string, progress: number) {
    setGoals(goals.map((g) => (g.id === id ? { ...g, progress } : g)));
    await fetch(`/api/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress, completed: progress >= 100 }),
    });
  }

  async function deleteGoal(id: string) {
    setGoals(goals.filter((g) => g.id !== id));
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Tasks & Goals</h1>

      {/* Tab Toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        <button
          onClick={() => setActiveTab("tasks")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "tasks"
              ? "bg-foreground text-white shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          <CheckCircle2 size={16} />
          Tasks
        </button>
        <button
          onClick={() => setActiveTab("goals")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "goals"
              ? "bg-foreground text-white shadow-sm"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Target size={16} />
          Goals
        </button>
      </div>

      {/* Add Input */}
      <form onSubmit={activeTab === "tasks" ? addTask : addGoal} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={activeTab === "tasks" ? "Add a new task..." : "Add a new goal..."}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </form>

      {/* Tasks List */}
      {activeTab === "tasks" && (
        <div className="space-y-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <button
                onClick={() => toggleTask(task.id, !task.completed)}
                className="shrink-0 text-gray-300 hover:text-accent transition-colors"
              >
                {task.completed ? (
                  <CheckCircle2 size={20} className="text-accent" />
                ) : (
                  <Circle size={20} />
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? "line-through text-muted"
                    : "text-foreground"
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="text-center text-muted text-sm py-8">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      )}

      {/* Goals List */}
      {activeTab === "goals" && (
        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="group p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {goal.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">{goal.progress}%</span>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={goal.progress}
                onChange={(e) =>
                  updateGoalProgress(goal.id, parseInt(e.target.value))
                }
                className="w-full mt-2 accent-accent"
              />
            </div>
          ))}
          {goals.length === 0 && (
            <p className="text-center text-muted text-sm py-8">
              No goals yet. Add one above!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
