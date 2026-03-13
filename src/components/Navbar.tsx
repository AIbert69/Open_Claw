"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { toggleCart, totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">
        <svg
          className="navbar__logo-icon"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon
            points="18,2 34,10 34,26 18,34 2,26 2,10"
            stroke="#00c9a7"
            strokeWidth="2"
            fill="none"
          />
          <polygon
            points="18,8 28,13 28,23 18,28 8,23 8,13"
            stroke="#00c9a7"
            strokeWidth="1.5"
            fill="rgba(0,201,167,0.12)"
          />
          <circle cx="18" cy="18" r="3" fill="#00c9a7" />
        </svg>
        <span className="navbar__logo-text">peplogix</span>
      </Link>

      <ul className="navbar__links">
        <li>
          <Link href="/" className="navbar__link navbar__link--active">
            Home
          </Link>
        </li>
        <li className="navbar__dropdown">
          <Link href="/shop" className="navbar__link">
            Shop <span className="navbar__caret">▾</span>
          </Link>
        </li>
        <li>
          <Link href="/#testing" className="navbar__link">
            Testing
          </Link>
        </li>
        <li>
          <Link href="/#faq" className="navbar__link">
            FAQ
          </Link>
        </li>
        <li>
          <Link href="/#contact" className="navbar__link">
            Contact
          </Link>
        </li>
      </ul>

      <div className="navbar__actions">
        {session ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/dashboard/orders" className="navbar__icon-btn" aria-label="Account">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </Link>
            <button
              onClick={() => signOut()}
              className="navbar__icon-btn"
              aria-label="Sign out"
              title="Sign out"
              style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}
            >
              ✕
            </button>
          </div>
        ) : (
          <Link href="/login" className="navbar__icon-btn" aria-label="Account">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </Link>
        )}
        <button
          className="navbar__icon-btn"
          aria-label="Cart"
          onClick={toggleCart}
          style={{ position: "relative" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </nav>
  );
}
