"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function updateCustomerProfileAction(payload: {
    userId?: string;
    email?: string;
    name: string;
    phone?: string;
    address?: string;
    image?: string;
}) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/customer/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Failed to update profile.",
        };
    }

    revalidatePath("/profile/customer");
    return {
        success: true,
        message: data.message || "Profile updated successfully!",
    };
}