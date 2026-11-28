"use server";

import { MenuItemType } from "@/types/CategoryType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getFeaturedMenuItems(): Promise<MenuItemType[]> {
    if (!API_URL) return [];

    const res = await fetch(`${API_URL}/api/menu-items`, {
        cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json().catch(() => ({}));
    const items: MenuItemType[] = Array.isArray(data?.items) ? data.items : [];

    return items.filter((item) => item.status === "approved").slice(0, 6);
}

export async function getApprovedMenuItems(params?: {
    search?: string;
    category?: string;
    location?: string;
    sort?: string;
}): Promise<MenuItemType[]> {
    if (!API_URL) return [];

    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set("search", params.search);
    if (params?.category) searchParams.set("category", params.category);
    if (params?.location) searchParams.set("location", params.location);
    if (params?.sort) searchParams.set("sort", params.sort);

    const queryString = searchParams.toString();
    const url = queryString
        ? `${API_URL}/api/menu-items?${queryString}`
        : `${API_URL}/api/menu-items`;

    const res = await fetch(url, {
        cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json().catch(() => ({}));
    const items: MenuItemType[] = Array.isArray(data?.items) ? data.items : [];

    return items.filter((item) => item.status === "approved");
}

// menu details page
export async function getMenuItemById(id: string): Promise<MenuItemType | null> {
    if (!API_URL || !id) return null;

    const res = await fetch(`${API_URL}/api/menu-items/${id}`, {
        cache: "no-store",
    });

    if (res.status === 404 || !res.ok) return null;

    const data = await res.json().catch(() => null);
    const item: MenuItemType | null = data?.item ?? data?.data ?? data ?? null;

    if (!item || !item._id) return null;
    if (item.status && item.status !== "approved") return null;

    return item;
}