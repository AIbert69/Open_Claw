import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  if ((session.user as { role?: string })?.role !== "admin") redirect("/");

  return (
    <div className="admin-page">
      <div className="dashboard-nav">
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/subscribers">Subscribers</Link>
        <Link href="/dashboard/orders" style={{ marginLeft: "auto" }}>
          ← Back to Site
        </Link>
      </div>
      {children}
    </div>
  );
}
