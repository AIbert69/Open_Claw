import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { email: true, name: true } },
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>All Orders</h1>

      {orders.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ fontWeight: 600 }}>
                  #{order.id.slice(-8).toUpperCase()}
                </td>
                <td>{order.user.email}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items
                    .map((i) => `${i.product.name} ×${i.quantity}`)
                    .join(", ")}
                </td>
                <td style={{ fontWeight: 600 }}>{formatPrice(order.total)}</td>
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
