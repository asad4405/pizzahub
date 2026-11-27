"use server";

import { revalidatePath } from "next/cache";
import { MenuItemType } from "@/types/CategoryType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllMenuItemsForAdmin(status = "all") {
    const query = status && status !== "all" ? `?status=${encodeURIComponent(status)}` : "";
    const res = await fetch(`${API_URL}/api/admin/menu-items${query}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [] as MenuItemType[];
    }

    const data = await res.json().catch(() => ({}));
    return (data.items || []) as MenuItemType[];
}

export async function updateAdminMenuStatusAction(formData: FormData) {
    const id = String(formData.get("id") || "");
    const status = String(formData.get("status") || "");

    if (!id || !["approved", "rejected"].includes(status)) {
        return { error: "Invalid menu item or status." };
    }

    const res = await fetch(`${API_URL}/api/admin/menu-items/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.success === false) {
        return { error: data.message || "Failed to update menu status." };
    }

    revalidatePath("/dashboard/admin/menu");
    revalidatePath("/dashboard/vendor/menu");

    return {
        success: true,
        message: data.message || `Menu item marked as ${status}!`,
    };
}

export async function deleteAdminMenuItemAction(formData: FormData) {
    const id = String(formData.get("id") || "");

    if (!id) {
        return { error: "Invalid menu item." };
    }

    const res = await fetch(`${API_URL}/api/admin/menu-items/${id}`, {
        method: "DELETE",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.success === false) {
        return { error: data.message || "Failed to delete menu item." };
    }

    revalidatePath("/dashboard/admin/menu");
    revalidatePath("/dashboard/vendor/menu");

    return {
        success: true,
        message: data.message || "Menu item deleted successfully!",
    };
}