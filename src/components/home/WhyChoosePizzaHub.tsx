import { Flame, Clock, Store, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        title: "Oven-Hot Express Delivery",
        description:
            "Insulated delivery bags ensure every slice arrives steaming hot with melted cheese intact.",
        icon: Clock,
    },
    {
        title: "100% Fresh Ingredients",
        description:
            "Partner kitchens use hand-stretched dough, vine-ripened tomato sauce, and real mozzarella.",
        icon: Flame,
    },
    {
        title: "Verified Local Pizzerias",
        description:
            "Every restaurant and menu item is reviewed and approved by our team for quality assurance.",
        icon: Store,
    },
    {
        title: "Transparent Order Tracking",
        description:
            "Schedule your delivery date, add custom instructions, and track status updates in real time.",
        icon: ShieldCheck,
    },
];

const WhyChoosePizzaHub = () => {
    return (
        <section className="bg-amber-50 py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-wider text-red-600">
                        The PizzaHub Promise
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                        Why Choose PizzaHub?
                    </h2>
                    <p className="mt-3 text-base text-stone-600">
                        We connect pizza lovers directly with top neighborhood pizzerias
                        for a seamless, reliable ordering experience.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={feature.title}
                                className="h-full border-orange-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
                            >
                                <CardContent className="flex h-full flex-col p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-red-600">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-stone-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-stone-600">
                                        {feature.description}
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

export default WhyChoosePizzaHub;