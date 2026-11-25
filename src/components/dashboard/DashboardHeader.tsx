"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { DashboardRole } from "./DashboardNav";

type DashboardHeaderProps = {
    role: DashboardRole;
    userName?: string | null;
};

const DashboardHeader = ({ role, userName }: DashboardHeaderProps) => {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-orange-200/70 bg-amber-50/95 px-4 backdrop-blur-md md:px-6">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="cursor-pointer border border-orange-200 bg-white text-stone-800 hover:bg-orange-50" />
                <span className="text-base font-extrabold tracking-tight text-stone-900 capitalize">
                    {role} Dashboard
                </span>
            </div>

            <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-stone-800">
                    {userName || "Account"}
                </span>
                <Badge className="bg-red-600 text-xs font-semibold text-white capitalize hover:bg-red-600">
                    {role}
                </Badge>
            </div>
        </header>
    );
};

export default DashboardHeader;