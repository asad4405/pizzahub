"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {MapPin,ShoppingBag,Calendar,FileText,Lock} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import SignInDialog from "@/components/auth/SignInDialog";
import SignUpDialog from "@/components/auth/SignUpDialog";
import { createOrderAction } from "@/lib/actions/webview/order";
import { MenuItemType } from "@/types/CategoryType";
import { OrderType } from "@/types/OrderType";

interface OrderItemFormProps {
    item: MenuItemType;
    myOrdersHref?: string;
}

const OrderItemForm = ({
    item,
    myOrdersHref = "/dashboard/customer/orders",
}: OrderItemFormProps) => {
    const router = useRouter();
    const { data: session, isPending: isSessionLoading } = authClient.useSession();

    const currentUser = session?.user as
        | {
              id?: string;
              name?: string;
              email?: string;
              role?: string;
          }
        | undefined;

    const isLoggedIn = Boolean(currentUser?.id || currentUser?.email);
    const isCustomer = currentUser?.role === "customer";

    const today = new Date().toLocaleDateString("en-CA");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.error("Please sign in as a customer to place an order.");
            return;
        }

        if (!isCustomer) {
            toast.error("Only customer accounts can place orders.");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        const deliveryDate = String(formData.get("deliveryDate") || "").trim();
        const deliveryAddress = String(formData.get("deliveryAddress") || "").trim();
        const note = String(formData.get("orderNote") || "").trim();

        if (!deliveryDate) {
            toast.error("Please select a delivery date.");
            return;
        }

        if (deliveryDate < today) {
            toast.error("Delivery date cannot be in the past.");
            return;
        }

        if (!deliveryAddress) {
            toast.error("Please enter your delivery address.");
            return;
        }

        const vendorDisplay =
            item.vendorName?.trim() ||
            item.businessName?.trim() ||
            item.vendorId ||
            "";

        const orderData: OrderType = {
            menuItemId: String(item._id),
            itemName: item.itemName,
            price: Number(item.price),
            vendorId: String(item.vendorId || ""),
            vendorName: vendorDisplay,
            deliveryDate,
            deliveryAddress,
            note,
            customerId: currentUser?.id,
            customerName: currentUser?.name,
            customerEmail: currentUser?.email,
            customerRole: currentUser?.role,
        };

        const result = await createOrderAction(orderData);

        if (!result.success) {
            toast.error(result.message || "Could not place order.");
            return;
        }

        toast.success(result.message || "Order placed successfully!");
        form.reset();
        router.push(myOrdersHref);
        router.refresh();
    };

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

            {isSessionLoading ? (
                <div className="h-32 animate-pulse rounded-xl bg-orange-100/60" />
            ) : !isLoggedIn ? (
                <div className="space-y-3 rounded-xl border border-orange-200 bg-white p-4 text-center">
                    <p className="text-sm font-semibold text-stone-800">
                        Sign in with a customer account to place an order.
                    </p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        <SignInDialog
                            triggerClassName={cn(
                                buttonVariants({ variant: "outline" }),
                                "w-full cursor-pointer border-orange-200 text-stone-800 hover:bg-orange-100/60"
                            )}
                        />
                        <SignUpDialog
                            triggerClassName={cn(
                                buttonVariants({ variant: "default" }),
                                "w-full cursor-pointer bg-red-600 text-white hover:bg-red-700"
                            )}
                        />
                    </div>
                </div>
            ) : !isCustomer ? (
                <div className="space-y-3 rounded-xl border border-amber-300 bg-white p-4">
                    <div className="flex items-start gap-2.5 text-amber-800">
                        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                        <p className="text-xs leading-relaxed font-semibold">
                            You are logged in as{" "}
                            <span className="font-bold uppercase">
                                {currentUser?.role}
                            </span>
                            . Only accounts with the{" "}
                            <span className="font-bold">customer</span> role can
                            place orders.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="h-10 w-full rounded-xl border-orange-200 bg-white text-sm font-semibold text-stone-800 hover:bg-orange-50 hover:text-red-600"
                        render={<Link href="/menu">Browse More</Link>}
                    />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
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
                                min={today}
                                required
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
                                required
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
            )}
        </div>
    );
};

export default OrderItemForm;