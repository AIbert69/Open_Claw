import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();
  const userId = (session!.user as { id: string }).id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
            No orders yet
          </p>
          <Link href="/shop" className="btn btn-primary">
            Start Shopping <span className="btn__arrow">→</span>
          </Link>
        </div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    style={{ color: "var(--accent)", fontWeight: 600 }}
                  >
                    #{order.id.slice(-8).toUpperCase()}
                  </Link>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items.map((i) => i.product.name).join(", ")}
                </td>
                <td style={{ fontWeight: 600 }}>
                  {formatPrice(order.total)}
                </td>
                <td>
                  <span className={`status-badge status-badge--${order.status}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
