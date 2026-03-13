import { prisma } from "@/lib/prisma";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Subscribers ({subscribers.length})</h1>

      {subscribers.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No subscribers yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.email}</td>
                <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
