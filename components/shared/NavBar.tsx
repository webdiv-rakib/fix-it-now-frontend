/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from "next/link";
import {
    Wrench,
    LayoutDashboard,
    Settings,
    LogOut,
    User,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { logout } from "@/service/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * {
    "success": true,
    "statusCode": 201,
    "message": "User fetched Successfully",
    "data": {
        "profile": {
            "userId": "628b9f0b-5d54-4fb7-892d-acbb610b2417",
            "name": "anm.rakib",
            "email": "anm.rakib@gmail.com",
            "role": "ADMIN",
            "phone": "01794181719",
            "address": "Pach Elasin,Delduar,Tangail",
            "status": "ACTIVE",
            "createdAt": "2026-10-08T20:25:03.771Z",
            "updatedAt": "2026-10-08T20:27:26.174Z",
            "technicianProfile": null
        }
    }
}
 * 
 * 
 * 
 */
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
        }
    }
}

type NavBarProps = {
    user: IUser;
};

export default function NavBar({ user }: NavBarProps) {
    const router = useRouter()
    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Technicians", href: "/technicians" },
        { name: "How It Works", href: "/#how-it-works" },
    ];

    const handleUserMenuAction = async (action: string) => {

        console.log(`User Menu Action:${action}`)
        if (action === 'logout') {
            await logout();
            toast.success('User Logged Out Successfully');
            router.push('/login')
        }
    }
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-amber-500 to-amber-300 text-slate-950 shadow-md shadow-amber-500/20">
                        <Wrench className="h-5 w-5 fill-slate-950" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-foreground">
                        FixIt<span className="text-amber-500">Now</span>
                    </span>
                </Link>

                {/* Center Navigation Links */}
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

                {/* Avatar Dropdown */}
                <div className="flex items-center gap-3">
                    {
                        user.success ? <DropdownMenu>
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
                                            {user?.data?.profile?.name || 'User Name'}
                                        </p>
                                        <p className="text-xs text-muted-foreground leading-none truncate">
                                            {user?.data?.profile?.email || 'example@gmail.com'}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border/60" />

                                <DropdownMenuItem asChild>
                                    <Link
                                        href="/dashboard"
                                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium hover:text-amber-500"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Dashboard</span>
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
                                        handleUserMenuAction('logout')
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> : <Link href="/login">
                            <Button variant="outline" size="sm">
                                Log in
                            </Button>
                        </Link>
                    }
                </div>

            </div>
        </header>
    );
}