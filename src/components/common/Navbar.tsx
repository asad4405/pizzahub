"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
    Pizza,
    Menu,
    LogOut,
    User,
    LayoutDashboard,
    Settings,
    ChevronDown,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import SignInDialog from "@/components/auth/SignInDialog";
import SignUpDialog from "@/components/auth/SignUpDialog";
import { useSession, signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const [menuOpen, setMenuOpen] = useState(false);

    const role =
        (user as { role?: string } | undefined)?.role?.toLowerCase() || "customer";
    const dashboardHref = `/dashboard/${role}`;

    const handleSignOut = async () => {
        setMenuOpen(false);
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
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-orange-100 bg-amber-50/95 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
                        <Pizza className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-stone-900">
                        Pizza<span className="text-red-600">Hub</span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium text-stone-700 transition-colors hover:text-red-600"
                    >
                        Home
                    </Link>
                    <Link
                        href="/browse-menu"
                        className="text-sm font-medium text-stone-700 transition-colors hover:text-red-600"
                    >
                        Browse Menu
                    </Link>
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                className="flex cursor-pointer items-center gap-2 rounded-lg border border-orange-200 bg-white px-3.5 py-2 text-sm font-semibold text-stone-800 shadow-xs transition-colors hover:bg-orange-50 hover:text-red-600"
                            >
                                <User className="h-4 w-4 text-red-600" />
                                <span>{user.name || "Profile"}</span>
                                <ChevronDown className="h-4 w-4 text-stone-500" />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-orange-200/80 bg-white py-1.5 shadow-lg">
                                    <div className="border-b border-orange-100 px-3.5 py-2">
                                        <p className="truncate text-sm font-bold text-stone-900">
                                            {user.name || "Account"}
                                        </p>
                                        {user.email && (
                                            <p className="truncate text-xs text-stone-500">
                                                {user.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="py-1">
                                        <Link
                                            href={dashboardHref}
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-50 hover:text-red-600"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/profile"
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-50 hover:text-red-600"
                                        >
                                            <User className="h-4 w-4" />
                                            Profile
                                        </Link>
                                        <Link
                                            href="/settings"
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-amber-50 hover:text-red-600"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </Link>
                                    </div>

                                    <div className="border-t border-orange-100 pt-1">
                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <SignInDialog
                                triggerClassName={cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "cursor-pointer font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                                )}
                            />
                            <SignUpDialog
                                triggerClassName={cn(
                                    buttonVariants({ variant: "default" }),
                                    "cursor-pointer bg-red-600 font-semibold text-white shadow-sm hover:bg-red-700"
                                )}
                            />
                        </>
                    )}
                </div>

                <div className="flex items-center md:hidden">
                    <Sheet>
                        <SheetTrigger
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "text-stone-800 hover:bg-orange-100/60"
                            )}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 bg-amber-50">
                            <SheetHeader className="border-b border-orange-100 pb-4 text-left">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                                        <Pizza className="h-4 w-4" />
                                    </div>
                                    <span className="text-lg font-extrabold text-stone-900">
                                        Pizza<span className="text-red-600">Hub</span>
                                    </span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="mt-6 flex flex-col gap-3">
                                <SheetClose
                                    render={
                                        <Link
                                            href="/"
                                            className="rounded-md px-2 py-2 text-sm font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                                        />
                                    }
                                >
                                    Home
                                </SheetClose>
                                <SheetClose
                                    render={
                                        <Link
                                            href="/browse-menu"
                                            className="rounded-md px-2 py-2 text-sm font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                                        />
                                    }
                                >
                                    Browse Menu
                                </SheetClose>

                                <div className="mt-4 flex flex-col gap-2 border-t border-orange-100 pt-4">
                                    {user ? (
                                        <>
                                            <Link
                                                href={dashboardHref}
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                                            >
                                                <User className="h-4 w-4" />
                                                Profile
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                                            >
                                                <Settings className="h-4 w-4" />
                                                Settings
                                            </Link>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleSignOut}
                                                className="mt-2 w-full cursor-pointer gap-2 border-orange-200 text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Sign Out
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <SignInDialog
                                                triggerClassName={cn(
                                                    buttonVariants({ variant: "outline" }),
                                                    "w-full cursor-pointer border-orange-200 text-stone-800 hover:bg-orange-100/60"
                                                )}
                                            />
                                            <SignUpDialog
                                                triggerClassName={cn(
                                                    buttonVariants({ variant: "default" }),
                                                    "w-full cursor-pointer bg-red-600 text-white hover:bg-red-700"
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;