import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = (session!.user as { id: string }).id;
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order || order.userId !== userId) notFound();

  return (
    <div>
      <Link
        href="/dashboard/orders"
        style={{ color: "var(--accent)", fontSize: "0.85rem", marginBottom: "16px", display: "inline-block" }}
      >
        ← Back to orders
      </Link>
      <h1>Order #{order.id.slice(-8).toUpperCase()}</h1>

      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        <span className={`status-badge status-badge--${order.status}`}>
          {order.status}
        </span>
        <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
          {new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div
        style={{
          background: "var(--white)",
          borderRadius: "var(--radius)",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {order.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <p style={{ fontWeight: 600 }}>{item.product.name}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                Qty: {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <p style={{ fontWeight: 600 }}>
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "16px",
            fontSize: "1.1rem",
            fontWeight: 700,
          }}
        >
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
