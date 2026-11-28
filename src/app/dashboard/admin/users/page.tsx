import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import UserRowActions from "@/components/dashboard/admin/UserRowActions";

const getRoleBadgeStyle = (role?: string) => {
    const r = String(role || "customer").toLowerCase();
    if (r === "admin") {
        return "border-purple-200 bg-purple-50 text-purple-700";
    }
    if (r === "vendor") {
        return "border-orange-200 bg-orange-50 text-orange-700";
    }
    return "border-sky-200 bg-sky-50 text-sky-700";
};

async function getAllUsers() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];

    const res = await fetch(`${apiUrl}/api/users`, {
        cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.users)) return data.users;
    return [];
}

export default async function AdminUsersPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as { role?: string } | undefined;

    if (!user) {
        redirect("/");
    }

    if (user.role !== "admin") {
        redirect(`/dashboard/${user.role || "customer"}`);
    }

    const users = await getAllUsers();

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-red-600">
                        <Users className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-stone-900">
                            Users Management
                        </h1>
                        <p className="text-sm text-stone-600">
                            View all users with role badges, block/unblock accounts, or remove users.
                        </p>
                    </div>
                </div>

                <Badge
                    variant="outline"
                    className="rounded-full border-orange-200 bg-amber-50 px-3 py-1 text-xs font-bold text-stone-800"
                >
                    Total: {users.length}
                </Badge>
            </div>

            <div className="overflow-hidden rounded-2xl border border-orange-200/90 bg-white shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-orange-100 bg-amber-50/60 text-xs font-bold text-stone-600 uppercase">
                            <tr>
                                <th className="px-4 py-3.5">User</th>
                                <th className="px-4 py-3.5">Role</th>
                                <th className="px-4 py-3.5">Account Status</th>
                                <th className="px-4 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-100">
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-10 text-center text-sm text-stone-500"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map(
                                    (u: {
                                        _id?: string;
                                        id?: string;
                                        name?: string;
                                        email?: string;
                                        role?: string;
                                        isBlocked?: boolean;
                                    }) => {
                                        const targetId = String(u._id || u.id || "");
                                        const roleText = u.role || "customer";

                                        return (
                                            <tr
                                                key={targetId || u.email}
                                                className="hover:bg-amber-50/30"
                                            >
                                                <td className="px-4 py-3.5">
                                                    <p className="font-bold text-stone-900">
                                                        {u.name || "Unnamed User"}
                                                    </p>
                                                    <p className="text-xs text-stone-500">
                                                        {u.email}
                                                    </p>
                                                </td>

                                                <td className="px-4 py-3.5">
                                                    <Badge
                                                        variant="outline"
                                                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${getRoleBadgeStyle(
                                                            roleText
                                                        )}`}
                                                    >
                                                        {roleText}
                                                    </Badge>
                                                </td>

                                                <td className="px-4 py-3.5">
                                                    {u.isBlocked ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="rounded-full border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-700"
                                                        >
                                                            Blocked
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="rounded-full border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700"
                                                        >
                                                            Active
                                                        </Badge>
                                                    )}
                                                </td>

                                                <td className="px-4 py-3.5 text-right">
                                                    <UserRowActions
                                                        userId={targetId}
                                                        role={roleText}
                                                        isBlocked={u.isBlocked}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}