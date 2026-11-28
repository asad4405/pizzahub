import {
    LayoutDashboard,
    ShoppingBag,
    UtensilsCrossed,
    Users,
    Pizza,
    Store,
    CreditCard,
    Crown,
    ClipboardList,
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
            { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
            { label: "Users", href: "/dashboard/admin/users", icon: Users },
            { label: "Menu Items", href: "/dashboard/admin/menu", icon: UtensilsCrossed },
            { label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
        ];
    }

    if (role === "vendor") {
        return [
            { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
            { label: "Restaurant", href: "/dashboard/vendor/restaurant", icon: Store },
            { label: "Menu", href: "/dashboard/vendor/menu", icon: UtensilsCrossed },
            { label: "Orders", href: "/dashboard/vendor/orders", icon: ClipboardList },
            { label: "Subscription", href: "/dashboard/vendor/subscription", icon: Crown },
        ];
    }

    return [
        { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
        { label: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
        { label: "Browse Menu", href: "/menu", icon: Pizza },
    ];
};