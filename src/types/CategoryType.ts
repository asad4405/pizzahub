export type CategoryType =
    | "Classic Pizzas"
    | "Vegetarian Pizzas"
    | "Meat Lovers"
    | "Specialty / Gourmet Pizzas"
    | "Sides & Appetizers"
    | "Beverages & Desserts";

export const PIZZA_CATEGORIES: CategoryType[] = [
    "Classic Pizzas",
    "Vegetarian Pizzas",
    "Meat Lovers",
    "Specialty / Gourmet Pizzas",
    "Sides & Appetizers",
    "Beverages & Desserts",
];

export type MenuItemStatus = "pending" | "approved" | "rejected" | "inactive";

export type MenuItemType = {
    _id: string;
    vendorId: string;
    vendorName?: string;
    businessName?: string;
    itemName: string;
    category: CategoryType;
    description: string;
    price: number;
    location: string;
    image: string;
    images?: string[];
    status: MenuItemStatus;
    isFeatured?: boolean;
    createdAt?: string;
};