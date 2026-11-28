import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    MapPin,
    Store,
    Utensils,
    CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OrderItemForm from "@/components/menu/OrderItemForm";
import { getMenuItemById } from "@/lib/actions/webview/menu";

interface MenuItemDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function MenuItemDetailsPage({
    params,
}: MenuItemDetailsPageProps) {
    const { id } = await params;
    const item = await getMenuItemById(id);

    if (!item) {
        notFound();
    }

    const vendorDisplay =
        item.vendorName?.trim() ||
        item.businessName?.trim() ||
        item.vendorId;

    const imageSrc = item.image || "";

    return (
        <div className="mx-auto max-w-6xl px-4 pt-24 pb-14 sm:pt-28">
            <div className="mb-6">
                <Button
                    variant="outline"
                    className="rounded-xl border-orange-200 bg-white font-semibold text-stone-800 hover:bg-orange-50 hover:text-red-600"
                    render={
                        <Link href="/menu" className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Menu
                        </Link>
                    }
                />
            </div>

            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-orange-200/80 bg-amber-50 shadow-xs sm:h-96 lg:h-full lg:min-h-64">
                        <Image
                            src={imageSrc}
                            alt={item.itemName}
                            fill
                            unoptimized
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />
                        <Badge className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-stone-900 hover:bg-white">
                            {item.category}
                        </Badge>
                    </div>
                </div>

                <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
                    <div className="space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-red-600 uppercase">
                                    <Utensils className="h-3.5 w-3.5" />
                                    {item.category}
                                </p>
                                <h1 className="mt-1 text-3xl font-extrabold text-stone-900 md:text-4xl">
                                    {item.itemName}
                                </h1>
                            </div>

                            <div className="rounded-2xl bg-orange-50 px-4 py-2 text-right">
                                <span className="block text-[11px] font-semibold text-stone-500 uppercase">
                                    Price
                                </span>
                                <span className="text-2xl font-extrabold text-red-600">
                                    ৳{item.price}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-orange-200/70 bg-amber-50/40 p-4">
                            <h2 className="text-xs font-bold tracking-wider text-stone-500 uppercase">
                                Description
                            </h2>
                            <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
                                {item.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Card className="rounded-2xl border border-orange-200/80 bg-white shadow-none">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                                        <Store className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-semibold text-stone-500 uppercase">
                                            Vendor / Kitchen
                                        </p>
                                        <p className="truncate text-sm font-bold text-stone-900">
                                            {vendorDisplay}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border border-orange-200/80 bg-white shadow-none">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-red-600">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-semibold text-stone-500 uppercase">
                                            Location
                                        </p>
                                        <p className="truncate text-sm font-bold text-stone-900">
                                            {item.location}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <span>Available & Approved for Ordering</span>
                        </div>
                    </div>

                    <OrderItemForm item={item} />
                </div>
            </div>
        </div>
    );
}