"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User,
    Mail,
    Phone,
    Lock,
    ArrowRight,
    UserCheck,
    Wrench,
    CheckCircle2,
} from "lucide-react";
import { registerAction, RegisterState } from "../_actions/registerAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const RegisterForm = () => {
    // Pure UI state to toggle the active tab
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "TECHNICIAN">("CUSTOMER");
    const [state, formAction, pending] = useActionState<RegisterState, FormData>(
        registerAction,
        null
    );
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Registration successful! Please login.");
            router.push("/login");
        } else {
            toast.error(state.message || "Registration failed");
        }
    }, [state, router]);
    return (
        <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-xl shadow-black/5">
            <CardContent className="p-6 sm:p-8">
                <form action={formAction} className="space-y-5">
                    {/* Hidden input to pass role cleanly in FormData later */}
                    <input type="hidden" name="role" value={selectedRole} />

                    {/* Role Selection Tabs */}
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            I want to register as
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setSelectedRole("CUSTOMER")}
                                className={`relative flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-semibold transition-all ${selectedRole === "CUSTOMER"
                                    ? "border-amber-400 bg-amber-400/10 text-amber-500 shadow-sm shadow-amber-400/10"
                                    : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground"
                                    }`}
                            >
                                <UserCheck className="h-4 w-4 shrink-0" />
                                <span>Customer</span>
                                {selectedRole === "CUSTOMER" && (
                                    <CheckCircle2 className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-amber-500" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedRole("TECHNICIAN")}
                                className={`relative flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-sm font-semibold transition-all ${selectedRole === "TECHNICIAN"
                                    ? "border-amber-400 bg-amber-400/10 text-amber-500 shadow-sm shadow-amber-400/10"
                                    : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground"
                                    }`}
                            >
                                <Wrench className="h-4 w-4 shrink-0" />
                                <span>Technician</span>
                                {selectedRole === "TECHNICIAN" && (
                                    <CheckCircle2 className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-amber-500" />
                                )}
                            </button>
                        </div>
                        <p className="text-[11px] text-muted-foreground/80 pt-0.5">
                            {selectedRole === "CUSTOMER"
                                ? "Book verified service experts for home repairs and maintenance."
                                : "List your trade skills, set your schedule, and get client requests."}
                        </p>
                    </div>

                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                            Full Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="pl-10 h-11 bg-background/50 border-input/60 focus-visible:ring-amber-400/30 focus-visible:border-amber-400 transition-all rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Address Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                className="pl-10 h-11 bg-background/50 border-input/60 focus-visible:ring-amber-400/30 focus-visible:border-amber-400 transition-all rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Number Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="phone"
                            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                            Phone Number
                        </Label>
                        <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="pl-10 h-11 bg-background/50 border-input/60 focus-visible:ring-amber-400/30 focus-visible:border-amber-400 transition-all rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="pl-10 h-11 bg-background/50 border-input/60 focus-visible:ring-amber-400/30 focus-visible:border-amber-400 transition-all rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full h-11 font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 active:scale-[0.99] rounded-lg mt-3 group"
                    >
                        {
                            pending ? 'Submitting...' : 'Ceate Account'
                        }
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/60" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground font-medium">Or</span>
                        </div>
                    </div>

                    {/* Route Switch */}
                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-amber-500 hover:text-amber-400 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;