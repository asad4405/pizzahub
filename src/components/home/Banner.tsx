import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, ShieldCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Banner = () => {
    return (
        <section className="relative overflow-hidden bg-amber-50 py-12 md:py-20">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                    <div className="space-y-6 lg:col-span-6">
                        <Badge className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-100 px-3.5 py-1 text-xs font-semibold text-red-700 hover:bg-orange-100">
                            <Flame className="h-3.5 w-3.5 text-red-600" />
                            Freshly Baked Every Day
                        </Badge>

                        <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                            Hot &amp; Fresh Pizza{" "}
                            <span className="text-red-600">Delivered</span> to Your Door
                        </h1>

                        <p className="max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
                            Discover trusted local pizzerias, explore handcrafted classics
                            and gourmet specialties, and get piping-hot slices delivered
                            straight to your table.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/browse-menu"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "h-12 bg-red-600 px-6 text-base font-semibold text-white shadow-sm hover:bg-red-700"
                                )}
                            >
                                Explore Pizza Menu
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/sign-up"
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "lg" }),
                                    "h-12 border-orange-200 bg-white px-6 text-base font-semibold text-stone-800 hover:bg-orange-50 hover:text-red-600"
                                )}
                            >
                                Join as a Vendor
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-orange-200/70 pt-6 sm:max-w-md">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-red-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Fast Delivery</p>
                                    <p className="text-xs text-stone-600">Hot from the oven</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-red-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-stone-900">Local Shops</p>
                                    <p className="text-xs text-stone-600">Approved kitchens</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-orange-200/80 bg-white p-3 shadow-md sm:h-96 lg:h-112">
                            <div className="relative h-full w-full overflow-hidden rounded-xl">
                                <Image
                                    src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRlf2gq8Pr_C6YVYp2cEOSTwZidvfjSW2fiGkMwxcGnSmDxMI2YKztDzvU7He1GOc4zT6wXiylv5uqbafc"
                                    alt="Hot and fresh artisan pizza with melted cheese"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;