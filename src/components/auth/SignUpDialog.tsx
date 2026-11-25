"use client";

import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { Pizza, User, Store, Mail, Lock, ArrowRight } from "lucide-react";
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
import { signUp } from "@/lib/auth-client";

type UserRole = "customer" | "vendor";

type SignUpState = {
    success: boolean;
    message: string;
};

const initialState: SignUpState = {
    success: false,
    message: "",
};

const SignUpDialog = ({
    triggerClassName,
    label = "Sign Up",
}: {
    triggerClassName?: string;
    label?: string;
}) => {
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState<UserRole>("customer");
    const pathname = usePathname();

    const handleSignUp = async (
        _prevState: SignUpState,
        formData: FormData
    ): Promise<SignUpState> => {
        const selectedRole: UserRole =
            String(formData.get("role") || role) === "vendor"
                ? "vendor"
                : "customer";
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const password = String(formData.get("password") || "");
        const currentPage = String(formData.get("pathname") || pathname || "/");

        if (!name || !email || !password) {
            const msg = "All fields are required.";
            toast.error(msg, { position: "bottom-right" });
            return {
                success: false,
                message: msg,
            };
        }

        const signUpPayload: Parameters<typeof signUp.email>[0] & {
            role: UserRole;
        } = {
            name,
            email,
            password,
            callbackURL: currentPage,
            role: selectedRole,
        };

        const { error } = await signUp.email(signUpPayload);

        if (error) {
            const msg = error.message || "Failed to create account.";
            toast.error(msg, { position: "bottom-right" });
            return {
                success: false,
                message: msg,
            };
        }

        toast.success(`Account created as ${selectedRole}!`, {
            position: "bottom-right",
        });
        setOpen(false);
        setRole("customer");

        return {
            success: true,
            message: "Account created successfully.",
        };
    };

    const [, formAction, isPending] = useActionState(handleSignUp, initialState);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={triggerClassName}>{label}</DialogTrigger>
            <DialogContent className="max-h-screen max-w-lg overflow-y-auto border-orange-200/80 bg-white p-6 sm:rounded-2xl">
                <DialogHeader className="space-y-2 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-sm">
                        <Pizza className="h-6 w-6" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-extrabold tracking-tight text-stone-900">
                        Join Pizza<span className="text-red-600">Hub</span> Today
                    </DialogTitle>
                    <DialogDescription className="text-center text-stone-600">
                        Create your account as a pizza lover or a restaurant partner
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-2 space-y-4">
                    <form action={formAction} className="space-y-4">
                        <input type="hidden" name="pathname" value={pathname} />
                        <input type="hidden" name="role" value={role} />

                        <div className="space-y-2">
                            <Label className="font-semibold text-stone-800">
                                Select Account Role
                            </Label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <label
                                    onClick={() => setRole("customer")}
                                    className={`relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${role === "customer"
                                            ? "border-red-600 bg-red-50/60 ring-1 ring-red-600"
                                            : "border-orange-200 bg-amber-50/40 hover:border-red-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="roleOption"
                                        value="customer"
                                        checked={role === "customer"}
                                        onChange={() => setRole("customer")}
                                        className="sr-only"
                                    />
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-stone-900">Customer</p>
                                        <p className="text-xs text-stone-600">
                                            Order hot pizzas nearby
                                        </p>
                                    </div>
                                </label>

                                <label
                                    onClick={() => setRole("vendor")}
                                    className={`relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${role === "vendor"
                                            ? "border-red-600 bg-red-50/60 ring-1 ring-red-600"
                                            : "border-orange-200 bg-amber-50/40 hover:border-red-300"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="roleOption"
                                        value="vendor"
                                        checked={role === "vendor"}
                                        onChange={() => setRole("vendor")}
                                        className="sr-only"
                                    />
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-red-600">
                                        <Store className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-stone-900">Vendor</p>
                                        <p className="text-xs text-stone-600">
                                            Manage menu &amp; orders
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="signup-name"
                                className="font-semibold text-stone-800"
                            >
                                Full Name
                            </Label>
                            <div className="relative">
                                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
                                <Input
                                    id="signup-name"
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    className="h-11 border-orange-200 pl-10 focus-visible:ring-red-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="signup-email"
                                className="font-semibold text-stone-800"
                            >
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
                                <Input
                                    id="signup-email"
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
                                htmlFor="signup-password"
                                className="font-semibold text-stone-800"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-stone-400" />
                                <Input
                                    id="signup-password"
                                    name="password"
                                    type="password"
                                    placeholder="Create a strong password"
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
                            {isPending ? "Creating..." : "Create Account"}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SignUpDialog;