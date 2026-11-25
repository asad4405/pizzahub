"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Pizza, Settings, LogOut, Home } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { signOut } from "@/lib/auth-client";
import { DashboardRole, getDashboardNavItems } from "./DashboardNav";

const DashboardSidebar = ({ role }: { role: DashboardRole }) => {
    const pathname = usePathname();
    const navItems = getDashboardNavItems(role);

    const handleSignOut = async () => {
        const { error } = await signOut();
        if (error) {
            toast.error(error.message || "Failed to sign out.", {
                position: "bottom-right",
            });
            return;
        }
        toast.success("Signed out successfully!", {
            position: "bottom-right",
        });
    };

    return (
        <Sidebar className="border-r border-orange-200/80 bg-amber-50">
            <SidebarHeader className="border-b border-orange-200/70 bg-amber-50 p-4">
                <div className="flex items-center justify-between gap-2">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-xs">
                            <Pizza className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-extrabold tracking-tight text-stone-900">
                            Pizza<span className="text-red-600">Hub</span>
                        </span>
                    </Link>
                    <Badge className="bg-orange-100 text-xs font-semibold text-red-700 capitalize hover:bg-orange-100">
                        {role}
                    </Badge>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-amber-50 px-2 py-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-xs font-bold tracking-wider text-stone-500 uppercase">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-1">
                        <SidebarMenu className="gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton
                                            isActive={isActive}
                                            render={
                                                <Link href={item.href} className="flex items-center gap-3">
                                                    <Icon className="h-4 w-4 shrink-0" />
                                                    <span className="leading-none">{item.label}</span>
                                                </Link>
                                            }
                                            className="flex h-10 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-semibold text-stone-700 hover:bg-orange-100/80 hover:text-red-600 data-[active=true]:bg-red-600 data-[active=true]:text-white"
                                        />
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-orange-200/70 bg-amber-50 p-3">
                <SidebarMenu className="gap-1">
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            render={
                                <Link href="/" className="flex items-center gap-3">
                                    <Home className="h-4 w-4 shrink-0" />
                                    <span className="leading-none">Home</span>
                                </Link>
                            }
                            className="flex h-10 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-medium text-stone-700 hover:bg-orange-100/80 hover:text-red-600"
                        />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            render={
                                <Link href="/settings" className="flex items-center gap-3">
                                    <Settings className="h-4 w-4 shrink-0" />
                                    <span className="leading-none">Settings</span>
                                </Link>
                            }
                            className="flex h-10 cursor-pointer items-center gap-3 rounded-xl px-3 text-sm font-medium text-stone-700 hover:bg-orange-100/80 hover:text-red-600"
                        />
                    </SidebarMenuItem>
                </SidebarMenu>

                <Separator className="my-2 bg-orange-200/70" />

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            type="button"
                            onClick={handleSignOut}
                            className="flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-xl px-3 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                            <LogOut className="h-4 w-4 shrink-0" />
                            <span className="leading-none">Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default DashboardSidebar;