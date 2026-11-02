'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    CalendarCheck2,
    FolderTree,
    PlusCircle,
    ShieldCheck
} from "lucide-react";

const navItems = [
    {
        label: "Overview",
        href: "/admin-dashboard",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        label: "Users & Status",
        href: "/admin-dashboard/users",
        icon: Users,
    },
    {
        label: "All Bookings",
        href: "/admin-dashboard/bookings",
        icon: CalendarCheck2,
    },
    {
        label: "Categories",
        href: "/admin-dashboard/categories",
        icon: FolderTree,
        exact: true,
    },
    {
        label: "New Category",
        href: "/admin-dashboard/categories/new",
        icon: PlusCircle,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full md:w-60 shrink-0 space-y-6">
            <div className="flex items-center gap-2.5 px-3">
                <div className="h-9 w-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                    <h2 className="text-sm font-black text-foreground">Admin Portal</h2>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">Control Center</p>
                </div>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const isActive = item.exact
                        ? pathname === item.href
                        : pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${isActive
                                    ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                }`}
                        >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}