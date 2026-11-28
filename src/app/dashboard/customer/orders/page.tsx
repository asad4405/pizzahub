import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    ShoppingBag,
    Calendar,
    MapPin,
    Store,
    FileText,
    Utensils,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCustomerOrders } from "@/lib/actions/customer/order";
import CancelOrderButton from "@/components/dashboard/customer/CancelOrderButton";

const statusStyles: Record<string, string> = {
    pending: "border-amber-200 bg-amber-50 text-amber-700",
    accepted: "border-blue-200 bg-blue-50 text-blue-700",
    preparing: "border-purple-200 bg-purple-50 text-purple-700",
    delivered: "border-emerald-200 bg-emerald-50 text-emerald-700",
    cancelled: "border-red-200 bg-red-50 text-red-700",
};

export default async function CustomerMyOrdersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as
        | { id?: string; email?: string; role?: string }
        | undefined;

    if (!user) {
        redirect("/");
    }

    const orders = await getCustomerOrders(user.id, user.email);

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-stone-900">
                        My Orders
                    </h1>
                    <p className="text-sm text-stone-600">
                        Track your placed pizza orders and delivery status.
                    </p>
                </div>

                <Button
                    className="rounded-xl bg-red-600 text-sm font-bold text-white hover:bg-red-700"
                    render={
                        <Link href="/menu" className="inline-flex items-center gap-2">
                            <Utensils className="h-4 w-4" />
                            Order More
                        </Link>
                    }
                />
            </div>

            {orders.length === 0 ? (
                <Card className="rounded-2xl border border-orange-200/80 bg-amber-50/40 shadow-none">
                    <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-red-600">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <h2 className="text-base font-bold text-stone-900">
                            No orders yet
                        </h2>
                        <p className="mt-1 max-w-sm text-xs text-stone-600">
                            You haven&apos;t placed any orders yet. Explore our fresh
                            pizzas and place your first order!
                        </p>
                        <Button
                            className="mt-4 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-700"
                            render={<Link href="/menu">Browse Menu</Link>}
                        />
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
                                            {order.vendorName && (
                                                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-stone-500">
                                                    <Store className="h-3.5 w-3.5 text-amber-600" />
                                                    {order.vendorName}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-right">
                                                <span className="block text-[11px] font-semibold text-stone-400 uppercase">
                                                    Total
                                                </span>
                                                <span className="text-lg font-extrabold text-red-600">
                                                    ৳{order.price}
                                                </span>
                                            </div>

                                            {status === "pending" && order._id && (
                                                <CancelOrderButton orderId={order._id} />
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