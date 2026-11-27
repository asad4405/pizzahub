"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MenuItemType } from "@/types/CategoryType";

interface MenuCardProps {
    item: MenuItemType;
    isLoggedIn?: boolean;
    loginPath?: string;
}

const MenuCard = ({
    item,
    isLoggedIn = true,
    loginPath = "/sign-in",
}: MenuCardProps) => {
    const router = useRouter();

    const vendorDisplay =
        item.vendorName?.trim() ||
        item.businessName?.trim() ||
        item.vendorId;

    const handleViewDetails = () => {
        if (!isLoggedIn) {
            router.push(`${loginPath}?callbackUrl=/menu/${item._id}`);
            return;
        }
        router.push(`/menu/${item._id}`);
    };

    return (
        <Card className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-orange-200/80 bg-white pt-0 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div>
                <div className="relative h-48 w-full overflow-hidden bg-amber-50">
                    <Image
                        src={item.image || item.images?.[0] || "/placeholder.png"}
                        alt={item.itemName}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-stone-900 hover:bg-white">
                        {item.category}
                    </Badge>
                </div>

                <CardContent className="space-y-2.5 p-4">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 text-lg font-extrabold text-stone-900">
                            {item.itemName}
                        </h3>
                        <span className="shrink-0 rounded-lg bg-orange-50 px-2.5 py-1 text-sm font-extrabold text-red-600">
                            ৳{item.price}
                        </span>
                    </div>

                    <p className="flex items-center gap-1 text-xs font-medium text-stone-500">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-red-500" />
                        <span className="truncate">{item.location}</span>
                    </p>

                    <p className="flex items-center gap-1.5 truncate text-xs text-stone-600">
                        <Store className="h-3.5 w-3.5 shrink-0 text-amber-600" />
                        <span className="truncate font-semibold text-stone-800">
                            {vendorDisplay}
                        </span>
                    </p>
                </CardContent>
            </div>

            <div className="border-t border-orange-100 bg-amber-50/40 px-4 py-3">
                <Button
                    type="button"
                    onClick={handleViewDetails}
                    className="w-full rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700"
                >
                    View Details
                </Button>
            </div>
        </Card>
    );
};

export default MenuCard;