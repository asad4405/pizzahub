import Link from "next/link";
import { Pizza, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SignInDialog from "./auth/SignInDialog";
import SignUpDialog from "./auth/SignUpDialog";

const Footer = () => {
    return (
        <footer className="border-t border-orange-200/80 bg-stone-900 text-stone-300">
            <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white">
                                <Pizza className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-white">
                                Pizza<span className="text-red-500">Hub</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-stone-400">
                            Your neighborhood pizza ordering and delivery marketplace.
                            Connecting hungry pizza fans with verified local kitchens every
                            day.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <Link
                                href="https://x.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-300 transition-colors hover:bg-red-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="h-4 w-4 fill-current"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-300 transition-colors hover:bg-red-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="h-4 w-4 fill-current"
                                >
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-300 transition-colors hover:bg-red-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="h-4 w-4 fill-current"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Quick Links
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-red-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse-menu"
                                    className="transition-colors hover:text-red-400"
                                >
                                    Browse Menu
                                </Link>
                            </li>
                            <li>
                            <SignInDialog
                                label="Sign In"
                                triggerClassName="cursor-pointer transition-colors hover:text-red-400"
                            />
                            </li>
                            <li>
                            <SignUpDialog
                                label="Sign Up"
                                triggerClassName="cursor-pointer transition-colors hover:text-red-400"
                            />
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Popular Categories
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <Link
                                    href="/browse-menu?category=Classic+Pizzas"
                                    className="transition-colors hover:text-red-400"
                                >
                                    Classic Pizzas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse-menu?category=Vegetarian+Pizzas"
                                    className="transition-colors hover:text-red-400"
                                >
                                    Vegetarian Pizzas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse-menu?category=Meat+Lovers"
                                    className="transition-colors hover:text-red-400"
                                >
                                    Meat Lovers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/browse-menu?category=Specialty+%2F+Gourmet+Pizzas"
                                    className="transition-colors hover:text-red-400"
                                >
                                    Specialty &amp; Gourmet
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                            Contact Us
                        </h3>
                        <ul className="mt-4 space-y-3 text-sm text-stone-400">
                            <li className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                                <span>124 Crust Avenue, Mirpur 2, Dhaka 1216</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="h-4 w-4 shrink-0 text-red-500" />
                                <span>+880 1700-000000</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail className="h-4 w-4 shrink-0 text-red-500" />
                                <span>support@pizzahub.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-stone-800" />

                <div className="flex flex-col items-center justify-between gap-4 text-xs text-stone-500 sm:flex-row">
                    <p>&copy; 2026 PizzaHub. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/browse-menu" className="hover:text-stone-300">
                            Menu Policy
                        </Link>
                        <Link href="/sign-up" className="hover:text-stone-300">
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;