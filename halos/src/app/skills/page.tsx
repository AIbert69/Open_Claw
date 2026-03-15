"use client";

import { Zap, Plus } from "lucide-react";

const defaultSkills = [
  {
    name: "Email Drafting",
    description: "Compose professional emails based on context and tone preferences",
    agents: ["craig", "networker"],
    active: true,
  },
  {
    name: "Fitness Planning",
    description: "Create personalized workout and nutrition plans",
    agents: ["trainer"],
    active: true,
  },
  {
    name: "Journal Analysis",
    description: "Analyze journal entries for patterns and insights",
    agents: ["journal"],
    active: true,
  },
  {
    name: "Contact Research",
    description: "Research and enrich contact information from public sources",
    agents: ["networker"],
    active: true,
  },
  {
    name: "Task Prioritization",
    description: "Automatically prioritize tasks based on urgency and impact",
    agents: ["craig"],
    active: false,
  },
  {
    name: "Meeting Notes",
    description: "Summarize meetings and extract action items",
    agents: ["craig", "journal"],
    active: false,
  },
];

export default function SkillsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      <div className="space-y-3">
        {defaultSkills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100"
          >
            <div
              className={`p-2 rounded-lg ${
                skill.active ? "bg-accent-light" : "bg-gray-100"
              }`}
            >
              <Zap
                size={18}
                className={skill.active ? "text-accent" : "text-muted"}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{skill.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    skill.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-muted"
                  }`}
                >
                  {skill.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs text-muted mt-1">{skill.description}</p>
              <div className="flex gap-1 mt-2">
                {skill.agents.map((agent) => (
                  <span
                    key={agent}
                    className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full"
                  >
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
