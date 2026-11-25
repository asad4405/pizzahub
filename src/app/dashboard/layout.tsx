"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { normalizeDashboardRole } from "@/components/dashboard/DashboardNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession();
    const rawRole = (session?.user as { role?: string } | undefined)?.role;
    const role = normalizeDashboardRole(rawRole);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-amber-50/70 text-stone-900">
                <DashboardSidebar role={role} />

                <SidebarInset className="min-w-0 flex-1 bg-amber-50/70">
                    <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
                        <DashboardHeader role={role} userName={session?.user?.name} />
                        <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-6">
                            {children}
                        </main>
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;