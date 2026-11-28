import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    ChefHat,
    Truck,
    XCircle,
    PackageCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ViewAllOrdersButton from "./ViewAllOrdersButton";

const getStatusBadgeClass = (status: string) => {
    const normalized = String(status || "pending").toLowerCase();
    if (normalized === "delivered" || normalized === "completed") {
        return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }
    if (normalized === "cancelled" || normalized === "rejected") {
        return "border-red-200 bg-red-50 text-red-700";
    }
    if (normalized === "confirmed" || normalized === "preparing") {
        return "border-amber-200 bg-amber-50 text-amber-800";
    }
    if (normalized === "out for delivery" || normalized === "shipped") {
        return "border-sky-200 bg-sky-50 text-sky-700";
    }
    return "border-orange-200 bg-orange-50 text-orange-800";
};

const getStatusIcon = (statusKey: string) => {
    switch (statusKey) {
        case "pending":
            return <Clock className="h-4 w-4 text-amber-600" />;
        case "confirmed":
        case "preparing":
            return <ChefHat className="h-4 w-4 text-orange-600" />;
        case "out for delivery":
        case "shipped":
            return <Truck className="h-4 w-4 text-sky-600" />;
        case "delivered":
        case "completed":
            return <CheckCircle2 className="h-4 w-4 text-emerald-600" />;
        case "cancelled":
        case "rejected":
            return <XCircle className="h-4 w-4 text-red-600" />;
        default:
            return <PackageCheck className="h-4 w-4 text-stone-600" />;
    }
};

const RoleDashboardOverview = ({
    title,
    subtitle,
    roleBadge,
    ordersHref,
    orders,
}: {
    title: string;
    subtitle: string;
    roleBadge: string;
    ordersHref: string;
    orders: Array<{
        _id?: string;
        id?: string;
        orderId?: string;
        status?: string;
        totalAmount?: number | string;
        total?: number | string;
        price?: number | string;
        customerName?: string;
        customerEmail?: string;
        vendorName?: string;
        businessName?: string;
        createdAt?: string;
        items?: Array<{ name?: string; title?: string; quantity?: number }>;
    }>;
}) => {
    const totalOrders = orders.length;

    const statusMap = orders.reduce(
        (acc: Record<string, number>, item) => {
            const key = String(item.status || "pending")
                .trim()
                .toLowerCase();
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        },
        {}
    );

    const statusEntries = Object.entries(statusMap);
    const recentFiveOrders = orders.slice(0, 5);

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-stone-900">
                        {title}
                    </h1>
                    <p className="text-sm text-stone-600">{subtitle}</p>
                </div>

                <Badge
                    variant="outline"
                    className="rounded-full border-orange-200 bg-amber-50 px-3 py-1 text-xs font-bold text-stone-800 uppercase"
                >
                    {roleBadge}
                </Badge>
            </div>

            {/* Total Order + Status Wise Order Count */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-orange-200/90 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-500 uppercase">
                            Total Orders
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <ShoppingBag className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="mt-3 text-3xl font-extrabold text-stone-900">
                        {totalOrders}
                    </p>
                </div>

                {statusEntries.map(([statusKey, count]) => (
                    <div
                        key={statusKey}
                        className="rounded-2xl border border-orange-200/90 bg-white p-5 shadow-xs"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-500 capitalize">
                                {statusKey}
                            </span>
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50">
                                {getStatusIcon(statusKey)}
                            </div>
                        </div>
                        <p className="mt-3 text-3xl font-extrabold text-stone-900">
                            {count}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Latest 5 Orders */}
            <div className="rounded-2xl border border-orange-200/90 bg-white p-6 shadow-xs">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-extrabold text-stone-900">
                            Recent Orders
                        </h2>
                        <p className="text-xs text-stone-500">
                            Latest 5 orders at a glance
                        </p>
                    </div>

                    <ViewAllOrdersButton href={ordersHref} />
                </div>

                {recentFiveOrders.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-orange-200 bg-amber-50/40 py-10 text-center text-sm text-stone-600">
                        No orders found yet.
                    </div>
                ) : (
                    <div className="divide-y divide-orange-100">
                        {recentFiveOrders.map((order, idx) => {
                            const idText =
                                order.orderId ||
                                order._id ||
                                order.id ||
                                `Order #${idx + 1}`;
                            const statusText = order.status || "pending";
                            const amountValue =
                                order.totalAmount ??
                                order.total ??
                                order.price ??
                                0;
                            const itemsCount = Array.isArray(order.items)
                                ? order.items.reduce(
                                      (sum, it) => sum + (it.quantity || 1),
                                      0
                                  )
                                : 0;

                            return (
                                <div
                                    key={String(order._id || order.id || idx)}
                                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                                >
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold text-stone-900">
                                            #{String(idText).slice(-8)}
                                        </p>
                                        <p className="text-xs text-stone-500">
                                            {order.customerName ||
                                                order.customerEmail ||
                                                order.businessName ||
                                                order.vendorName ||
                                                "Order Summary"}
                                            {itemsCount > 0
                                                ? ` • ${itemsCount} item(s)`
                                                : ""}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-extrabold text-stone-900">
                                            ৳{amountValue}
                                        </span>

                                        <Badge
                                            variant="outline"
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${getStatusBadgeClass(
                                                statusText
                                            )}`}
                                        >
                                            {statusText}
                                        </Badge>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleDashboardOverview;