export const instant = false;

import { headers } from "next/headers";
import Link from "next/link";
import { Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import MenuItemCard from "@/components/dashboard/vendor/MenuItemCard";
import { getMyMenuItems } from "@/lib/actions/vendor/menu";

const VendorMenuPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const vendorId = session?.user?.id || "";
    const { items } = await getMyMenuItems(vendorId);

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-200/70 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-stone-900">My Menu Items</h1>
                    <p className="text-sm text-stone-600">Total items: {items.length}</p>
                </div>

                <Button
                    render={
                        <Link href="/dashboard/vendor/add-menu" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Menu Item
                        </Link>
                    }
                    className="bg-red-600 text-white hover:bg-red-700"
                />
            </div>

            {items.length === 0 ? (
                <div className="w-full rounded-2xl border border-orange-200/80 bg-white p-10 text-center">
                    <p className="text-sm font-medium text-stone-600">No menu items found yet.</p>
                </div>
            ) : (
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                        <MenuItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorMenuPage;