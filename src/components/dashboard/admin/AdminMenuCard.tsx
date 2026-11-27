"use client";

import { useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, MapPin, Trash2, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    deleteAdminMenuItemAction,
    updateAdminMenuStatusAction,
} from "@/lib/actions/admin/menu";
import { MenuItemType } from "@/types/CategoryType";

const statusStyleMap: Record<string, string> = {
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    inactive: "bg-stone-100 text-stone-700 border-stone-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
};

const AdminMenuCard = ({ item }: { item: MenuItemType }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const badgeClass =
        statusStyleMap[item.status] || "bg-orange-100 text-red-700 border-orange-200";

    const handleStatusChange = (formData: FormData) => {
        startTransition(async () => {
            const res = await updateAdminMenuStatusAction(formData);
            if (res?.error) {
                toast.error(res.error, { position: "bottom-right" });
                return;
            }
            if (res?.success) {
                toast.success(res.message || "Status updated!", { position: "bottom-right" });
                router.refresh();
            }
        });
    };

    const handleDelete = (formData: FormData) => {
        startTransition(async () => {
            const res = await deleteAdminMenuItemAction(formData);
            if (res?.error) {
                toast.error(res.error, { position: "bottom-right" });
                return;
            }
            if (res?.success) {
                toast.success(res.message || "Menu item deleted!", { position: "bottom-right" });
                router.refresh();
            }
        });
    };

    return (
        <Card className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-orange-200/80 bg-white pt-0 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div>
                <div className="relative h-44 w-full overflow-hidden bg-amber-50">
                    <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.itemName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                        <Badge
                            variant="outline"
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize shadow-2xs ${badgeClass}`}
                        >
                            {item.status}
                        </Badge>
                    </div>
                </div>

                <CardContent className="space-y-2.5 p-4">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
                                {item.category}
                            </p>
                            <h2 className="line-clamp-1 text-base font-extrabold text-stone-900">
                                {item.itemName}
                            </h2>
                        </div>
                        <span className="shrink-0 rounded-lg bg-orange-50 px-2.5 py-1 text-sm font-extrabold text-stone-900">
                            ৳{item.price}
                        </span>
                    </div>

                    <p className="flex items-center gap-1 text-xs font-medium text-stone-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500" />
                        <span className="truncate">{item.location}</span>
                    </p>

                    <p className="truncate text-[11px] text-stone-400">
                        Vendor ID: <span className="font-medium text-stone-600">{item.vendorId}</span>
                    </p>

                    {item.description && (
                        <p className="line-clamp-2 text-xs leading-relaxed text-stone-600">
                            {item.description}
                        </p>
                    )}
                </CardContent>
            </div>

            <div className="flex items-center justify-between gap-2 border-t border-orange-100 bg-amber-50/40 px-4 py-3">
                <div className="flex items-center gap-1.5">
                    {item.status !== "approved" && (
                        <form action={handleStatusChange}>
                            <input type="hidden" name="id" value={item._id} />
                            <input type="hidden" name="status" value="approved" />
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isPending}
                                className="cursor-pointer rounded-lg bg-emerald-600 text-xs font-semibold text-white hover:bg-emerald-700"
                            >
                                <Check className="mr-1 h-3.5 w-3.5" />
                                Approve
                            </Button>
                        </form>
                    )}

                    {item.status !== "rejected" && (
                        <form action={handleStatusChange}>
                            <input type="hidden" name="id" value={item._id} />
                            <input type="hidden" name="status" value="rejected" />
                            <Button
                                type="submit"
                                variant="outline"
                                size="sm"
                                disabled={isPending}
                                className="cursor-pointer rounded-lg border-amber-300 bg-white text-xs font-semibold text-amber-800 hover:bg-amber-50"
                            >
                                <X className="mr-1 h-3.5 w-3.5" />
                                Reject
                            </Button>
                        </form>
                    )}
                </div>

                <form action={handleDelete}>
                    <input type="hidden" name="id" value={item._id} />
                    <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={isPending}
                        aria-label="Delete menu item"
                        className="cursor-pointer rounded-lg border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    );
};

export default AdminMenuCard;