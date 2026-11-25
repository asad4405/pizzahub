"use client";

import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Pizza, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { signIn } from "@/lib/auth-client";

type SignInState = {
    success: boolean;
    message: string;
};

const initialState: SignInState = {
    success: false,
    message: "",
};

const SignInDialog = ({
    triggerClassName,
    label = "Sign In",
}: {
    triggerClassName?: string;
    label?: string;
}) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const handleSignIn = async (
        _prevState: SignInState,
        formData: FormData
    ): Promise<SignInState> => {
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const currentPage = String(formData.get("pathname") || pathname || "/");

        if (!email || !password) {
            const msg = "Email and password are required.";
            toast.error(msg, { position: "bottom-right" });
            return {
                success: false,
                message: msg,
            };
        }

        const { error } = await signIn.email({
            email,
            password,
            callbackURL: currentPage,
        });

        if (error) {
            const msg = error.message || "Invalid email or password.";
            toast.error(msg, { position: "bottom-right" });
            return {
                success: false,
                message: msg,
            };
        }

        toast.success("Signed in successfully!", {
            position: "bottom-right",
        });
        setOpen(false);

        return {
            success: true,
            message: "Signed in successfully.",
        };
    };

    const [, formAction, isPending] = useActionState(handleSignIn, initialState);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={triggerClassName}>{label}</DialogTrigger>
            <DialogContent className="max-w-md border-orange-200/80 bg-white p-6 sm:rounded-2xl">
                <DialogHeader className="space-y-2 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                        <Pizza className="h-6 w-6" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-extrabold tracking-tight text-stone-900">
                        Welcome Back to Pizza<span className="text-red-600">Hub</span>
                    </DialogTitle>
                    <DialogDescription className="text-center text-stone-600">
                        Sign in to order fresh pizza or manage your kitchen dashboard
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 space-y-4">
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="pathname" value={pathname} />

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="signin-email"
                                className="font-semibold text-stone-800"
                            >
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
                                <Input
                                    id="signin-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="h-11 border-orange-200 pl-10 focus-visible:ring-red-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="signin-password"
                                className="font-semibold text-stone-800"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
                                <Input
                                    id="signin-password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    className="h-11 border-orange-200 pl-10 focus-visible:ring-red-600"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="h-11 w-full cursor-pointer bg-red-600 text-base font-semibold text-white shadow-sm hover:bg-red-700"
                        >
                            {isPending ? "Signing In..." : "Sign In"}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SignInDialog;