"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, CheckCircle, Trash2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    toggleBlockUserAction,
    deleteUserAction,
} from "@/lib/actions/admin/user";

const UserRowActions = ({
    userId,
    role,
    isBlocked,
}: {
    userId: string;
    role?: string;
    isBlocked?: boolean;
}) => {
    const router = useRouter();
    const isAdmin = String(role || "").toLowerCase() === "admin";

    if (isAdmin) {
        return (
            <Badge
                variant="outline"
                className="inline-flex items-center gap-1 rounded-full border-stone-300 bg-stone-100 px-2.5 py-1 text-xs font-bold text-stone-600"
            >
                <Lock className="h-3 w-3" />
                Admin
            </Badge>
        );
    }

    const handleBlockToggle = async () => {
        const result = await toggleBlockUserAction(userId, !Boolean(isBlocked));
        if (!result.success) {
            toast.error(result.message || "Action failed.");
            return;
        }
        toast.success(result.message);
        router.refresh();
    };

    const handleDelete = async () => {
        const result = await deleteUserAction(userId);
        if (!result.success) {
            toast.error(result.message || "Could not delete user.");
            return;
        }
        toast.success(result.message);
        router.refresh();
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleBlockToggle}
                className={
                    isBlocked
                        ? "h-8 rounded-lg border-emerald-200 bg-emerald-50 px-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                        : "h-8 rounded-lg border-amber-200 bg-amber-50 px-2.5 text-xs font-bold text-amber-800 hover:bg-amber-100"
                }
            >
                {isBlocked ? (
                    <>
                        <CheckCircle className="mr-1 h-3.5 w-3.5" />
                        Unblock
                    </>
                ) : (
                    <>
                        <Ban className="mr-1 h-3.5 w-3.5" />
                        Block
                    </>
                )}
            </Button>

            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleDelete}
                className="h-8 rounded-lg border-red-200 bg-red-50 px-2.5 text-xs font-bold text-red-700 hover:bg-red-100"
            >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Delete
            </Button>
        </div>
    );
};

export default UserRowActions;