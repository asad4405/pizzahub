import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import RoleDashboardOverview from "@/components/shared/dashboard/RoleDashboardOverview";

async function getVendorOrders(email?: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || !email) return [];

    const res = await fetch(
        `${apiUrl}/api/orders?vendorEmail=${encodeURIComponent(email)}`,
        { cache: "no-store" }
    );

    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.orders)) return data.orders;
    return [];
}

export default async function VendorDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as
        | { email?: string; role?: string }
        | undefined;

    if (!user) {
        redirect("/");
    }

    if (user.role !== "vendor") {
        redirect(`/dashboard/${user.role || "customer"}`);
    }

    const orders = await getVendorOrders(user.email);

    return (
        <RoleDashboardOverview
            title="Vendor Overview"
            subtitle="Monitor your kitchen order counts by status and recent 5 orders."
            roleBadge={user.role}
            ordersHref="/dashboard/vendor/orders"
            orders={orders}
        />
    );
}