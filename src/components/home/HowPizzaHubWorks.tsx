import { Search, ShoppingBag, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
    {
        step: "01",
        title: "Discover & Filter Menus",
        description:
            "Search by pizza name, filter by category or neighborhood, and compare local pizzerias.",
        icon: Search,
    },
    {
        step: "02",
        title: "Schedule Your Order",
        description:
            "Choose your preferred delivery date, enter your address, and add special kitchen notes.",
        icon: ShoppingBag,
    },
    {
        step: "03",
        title: "Freshly Baked & Delivered",
        description:
            "Once the restaurant accepts your order, your pizza is baked fresh and sent to your door.",
        icon: Truck,
    },
];

const HowPizzaHubWorks = () => {
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-red-600">
                        Simple &amp; Fast
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                        How PizzaHub Works
                    </h2>
                    <p className="mt-3 text-base text-stone-600">
                        From craving to your doorstep in three effortless steps.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {steps.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card
                                key={item.step}
                                className="relative h-full border-orange-100 bg-amber-50/40 shadow-sm"
                            >
                                <CardContent className="flex h-full flex-col p-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-4xl font-black text-orange-200">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-stone-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowPizzaHubWorks;