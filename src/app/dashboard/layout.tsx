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
        <div className="min-h-screen w-full bg-amber-50 text-stone-900">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <SidebarProvider className="flex min-h-screen w-full">
                    <DashboardSidebar role={role} />

                    <SidebarInset className="flex min-w-0 flex-1 flex-col bg-amber-50/70">
                        <DashboardHeader role={role} userName={session?.user?.name} />
                        <main className="w-full flex-1 py-4 md:py-6 md:pl-6">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </div>
    );
};

export default DashboardLayout;