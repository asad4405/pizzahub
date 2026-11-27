import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getMyMenuItems } from "@/lib/actions/vendor/menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditMenuForm from "@/components/dashboard/vendor/EditMenuForm";

const EditMenuPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const session = await auth.api.getSession({ headers: await headers() });
    const vendorId = session?.user?.id || "";
    const { items } = await getMyMenuItems(vendorId);

    const item = items.find((menu) => String(menu._id) === id);
    if (!item) notFound();

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between border-b border-orange-200/70 pb-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-stone-900">Edit Menu Item</h1>
                    <p className="text-sm text-stone-600">{item.itemName}</p>
                </div>

                <Button
                    variant="outline"
                    render={
                        <Link href="/dashboard/vendor/menu" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Menu
                        </Link>
                    }
                />
            </div>

            <Card className="w-full max-w-4xl border-orange-200/80 bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-stone-900">Update Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditMenuForm item={item} />
                </CardContent>
            </Card>
        </div>
    );
};

export default EditMenuPage;