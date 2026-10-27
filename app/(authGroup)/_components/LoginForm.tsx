'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { loginAction } from "../_actions/loginAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter();
    const [state, action, pending] = useActionState(loginAction, false);
    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || 'Login Successful')
            router.push('/dashboard')
        }
        if (!state.success) {
            toast.error(state.message || 'Login Failed')
        }
    }, [state,router])
    return (
        <Card className="border-border/60 bg-card/60 backdrop-blur-xl shadow-xl shadow-black/5">
            <CardContent className="p-6 sm:p-8">
                <form action={action} className="space-y-5">
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label
                                htmlFor="password"
                                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                            >
                                Password
                            </Label>
                            <a
                                href="#"
                                className="text-xs font-medium text-amber-500 hover:text-amber-400 hover:underline transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
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

                    {/* Action Button */}
                    <Button
                        type="submit"
                        className="w-full h-11 font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 active:scale-[0.99] rounded-lg mt-2 group"
                    >
                        {
                            pending ? 'Submitting...' : 'Login'
                        }
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>

                    {/* Divider & Switch Route */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/60" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground font-medium">Or</span>
                        </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <a href="/register" className="font-semibold text-amber-500 hover:text-amber-400 hover:underline">
                            Create an account
                        </a>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm