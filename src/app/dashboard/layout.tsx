import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/dashboard/orders");

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Link href="/dashboard/orders">Orders</Link>
        <Link href="/dashboard/settings">Settings</Link>
        {(session.user as { role?: string })?.role === "admin" && (
          <Link href="/admin/products">Admin</Link>
        )}
      </div>
      {children}
    </div>
  );
}
