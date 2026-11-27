import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/shared/MenuCard";
import MenuFilters from "@/components/menu/MenuFilters";
import { getApprovedMenuItems } from "@/lib/actions/webview/menu";

interface MenuPageProps {
    searchParams: Promise<{
        search?: string;
        category?: string;
        location?: string;
        sort?: string;
    }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
    const resolvedParams = await searchParams;

    const search = resolvedParams.search || "";
    const category = resolvedParams.category || "all";
    const location = resolvedParams.location || "all";
    const sort = resolvedParams.sort || "default";

    const [filteredItems, allApprovedItems] = await Promise.all([
        getApprovedMenuItems({
            search: search.trim() || undefined,
            category: category !== "all" ? category : undefined,
            location: location !== "all" ? location : undefined,
            sort: sort !== "default" ? sort : undefined,
        }),
        getApprovedMenuItems(),
    ]);

    const approvedItems = filteredItems.filter(
        (item) => item.status === "approved"
    );

    const availableLocations = Array.from(
        new Set(
            allApprovedItems
                .map((item) => item.location?.trim())
                .filter((loc): loc is string => Boolean(loc))
        )
    );

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="my-10">
                <p className="text-xs font-bold tracking-wider text-red-600 uppercase">
                    Explore Our Kitchens
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-stone-900 md:text-4xl">
                    Browse Pizza Menu
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-stone-600">
                    Search fresh pizzas, sides, and beverages by name, category, or
                    restaurant location, and sort by price.
                </p>
            </div>

            <MenuFilters
                search={search}
                category={category}
                location={location}
                sort={sort}
                availableLocations={availableLocations}
            />

            <div className="mb-5 flex items-center justify-between text-xs font-semibold text-stone-600">
                <span>
                    Showing{" "}
                    <strong className="text-stone-900">{approvedItems.length}</strong>{" "}
                    approved menu {approvedItems.length === 1 ? "item" : "items"}
                </span>
            </div>

            {approvedItems.length === 0 ? (
                <div className="rounded-2xl border border-orange-200/80 bg-amber-50/40 p-12 text-center">
                    <h2 className="text-lg font-bold text-stone-900">
                        No matching menu items found
                    </h2>
                    <p className="mt-1 text-sm text-stone-600">
                        Try adjusting your search keyword, category, location, or sort
                        option.
                    </p>
                    <Button
                        className="mt-5 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                        render={<Link href="/menu">Reset All Filters</Link>}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {approvedItems.map((item) => (
                        <MenuCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}