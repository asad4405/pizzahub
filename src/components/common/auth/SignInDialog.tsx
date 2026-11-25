import { Pizza, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const SignInDialog = ({
    triggerClassName,
    label = "Sign In",
}: {
    triggerClassName?: string;
    label?: string;
}) => {
    return (
        <Dialog>
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
                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 w-full gap-2.5 border-orange-200 bg-amber-50/40 font-semibold text-stone-800 hover:bg-orange-100/60"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continue with Google
                    </Button>

                    <div className="relative flex items-center justify-center">
                        <Separator className="bg-orange-100" />
                        <span className="absolute bg-white px-3 text-xs font-medium uppercase text-stone-400">
                            or with email
                        </span>
                    </div>

                    <form className="space-y-4">
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
                            className="h-11 w-full cursor-pointer bg-red-600 text-base font-semibold text-white shadow-sm hover:bg-red-700"
                        >
                            Sign In
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SignInDialog;