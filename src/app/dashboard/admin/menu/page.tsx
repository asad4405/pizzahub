import Link from "next/link";
import { getAllMenuItemsForAdmin } from "@/lib/actions/admin/menu";
import AdminMenuCard from "@/components/dashboard/admin/AdminMenuCard";

const statusFilters = ["all", "pending", "approved", "rejected", "inactive"] as const;

const AdminMenuPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ status?: string }>;
}) => {
    const resolvedParams = await searchParams;
    const currentStatus = resolvedParams?.status || "all";
    const items = await getAllMenuItemsForAdmin(currentStatus);

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-200/70 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-stone-900">All Menu Items</h1>
                    <p className="text-sm text-stone-600">
                        Review, approve, or reject vendor submissions ({items.length} items)
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {statusFilters.map((tab) => {
                        const isActive = currentStatus === tab;
                        const href =
                            tab === "all"
                                ? "/dashboard/admin/menu"
                                : `/dashboard/admin/menu?status=${tab}`;

                        return (
                            <Link
                                key={tab}
                                href={href}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${isActive
                                        ? "border-red-600 bg-red-600 text-white"
                                        : "border-orange-200 bg-white text-stone-700 hover:bg-orange-50"
                                    }`}
                            >
                                {tab}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {items.length === 0 ? (
                <div className="w-full rounded-2xl border border-orange-200/80 bg-white p-10 text-center">
                    <p className="text-sm font-medium text-stone-600">
                        No menu items found for &ldquo;{currentStatus}&rdquo;.
                    </p>
                </div>
            ) : (
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <AdminMenuCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMenuPage;