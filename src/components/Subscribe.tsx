"use client";

import { useState, FormEvent } from "react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="subscribe">
      <div className="subscribe__img">
        <div className="subscribe__img-placeholder"></div>
      </div>
      <div className="subscribe__content">
        <h2>
          Subscribe for 10%
          <br />
          discount
        </h2>
      </div>
      <div className="subscribe__form-wrap">
        <p>
          Get weekly updates about our products on your email, no spam
          guaranteed our promise.
        </p>
        {status === "success" ? (
          <p style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.85rem" }}>
            {message}
          </p>
        ) : (
          <form className="subscribe__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="subscribe__input"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="subscribe__submit"
              aria-label="Subscribe"
              disabled={status === "loading"}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        )}
        {status === "error" && (
          <p style={{ color: "#e74c3c", fontSize: "0.8rem", marginTop: "8px" }}>
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
