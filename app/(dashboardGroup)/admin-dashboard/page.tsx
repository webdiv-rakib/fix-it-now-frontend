/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic";

import {
    Users,
    Wrench,
    CalendarCheck2,
    DollarSign,
    ArrowUpRight,
    Clock,
    ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminOverviewAction } from "../_actions/adminActions";


export default async function AdminDashboardPage() {
    const res = await getAdminOverviewAction();
    const data = res?.data || {
        metrics: {
            totalCustomers: 0,
            totalTechnicians: 0,
            totalBookings: 0,
            completedJobs: 0,
            totalRevenue: 0,
        },
        recentBookings: [],
    };

    const { metrics, recentBookings } = data;

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Admin <span className="text-amber-400">Control Center</span>
                        </h1>
                        <Badge className="bg-amber-400/10 text-amber-400 border-amber-400/30 gap-1 text-[11px]">
                            <ShieldCheck className="h-3 w-3" />
                            Super Admin
                        </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Real-time analytics, user accounts, and booking transactions across FixItNow.
                    </p>
                </div>
            </div>

            {/* 4 Primary KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-border/70 bg-card/60 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-foreground">${metrics.totalRevenue}</div>
                        <p className="text-[11px] text-muted-foreground mt-1">From {metrics.completedJobs} completed jobs</p>
                    </CardContent>
                </Card>

                <Card className="border-border/70 bg-card/60 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground">Total Bookings</CardTitle>
                        <CalendarCheck2 className="h-4 w-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-foreground">{metrics.totalBookings}</div>
                        <p className="text-[11px] text-muted-foreground mt-1">{metrics.completedJobs} marked finished</p>
                    </CardContent>
                </Card>

                <Card className="border-border/70 bg-card/60 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground">Specialists</CardTitle>
                        <Wrench className="h-4 w-4 text-sky-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-foreground">{metrics.totalTechnicians}</div>
                        <p className="text-[11px] text-muted-foreground mt-1">Active verified technicians</p>
                    </CardContent>
                </Card>

                <Card className="border-border/70 bg-card/60 backdrop-blur">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold text-muted-foreground">Registered Customers</CardTitle>
                        <Users className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black text-foreground">{metrics.totalCustomers}</div>
                        <p className="text-[11px] text-muted-foreground mt-1">Platform customer accounts</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Recent Bookings Activity</h2>
                </div>

                <Card className="border-border/70 bg-card/60 backdrop-blur overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground font-semibold">
                                <tr>
                                    <th className="py-3 px-4">Booking ID</th>
                                    <th className="py-3 px-4">Customer</th>
                                    <th className="py-3 px-4">Service</th>
                                    <th className="py-3 px-4">Price</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40 text-foreground">
                                {recentBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                            No platform bookings recorded yet.
                                        </td>
                                    </tr>
                                ) : (
                                    recentBookings.map((b: any) => {
                                        const status = (b.status || "").toUpperCase();
                                        return (
                                            <tr key={b.bookingId || b.id} className="hover:bg-muted/20 transition-colors">
                                                <td className="py-3 px-4 font-mono font-bold text-[11px]">
                                                    #{(b.bookingId || b.id)?.slice(0, 8)}
                                                </td>
                                                <td className="py-3 px-4">{b.user?.name || "Customer"}</td>
                                                <td className="py-3 px-4 font-medium">{b.service?.name}</td>
                                                <td className="py-3 px-4 font-bold">${b.service?.price}</td>
                                                <td className="py-3 px-4">
                                                    <Badge
                                                        className={`text-[9px] font-bold ${status === "PENDING"
                                                            ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                                                            : status === "COMPLETED"
                                                                ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                                                                : status === "PAID" || status === "IN_PROGRESS"
                                                                    ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                                                                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                                            }`}
                                                    >
                                                        {status}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4 text-muted-foreground">
                                                    {new Date(b.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}