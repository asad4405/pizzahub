import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    ShoppingBag,
    Calendar,
    MapPin,
    User,
    Store,
    FileText,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllOrders } from "@/lib/actions/admin/order";
import AdminOrderActions from "@/components/dashboard/admin/AdminOrderActions";

const statusStyles: Record<string, string> = {
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    accepted: "border-blue-200 bg-blue-50 text-blue-700",
    preparing: "border-purple-200 bg-purple-50 text-purple-700",
    delivered: "border-emerald-200 bg-emerald-50 text-emerald-700",
    cancelled: "border-red-200 bg-red-50 text-red-700",
};

export default async function AdminOrdersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as
        | { id?: string; email?: string; role?: string }
        | undefined;

    if (!user) {
        redirect("/");
    }

    if (user.role !== "admin") {
        redirect("/dashboard");
    }

    const orders = await getAllOrders();

    return (
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-stone-900">
                        All Orders
                    </h1>
                    <p className="text-sm text-stone-600">
                        Monitor and manage all orders across customers and vendors.
                    </p>
                </div>
                <Badge
                    variant="outline"
                    className="rounded-full border-orange-200 bg-amber-50 px-3 py-1 text-xs font-bold text-stone-800"
                >
                    Total Orders: {orders.length}
                </Badge>
            </div>

            {orders.length === 0 ? (
                <Card className="rounded-2xl border border-orange-200/80 bg-amber-50/40 shadow-none">
                    <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-red-600">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <h2 className="text-base font-bold text-stone-900">
                            No orders found
                        </h2>
                        <p className="mt-1 max-w-sm text-xs text-stone-600">
                            Orders placed by customers will appear here.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const status = order.status || "pending";
                        const badgeClass =
                            statusStyles[status] ||
                            "border-stone-200 bg-stone-50 text-stone-700";

                        return (
                            <Card
                                key={order._id}
                                className="rounded-2xl border border-orange-200/80 bg-white shadow-xs"
                            >
                                <CardContent className="p-5">
                                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-orange-100 pb-4">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <h2 className="text-lg font-extrabold text-stone-900">
                                                    {order.itemName}
                                                </h2>
                                                <Badge
                                                    variant="outline"
                                                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${badgeClass}`}
                                                >
                                                    {status}
                                                </Badge>
                                            </div>

                                            <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-stone-600">
                                                {(order.customerName || order.customerEmail) && (
                                                    <span className="inline-flex items-center gap-1 font-medium">
                                                        <User className="h-3.5 w-3.5 text-amber-600" />
                                                        Customer:{" "}
                                                        {order.customerName || order.customerEmail}
                                                    </span>
                                                )}
                                                {order.vendorName && (
                                                    <span className="inline-flex items-center gap-1 font-medium">
                                                        <Store className="h-3.5 w-3.5 text-red-600" />
                                                        Vendor: {order.vendorName}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="text-right">
                                                <span className="block text-[11px] font-semibold text-stone-400 uppercase">
                                                    Total
                                                </span>
                                                <span className="text-lg font-extrabold text-red-600">
                                                    ৳{order.price}
                                                </span>
                                            </div>

                                            {order._id && (
                                                <AdminOrderActions
                                                    orderId={order._id}
                                                    currentStatus={status}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3 text-xs text-stone-700 sm:grid-cols-2 lg:grid-cols-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 shrink-0 text-red-600" />
                                            <span>
                                                <strong className="text-stone-900">
                                                    Delivery:
                                                </strong>{" "}
                                                {order.deliveryDate}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 shrink-0 text-red-600" />
                                            <span className="truncate">
                                                <strong className="text-stone-900">
                                                    Address:
                                                </strong>{" "}
                                                {order.deliveryAddress}
                                            </span>
                                        </div>

                                        {order.note && (
                                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
                                                <FileText className="h-4 w-4 shrink-0 text-red-600" />
                                                <span className="truncate">
                                                    <strong className="text-stone-900">
                                                        Note:
                                                    </strong>{" "}
                                                    {order.note}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}