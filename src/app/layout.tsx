import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const Opensens = Open_Sans({
    variable: "--font-open-sans",
});

export const metadata: Metadata = {
    title: "PizzaHub — Hot & Fresh Pizza Delivered to Your Door",
    description:
        "Discover local pizza shops, browse freshly baked menus, and order your favorite pizza online with PizzaHub.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${Opensens.className} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Navbar />
                {children}
                <Footer/>
            </body>
        </html>
    );
}
