"use server";

import { revalidatePath } from "next/cache";
import { OrderType } from "@/types/OrderType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCustomerOrders(
    customerId?: string,
    customerEmail?: string
): Promise<OrderType[]> {
    if (!API_URL || (!customerId && !customerEmail)) {
        return [];
    }

    const params = new URLSearchParams();
    if (customerId) params.set("customerId", customerId);
    else if (customerEmail) params.set("customerEmail", customerEmail);

    const res = await fetch(`${API_URL}/api/orders?${params.toString()}`, {
        cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json().catch(() => null);
    return Array.isArray(data?.orders) ? data.orders : [];
}

export async function cancelOrderAction(orderId: string) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Could not cancel order.",
        };
    }

    revalidatePath("/dashboard/customer/my-orders");
    return {
        success: true,
        message: data.message || "Order cancelled successfully!",
    };
}