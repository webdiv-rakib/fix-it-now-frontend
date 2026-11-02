/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Wrench,
    LayoutDashboard,
    Settings,
    LogOut,
    User,
    Menu,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/logout";
import { toast } from "sonner";

type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        profile: {
            userId: string;
            name: string;
            email: string;
            role: string;
            phone: string;
            address: string;
            status: string;
            createdAt: string;
            updatedAt: string;
            technicianProfile: null | any;
        };
    };
};

type NavBarProps = {
    user: IUser;
};

export default function NavBar({ user }: NavBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Technicians", href: "/technicians" },
        { name: "How It Works", href: "/#how-it-works" },
    ];

    const handleUserMenuAction = async (action: string) => {
        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully");
            setMobileOpen(false);
            router.push("/login");
        }
    };

    const role = user?.data?.profile?.role?.toUpperCase();
    const dashboardHref =
        role === "ADMIN"
            ? "/admin-dashboard"
            : role === "TECHNICIAN"
                ? "/technician-dashboard"
                : "/dashboard";

    const dashboardLabel =
        role === "ADMIN"
            ? "Admin Portal"
            : role === "TECHNICIAN"
                ? "Specialist Hub"
                : "My Dashboard";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left: Brand Logo & Mobile Trigger */}
                <div className="flex items-center gap-3">
                    {/* Mobile Hamburger Drawer */}
                    <div className="md:hidden">
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-foreground">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 bg-card/95 backdrop-blur-xl border-border/80 p-6 flex flex-col justify-between">
                                <div className="space-y-6">
                                    <SheetHeader className="text-left">
                                        <SheetTitle className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black">
                                                <Wrench className="h-4 w-4" />
                                            </div>
                                            <span className="font-extrabold text-base tracking-tight text-foreground">
                                                FixIt<span className="text-amber-400">Now</span>
                                            </span>
                                        </SheetTitle>
                                    </SheetHeader>

                                    {/* Mobile Navigation Links */}
                                    <nav className="flex flex-col space-y-1">
                                        {navLinks.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${isActive
                                                        ? "bg-amber-400 text-slate-950 font-bold"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                        }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            );
                                        })}
                                    </nav>

                                    {/* Dashboard link for logged-in user in mobile menu */}
                                    {user?.success && (
                                        <div className="pt-2 border-t border-border/60">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground px-3 mb-1">
                                                Portal Navigation
                                            </p>
                                            <Link
                                                href={dashboardHref}
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                                            >
                                                <LayoutDashboard className="h-4 w-4 text-amber-400" />
                                                <span>{dashboardLabel}</span>
                                            </Link>
                                            <Link
                                                href="/settings"
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
                                            >
                                                <Settings className="h-4 w-4 text-muted-foreground" />
                                                <span>Settings</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Bottom User Status / Auth Action */}
                                <div className="pt-4 border-t border-border/60">
                                    {user?.success ? (
                                        <div className="space-y-3">
                                            <div className="px-2">
                                                <p className="text-sm font-bold text-foreground truncate">
                                                    {user?.data?.profile?.name || "User"}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {user?.data?.profile?.email}
                                                </p>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleUserMenuAction("logout")}
                                                className="w-full justify-center text-xs h-9 gap-2"
                                            >
                                                <LogOut className="h-3.5 w-3.5" />
                                                <span>Log out</span>
                                            </Button>
                                        </div>
                                    ) : (
                                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                                            <Button className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs h-9">
                                                Log in
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Brand Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-md shadow-amber-500/20">
                            <Wrench className="h-5 w-5 fill-slate-950" />
                        </div>
                        <span className="text-xl font-black tracking-tight text-foreground">
                            FixIt<span className="text-amber-500">Now</span>
                        </span>
                    </Link>
                </div>

                {/* Center Desktop Navigation Links */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right: Desktop & Mobile Avatar / Login Trigger */}
                <div className="flex items-center gap-3">
                    {user?.success ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-card/60 transition-all hover:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/30">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-amber-400/10 text-xs font-bold text-amber-500 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-52 rounded-xl border border-border/80 bg-card/95 p-1.5 backdrop-blur-xl shadow-xl shadow-black/10"
                            >
                                <DropdownMenuLabel className="p-2 font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-semibold text-foreground leading-none">
                                            {user?.data?.profile?.name || "User Name"}
                                        </p>
                                        <p className="text-xs text-muted-foreground leading-none truncate">
                                            {user?.data?.profile?.email || "example@gmail.com"}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="bg-border/60" />

                                <DropdownMenuItem asChild>
                                    <Link
                                        href={dashboardHref}
                                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium hover:text-amber-500"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>{dashboardLabel}</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/settings"
                                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium hover:text-amber-500"
                                    >
                                        <Settings className="h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-border/60" />

                                <DropdownMenuItem
                                    className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10 focus:text-rose-500 transition-colors"
                                    onClick={async () => {
                                        handleUserMenuAction("logout");
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">
                                Log in
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}