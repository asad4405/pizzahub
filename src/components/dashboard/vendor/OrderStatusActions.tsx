"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, ChefHat, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateOrderStatusAction } from "@/lib/actions/vendor/order";

interface OrderStatusActionsProps {
    orderId: string;
    currentStatus: string;
}

const OrderStatusActions = ({
    orderId,
    currentStatus,
}: OrderStatusActionsProps) => {
    const router = useRouter();

    const handleStatusChange = async (
        nextStatus: "accepted" | "preparing" | "delivered" | "cancelled"
    ) => {
        const result = await updateOrderStatusAction(orderId, nextStatus);

        if (!result.success) {
            toast.error(result.message || "Could not update status.");
            return;
        }

        toast.success(result.message || `Status updated to ${nextStatus}`);
        router.refresh();
    };

    if (currentStatus === "delivered" || currentStatus === "cancelled") {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {currentStatus === "pending" && (
                <Button
                    type="button"
                    size="sm"
                    onClick={() => handleStatusChange("accepted")}
                    className="h-8 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700"
                >
                    <Check className="mr-1 h-3.5 w-3.5" />
                    Accept
                </Button>
            )}

            {(currentStatus === "pending" || currentStatus === "accepted") && (
                <Button
                    type="button"
                    size="sm"
                    onClick={() => handleStatusChange("preparing")}
                    className="h-8 rounded-lg bg-purple-600 px-3 text-xs font-semibold text-white hover:bg-purple-700"
                >
                    <ChefHat className="mr-1 h-3.5 w-3.5" />
                    Preparing
                </Button>
            )}

            {currentStatus === "preparing" && (
                <Button
                    type="button"
                    size="sm"
                    onClick={() => handleStatusChange("delivered")}
                    className="h-8 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                    <Truck className="mr-1 h-3.5 w-3.5" />
                    Deliver
                </Button>
            )}

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleStatusChange("cancelled")}
                className="h-8 rounded-lg border-red-200 bg-white px-3 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
            >
                <X className="mr-1 h-3.5 w-3.5" />
                Cancel
            </Button>
        </div>
    );
};

export default OrderStatusActions;