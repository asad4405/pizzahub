import Link from "next/link";
import { Pizza, Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-orange-100 bg-[#FFFBEB]/95 backdrop-blur-md">
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
                    <Link
                        href="/sign-in"
                        className={cn(
                            buttonVariants({ variant: "ghost" }),
                            "font-medium text-stone-700 hover:bg-orange-100/60 hover:text-red-600"
                        )}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/sign-up"
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "bg-red-600 font-semibold text-white shadow-sm hover:bg-red-700"
                        )}
                    >
                        Sign Up
                    </Link>
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
                        <SheetContent side="right" className="w-72 bg-[#FFFBEB]">
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
                                    <SheetClose
                                        render={
                                            <Link
                                                href="/sign-in"
                                                className={cn(
                                                    buttonVariants({ variant: "outline" }),
                                                    "w-full border-orange-200 text-stone-800 hover:bg-orange-100/60"
                                                )}
                                            />
                                        }
                                    >
                                        Sign In
                                    </SheetClose>
                                    <SheetClose
                                        render={
                                            <Link
                                                href="/sign-up"
                                                className={cn(
                                                    buttonVariants({ variant: "default" }),
                                                    "w-full bg-red-600 text-white hover:bg-red-700"
                                                )}
                                            />
                                        }
                                    >
                                        Sign Up
                                    </SheetClose>
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