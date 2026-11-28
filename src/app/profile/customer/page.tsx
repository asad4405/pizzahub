import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import { auth } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import CustomerProfileForm from "@/components/dashboard/customer/CustomerProfileForm";

async function getCustomerProfileData(email?: string, userId?: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl || (!email && !userId)) return null;

    const params = new URLSearchParams();
    if (email) params.set("email", email);
    else if (userId) params.set("userId", userId);

    const res = await fetch(
        `${apiUrl}/api/customer/profile?${params.toString()}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    return data?.profile || null;
}

export default async function CustomerProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user as
        | {
              id?: string;
              name?: string;
              email?: string;
              image?: string;
              role?: string;
              phone?: string;
              address?: string;
          }
        | undefined;

    if (!user) {
        redirect("/");
    }

    if (user.role && user.role !== "customer") {
        redirect(`/profile/${user.role}`);
    }

    const dbProfile = await getCustomerProfileData(user.email, user.id);
    const mergedProfile = {
        ...user,
        ...(dbProfile || {}),
        id: dbProfile?._id ? String(dbProfile._id) : user.id,
    };

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-red-600">
                        <User className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-stone-900">
                            Customer Profile Settings
                        </h1>
                        <p className="text-sm text-stone-600">
                            Manage your personal details and default delivery address.
                        </p>
                    </div>
                </div>

                <Badge
                    variant="outline"
                    className="rounded-full border-orange-200 bg-amber-50 px-3 py-1 text-xs font-bold text-stone-800 uppercase"
                >
                    {user.role || "customer"}
                </Badge>
            </div>

            <CustomerProfileForm profile={mergedProfile} />
        </div>
    );
}