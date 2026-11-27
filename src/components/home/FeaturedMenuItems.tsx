import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/shared/MenuCard";
import { getFeaturedMenuItems } from "@/lib/actions/webview/menu";
import { MenuItemType } from "@/types/CategoryType";

interface FeaturedMenuItemsProps {
    items?: MenuItemType[];
}

const FeaturedMenuItems = async ({ items }: FeaturedMenuItemsProps) => {
    const resolvedItems = items ?? (await getFeaturedMenuItems());
    const featuredItems = resolvedItems
        .filter((item) => item.status === "approved")
        .slice(0, 6);

    return (
        <section className="mx-auto max-w-7xl px-4 py-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold tracking-wider text-red-600 uppercase">
                        Fresh From The Oven
                    </p>
                    <h2 className="text-2xl font-extrabold text-stone-900 md:text-3xl">
                        Featured Menu Items
                    </h2>
                </div>

                <Button
                    variant="outline"
                    className="rounded-xl border-orange-200 bg-white font-semibold text-stone-800 hover:bg-orange-50 hover:text-red-600"
                    render={
                        <Link href="/menu" className="inline-flex items-center gap-1.5">
                            Explore All
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    }
                />
            </div>

            {featuredItems.length === 0 ? (
                <div className="rounded-2xl border border-orange-200/80 bg-amber-50/50 p-10 text-center">
                    <p className="text-sm font-medium text-stone-600">
                        No approved menu items available right now.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredItems.map((item) => (
                        <MenuCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default FeaturedMenuItems;