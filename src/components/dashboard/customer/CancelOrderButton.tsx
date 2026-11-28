"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cancelOrderAction } from "@/lib/actions/customer/order";

const CancelOrderButton = ({ orderId }: { orderId: string }) => {
    const router = useRouter();

    const handleCancel = async () => {
        const result = await cancelOrderAction(orderId);

        if (!result.success) {
            toast.error(result.message || "Failed to cancel order.");
            return;
        }

        toast.success(result.message || "Order cancelled.");
        router.refresh();
    };

    return (
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="h-8 rounded-lg border-red-200 bg-white px-3 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
        >
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Cancel
        </Button>
    );
};

export default CancelOrderButton;