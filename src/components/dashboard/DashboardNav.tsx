import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    Users,
    Pizza,
    type LucideIcon,
} from "lucide-react";

export type DashboardRole = "admin" | "vendor" | "customer";

export type DashboardNavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export const normalizeDashboardRole = (rawRole?: string): DashboardRole => {
    const normalized = rawRole?.toLowerCase();
    if (normalized === "admin" || normalized === "vendor") {
        return normalized;
    }
    return "customer";
};

export const getDashboardNavItems = (role: DashboardRole): DashboardNavItem[] => {
    if (role === "admin") {
        return [
            { label: "Overview", href: "/dashboard/admin/overview", icon: LayoutDashboard },
            { label: "Users", href: "/dashboard/admin", icon: Users },
            { label: "Vendors", href: "/dashboard/vendor", icon: UtensilsCrossed },
            { label: "Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
        ];
    }

    if (role === "vendor") {
        return [
            { label: "Overview", href: "/dashboard/vendor/overview", icon: LayoutDashboard },
            { label: "Menu", href: "/dashboard/vendor", icon: UtensilsCrossed },
            { label: "Orders", href: "/dashboard/vendor/orders", icon: ShoppingBag },
        ];
    }

    return [
        { label: "Overview", href: "/dashboard/customer/overview", icon: LayoutDashboard },
        { label: "Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
        { label: "Browse Menu", href: "/browse-menu", icon: Pizza },
    ];
};