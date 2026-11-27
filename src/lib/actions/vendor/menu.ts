"use server";

import { MenuItemType } from "@/types/CategoryType";
import { revalidatePath } from "next/cache";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getMyMenuItems(vendorId: string) {
    if (!vendorId) {
        return { items: [] as MenuItemType[], isPremium: false };
    }

    const res = await fetch(`${API_URL}/api/menu-items/vendor/${vendorId}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return { items: [] as MenuItemType[], isPremium: false };
    }

    const data = await res.json();
    return {
        items: (data.items || []) as MenuItemType[],
        isPremium: Boolean(data.isPremium),
    };
}

export async function createMenuItemAction(formData: FormData) {
    const vendorId = String(formData.get("vendorId") || "");
    if (!vendorId) {
        return { error: "Vendor not found." };
    }

    const image = String(formData.get("imageUrl") || "").trim();

    const payload = {
        vendorId,
        itemName: String(formData.get("itemName") || "").trim(),
        category: String(formData.get("category") || "Classic").trim(),
        description: String(formData.get("description") || "").trim(),
        price: Number(formData.get("price") || 0),
        location: String(formData.get("location") || "").trim(),
        image,
    };

    const res = await fetch(`${API_URL}/api/menu-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
        return { error: data.message || "Failed to add menu item." };
    }

    revalidatePath("/dashboard/vendor/menu");
    revalidatePath("/dashboard/vendor/add-menu");

    return {
        success: true,
        message: data.message || "Menu item added successfully!",
        redirectTo: "/dashboard/vendor/menu",
    };
}