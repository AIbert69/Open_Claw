"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, totalPrice } =
    useCart();
  const { data: session } = useSession();
  const router = useRouter();

  if (!isOpen) return null;

  async function handleCheckout() {
    if (!session) {
      toggleCart();
      router.push("/login?callbackUrl=/cart");
      return;
    }

    try {
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
    } catch (err) {
      console.error("Checkout error:", err);
    }
  }

  return (
    <>
      <div
        className="cart-overlay"
        onClick={toggleCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 200,
        }}
      />
      <div
        className="cart-drawer"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "380px",
          maxWidth: "90vw",
          height: "100vh",
          background: "var(--white)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Your Cart</h3>
          <button
            onClick={toggleCart}
            style={{
              fontSize: "1.5rem",
              color: "var(--muted)",
              cursor: "pointer",
              background: "none",
              border: "none",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center", marginTop: "40px" }}>
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "70px",
                    background: "linear-gradient(180deg, #1a3348, #0d2235)",
                    borderRadius: "4px",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                    {item.product.name}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    {item.product.dosage}
                  </p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, marginTop: "4px" }}>
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    style={{
                      width: "26px",
                      height: "26px",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      background: "none",
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    style={{
                      width: "26px",
                      height: "26px",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      background: "none",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      marginLeft: "8px",
                      background: "none",
                      border: "none",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
                fontWeight: 700,
              }}
            >
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleCheckout}
            >
              Checkout <span className="btn__arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
