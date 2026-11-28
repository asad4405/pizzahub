"use client";

import Link from "next/link";
import { MapPin, ShoppingBag, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MenuItemType } from "@/types/CategoryType";

interface OrderItemFormProps {
    item: MenuItemType;
}

const OrderItemForm = ({ item }: OrderItemFormProps) => {
    return (
        <div className="rounded-2xl border border-orange-200/90 bg-amber-50/50 p-5 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-stone-900">
                    Order Details
                </h2>
                <span className="text-xs font-bold text-red-600">
                    Total: ৳{item.price}
                </span>
            </div>

            <form className="space-y-3.5">
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="deliveryDate"
                            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                        >
                            <Calendar className="h-3.5 w-3.5 text-red-600" />
                            Delivery Date
                        </label>
                        <Input
                            id="deliveryDate"
                            name="deliveryDate"
                            type="date"
                            className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="deliveryAddress"
                            className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                        >
                            <MapPin className="h-3.5 w-3.5 text-red-600" />
                            Delivery Address
                        </label>
                        <Input
                            id="deliveryAddress"
                            name="deliveryAddress"
                            type="text"
                            placeholder="House, road, area..."
                            className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="orderNote"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <FileText className="h-3.5 w-3.5 text-red-600" />
                        Order Note
                    </label>
                    <textarea
                        id="orderNote"
                        name="orderNote"
                        rows={2}
                        placeholder="Any extra instructions (e.g., extra chili flakes, call on arrival)..."
                        className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-red-500"
                    />
                </div>

                <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
                    <Button
                        type="submit"
                        className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-bold text-white hover:bg-red-700"
                    >
                        <ShoppingBag className="mr-1.5 h-4 w-4" />
                        Place Order
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 rounded-xl border-orange-200 bg-white px-5 text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-red-600"
                        render={<Link href="/menu">Browse More</Link>}
                    />
                </div>
            </form>
        </div>
    );
};

export default OrderItemForm;