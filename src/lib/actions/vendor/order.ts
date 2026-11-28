"use server";

import { revalidatePath } from "next/cache";
import { OrderType } from "@/types/OrderType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getVendorOrders(vendorId?: string): Promise<OrderType[]> {
    if (!API_URL || !vendorId) {
        return [];
    }

    const params = new URLSearchParams({ vendorId });

    const res = await fetch(`${API_URL}/api/orders?${params.toString()}`, {
        cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json().catch(() => null);
    const list = Array.isArray(data?.orders) ? data.orders : [];

    return list.filter((order: OrderType) => order.vendorId === vendorId);
}

export async function updateOrderStatusAction(
    orderId: string,
    status: "pending" | "accepted" | "preparing" | "delivered" | "cancelled"
) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Failed to update order status.",
        };
    }

    revalidatePath("/dashboard/vendor/orders");
    return {
        success: true,
        message: data.message || "Order status updated!",
    };
}