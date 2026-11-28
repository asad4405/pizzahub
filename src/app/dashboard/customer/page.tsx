import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RoleDashboardOverview from "@/components/shared/dashboard/RoleDashboardOverview";

async function getCustomerOrders(email?: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || !email) return [];

    const res = await fetch(
        `${apiUrl}/api/orders?email=${encodeURIComponent(email)}`,
        { cache: "no-store" }
    );

    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.orders)) return data.orders;
    return [];
}

export default async function CustomerDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as
        | { email?: string; role?: string }
        | undefined;

    if (!user) {
        redirect("/");
    }

    if (user.role && user.role !== "customer") {
        redirect(`/dashboard/${user.role}`);
    }

    const orders = await getCustomerOrders(user.email);

    return (
        <RoleDashboardOverview
            title="Customer Overview"
            subtitle="Track your total orders, status summary, and latest 5 orders."
            roleBadge={user.role || "customer"}
            ordersHref="/dashboard/customer/orders"
            orders={orders}
        />
    );
}