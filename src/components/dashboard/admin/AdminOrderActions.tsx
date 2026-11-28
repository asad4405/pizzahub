"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    deleteOrderAction,
    updateAdminOrderStatusAction,
} from "@/lib/actions/admin/order";

interface AdminOrderActionsProps {
    orderId: string;
    currentStatus: string;
}

const statuses = [
    "pending",
    "accepted",
    "preparing",
    "delivered",
    "cancelled",
] as const;

const AdminOrderActions = ({
    orderId,
    currentStatus,
}: AdminOrderActionsProps) => {
    const router = useRouter();

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextStatus = e.target.value as (typeof statuses)[number];
        const result = await updateAdminOrderStatusAction(orderId, nextStatus);

        if (!result.success) {
            toast.error(result.message || "Could not update status.");
            return;
        }

        toast.success(result.message || `Status updated to ${nextStatus}`);
        router.refresh();
    };

    const handleDelete = async () => {
        const result = await deleteOrderAction(orderId);

        if (!result.success) {
            toast.error(result.message || "Could not delete order.");
            return;
        }

        toast.success(result.message || "Order deleted.");
        router.refresh();
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <select
                value={currentStatus}
                onChange={handleStatusChange}
                aria-label="Change order status"
                className="h-8 rounded-lg border border-orange-200 bg-white px-2.5 text-xs font-semibold text-stone-800 outline-none focus:border-red-500"
            >
                {statuses.map((st) => (
                    <option key={st} value={st} className="capitalize">
                        {st}
                    </option>
                ))}
            </select>

            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="h-8 rounded-lg border-red-200 bg-white px-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
            >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
            </Button>
        </div>
    );
};

export default AdminOrderActions;