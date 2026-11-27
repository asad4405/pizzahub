"use client";

import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PIZZA_CATEGORIES } from "@/types/CategoryType";

interface MenuFiltersProps {
    search: string;
    category: string;
    location: string;
    sort: string;
    availableLocations: string[];
}

const MenuFilters = ({
    search,
    category,
    location,
    sort,
    availableLocations,
}: MenuFiltersProps) => {
    const router = useRouter();

    const updateQuery = (updates: {
        search?: string;
        category?: string;
        location?: string;
        sort?: string;
    }) => {
        const nextSearch = updates.search !== undefined ? updates.search : search;
        const nextCategory =
            updates.category !== undefined ? updates.category : category;
        const nextLocation =
            updates.location !== undefined ? updates.location : location;
        const nextSort = updates.sort !== undefined ? updates.sort : sort;

        const params = new URLSearchParams();
        if (nextSearch.trim()) params.set("search", nextSearch.trim());
        if (nextCategory && nextCategory !== "all") {
            params.set("category", nextCategory);
        }
        if (nextLocation && nextLocation !== "all") {
            params.set("location", nextLocation);
        }
        if (nextSort && nextSort !== "default") {
            params.set("sort", nextSort);
        }

        const queryString = params.toString();
        router.push(queryString ? `/menu?${queryString}` : "/menu");
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchValue = String(formData.get("search") || "");
        const locationValue = String(formData.get("location") || "all");
        const sortValue = String(formData.get("sort") || "default");

        updateQuery({
            search: searchValue,
            location: locationValue,
            sort: sortValue,
        });
    };

    const handleReset = () => {
        router.push("/menu");
    };

    return (
        <div className="mb-6 rounded-2xl border border-orange-200/80 bg-amber-50/40 p-4 shadow-xs">
            <form
                key={`${search}-${location}-${sort}`}
                onSubmit={handleFormSubmit}
                className="grid grid-cols-1 gap-3 md:grid-cols-12"
            >
                <div className="relative md:col-span-5">
                    <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <Input
                        name="search"
                        type="text"
                        defaultValue={search}
                        placeholder="Search by pizza name or ingredients..."
                        className="h-10 rounded-xl border-orange-200 bg-white pl-9 text-sm text-stone-900"
                    />
                </div>

                <div className="md:col-span-3">
                    <select
                        name="location"
                        aria-label="Filter by location"
                        defaultValue={location || "all"}
                        onChange={(e) => updateQuery({ location: e.target.value })}
                        className="h-10 w-full rounded-xl border border-orange-200 bg-white px-3 text-sm font-medium text-stone-800 outline-none focus:border-red-500"
                    >
                        <option value="all">All Locations</option>
                        {availableLocations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2">
                    <select
                        name="sort"
                        aria-label="Sort by price"
                        defaultValue={sort || "default"}
                        onChange={(e) => updateQuery({ sort: e.target.value })}
                        className="h-10 w-full rounded-xl border border-orange-200 bg-white px-3 text-sm font-medium text-stone-800 outline-none focus:border-red-500"
                    >
                        <option value="default">Default Order</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                </div>

                <div className="flex gap-2 md:col-span-2">
                    <Button
                        type="submit"
                        className="h-10 flex-1 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                    >
                        Search
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        title="Reset filters"
                        className="h-10 rounded-xl border-orange-200 bg-white px-3 text-stone-700 hover:bg-orange-50 hover:text-red-600"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </form>

            {/* Category Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-orange-100 pt-4">
                <span className="inline-flex items-center gap-1.5 pr-1 text-xs font-bold text-stone-600">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-red-600" />
                    Categories:
                </span>

                <button
                    type="button"
                    onClick={() => updateQuery({ category: "all" })}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        !category || category === "all"
                            ? "bg-red-600 text-white shadow-xs"
                            : "border border-orange-200/80 bg-white text-stone-700 hover:bg-orange-50"
                    }`}
                >
                    All Items
                </button>

                {PIZZA_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => updateQuery({ category: cat })}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                            category === cat
                                ? "bg-red-600 text-white shadow-xs"
                                : "border border-orange-200/80 bg-white text-stone-700 hover:bg-orange-50"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MenuFilters;