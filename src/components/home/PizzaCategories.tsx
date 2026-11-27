import Link from "next/link";
import {
    Pizza,
    Leaf,
    Beef,
    Sparkles,
    UtensilsCrossed,
    CupSoda,
    ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
    {
        name: "Classic Pizzas",
        description: "Timeless Margherita, Pepperoni, and cheesy favorites.",
        icon: Pizza,
        href: "/menu?category=Classic+Pizzas",
    },
    {
        name: "Vegetarian Pizzas",
        description: "Loaded with farm-fresh veggies, olives, and herbs.",
        icon: Leaf,
        href: "/menu?category=Vegetarian+Pizzas",
    },
    {
        name: "Meat Lovers",
        description: "Hearty toppings of beef, chicken, sausage, and pepperoni.",
        icon: Beef,
        href: "/menu?category=Meat+Lovers",
    },
    {
        name: "Specialty / Gourmet Pizzas",
        description: "Chef-crafted signature recipes with artisanal cheeses.",
        icon: Sparkles,
        href: "/menu?category=Specialty+%2F+Gourmet+Pizzas",
    },
    {
        name: "Sides & Appetizers",
        description: "Garlic knots, spicy wings, and cheesy breadsticks.",
        icon: UtensilsCrossed,
        href: "/menu?category=Sides+%26+Appetizers",
    },
    {
        name: "Beverages & Desserts",
        description: "Chilled drinks, shakes, and warm chocolate lava cakes.",
        icon: CupSoda,
        href: "/menu?category=Beverages+%26+Desserts",
    },
];

const PizzaCategories = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-red-600">
                        Explore Cravings
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                        Browse by Pizza Categories
                    </h2>
                    <p className="mt-3 text-base text-stone-600">
                        Pick your favorite style from classic hand-tossed slices to rich
                        gourmet creations and sides.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link key={category.name} href={category.href} className="group block h-full">
                                <Card className="h-full border-orange-100 bg-amber-50/50 transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-md">
                                    <CardContent className="flex h-full flex-col justify-between p-6">
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <ArrowUpRight className="h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red-600" />
                                            </div>
                                            <h3 className="mt-5 text-lg font-bold text-stone-900 group-hover:text-red-600">
                                                {category.name}
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-stone-600">
                                                {category.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PizzaCategories;