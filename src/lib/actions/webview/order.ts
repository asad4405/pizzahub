"use server";

import { OrderType } from "@/types/OrderType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createOrderAction(orderData: OrderType) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Failed to place order. Please try again.",
        };
    }

    return {
        success: true,
        order: data.order ?? data.data ?? null,
        message: "Order placed successfully!",
    };
}