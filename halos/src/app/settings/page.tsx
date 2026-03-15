"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-sm mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="User"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="user@halos.ai"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-sm mb-4">Integrations</h2>
          <div className="space-y-3">
            {["Telegram", "Slack", "Email", "Calendar"].map((service) => (
              <div
                key={service}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm">{service}</span>
                <button className="px-3 py-1 text-xs font-medium border border-gray-200 rounded-lg text-muted hover:text-foreground hover:border-gray-300 transition-colors">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-sm mb-4">Notifications</h2>
          <div className="space-y-3">
            {[
              "Agent messages",
              "Task completions",
              "Knowledge updates",
              "Daily summary",
            ].map((pref) => (
              <div key={pref} className="flex items-center justify-between py-1">
                <span className="text-sm">{pref}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-accent after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors">
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
}
