"use server";

import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function toggleBlockUserAction(userId: string, isBlocked: boolean) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/users/${encodeURIComponent(userId)}/block`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBlocked }),
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Failed to update block status.",
        };
    }

    revalidatePath("/dashboard/admin/users");
    return {
        success: true,
        message: data.message || "User status updated.",
    };
}

export async function deleteUserAction(userId: string) {
    if (!API_URL) {
        return { success: false, message: "API URL is not configured." };
    }

    const res = await fetch(`${API_URL}/api/users/${encodeURIComponent(userId)}`, {
        method: "DELETE",
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
        return {
            success: false,
            message: data?.message || "Failed to delete user.",
        };
    }

    revalidatePath("/dashboard/admin/users");
    return {
        success: true,
        message: data.message || "User deleted.",
    };
}