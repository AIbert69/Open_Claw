"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCheckout() {
    if (!session) {
      router.push("/login?callbackUrl=/cart");
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
      }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="shop-page">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
            Your cart is empty
          </p>
          <Link href="/shop" className="btn btn-primary">
            Browse Products <span className="btn__arrow">→</span>
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "40px", marginTop: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: 2, minWidth: "300px" }}>
            {items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex",
                  gap: "20px",
                  padding: "20px",
                  background: "var(--white)",
                  borderRadius: "var(--radius)",
                  marginBottom: "12px",
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "80px",
                    background: "linear-gradient(180deg, #1a3348, #0d2235)",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Link
                    href={`/products/${item.product.slug}`}
                    style={{ fontWeight: 600, fontSize: "0.95rem" }}
                  >
                    {item.product.name}
                  </Link>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    {item.product.dosage}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="filter-btn"
                    style={{ padding: "4px 10px" }}
                  >
                    −
                  </button>
                  <span style={{ fontWeight: 600, minWidth: "24px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="filter-btn"
                    style={{ padding: "4px 10px" }}
                  >
                    +
                  </button>
                </div>
                <p style={{ fontWeight: 700, minWidth: "70px", textAlign: "right" }}>
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeItem(item.product.id)}
                  style={{
                    color: "var(--muted)",
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              minWidth: "280px",
              background: "var(--white)",
              borderRadius: "var(--radius)",
              padding: "28px",
              height: "fit-content",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>Order Summary</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ color: "var(--muted)" }}>
                Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <span style={{ fontWeight: 600 }}>{formatPrice(totalPrice)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ color: "var(--muted)" }}>Shipping</span>
              <span style={{ fontWeight: 600 }}>Free</span>
            </div>
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "16px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {session ? "Proceed to Checkout" : "Sign in to Checkout"}{" "}
              <span className="btn__arrow">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
