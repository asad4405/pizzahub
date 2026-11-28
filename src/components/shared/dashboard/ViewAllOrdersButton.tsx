"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ViewAllOrdersButton = ({ href }: { href: string }) => {
    const router = useRouter();

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => router.push(href)}
            className="h-9 rounded-xl border-orange-200 bg-white px-3.5 text-xs font-bold text-stone-800 hover:border-red-500 hover:bg-amber-50 hover:text-red-600"
        >
            View All
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </Button>
    );
};

export default ViewAllOrdersButton;