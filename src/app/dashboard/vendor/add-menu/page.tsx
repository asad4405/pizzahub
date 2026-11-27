export const instant = false;

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getMyMenuItems } from "@/lib/actions/vendor/menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddMenuForm from "@/components/dashboard/vendor/AddMenuForm";

const AddMenuPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const vendorId = session?.user?.id || "";
    const { items, isPremium } = await getMyMenuItems(vendorId);

    const activeCount = items.filter(
        (item) => item.status === "pending" || item.status === "approved"
    ).length;
    const reachedLimit = !isPremium && activeCount >= 3;

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-stone-900">Add Menu Item</h1>
                <p className="text-sm text-stone-600">
                    {isPremium
                        ? "Premium Plan: Unlimited items"
                        : `Free Plan: ${activeCount}/3 active items`}
                </p>
            </div>

            <Card className="border-orange-200/80 bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-stone-900">New Pizza</CardTitle>
                </CardHeader>
                <CardContent>
                    {reachedLimit ? (
                        <p className="rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-900">
                            Free plan limit reached (3 active items). Upgrade to Premium for unlimited items.
                        </p>
                    ) : (
                        <AddMenuForm vendorId={vendorId} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default AddMenuPage;