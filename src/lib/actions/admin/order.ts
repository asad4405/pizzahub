"use server";

import { revalidatePath } from "next/cache";
import { OrderType } from "@/types/OrderType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllOrders(): Promise<OrderType[]> {
    if (!API_URL) {
        return [];
    }

    const res = await fetch(`${API_URL}/api/orders`, {
        cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json().catch(() => null);
    return Array.isArray(data?.orders) ? data.orders : [];
}

export async function updateAdminOrderStatusAction(
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

    revalidatePath("/dashboard/admin/orders");
    return {
        success: true,
        message: data.message || "Order status updated!",
    };
}

export async function deleteOrderAction(orderId: string) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "DELETE",
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Failed to delete order.",
        };
    }

    revalidatePath("/dashboard/admin/orders");
    return {
        success: true,
        message: data.message || "Order deleted successfully!",
    };
}