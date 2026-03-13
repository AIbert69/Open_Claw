"use client";

import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Account Settings</h1>

      <div className="settings-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-input"
            value={session?.user?.email || ""}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-input"
            defaultValue={session?.user?.name || ""}
            disabled
          />
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "8px" }}>
          Contact support to update your account details.
        </p>
      </div>
    </div>
  );
}
