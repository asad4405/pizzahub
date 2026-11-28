import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RoleDashboardOverview from "@/components/shared/dashboard/RoleDashboardOverview";

async function getAllOrders() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];

    const res = await fetch(`${apiUrl}/api/orders`, {
        cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.orders)) return data.orders;
    return [];
}

export default async function AdminDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as
        | { role?: string }
        | undefined;

    if (!user) {
        redirect("/");
    }

    if (user.role !== "admin") {
        redirect(`/dashboard/${user.role || "customer"}`);
    }

    const orders = await getAllOrders();

    return (
        <RoleDashboardOverview
            title="Admin Overview"
            subtitle="Platform-wide total orders, status breakdown, and latest 5 orders."
            roleBadge={user.role}
            ordersHref="/dashboard/admin/orders"
            orders={orders}
        />
    );
}