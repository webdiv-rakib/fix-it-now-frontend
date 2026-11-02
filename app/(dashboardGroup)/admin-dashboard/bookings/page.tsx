/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminBookingsAction } from "../../_actions/adminActions";


export default async function AdminBookingsPage() {
    const res = await getAdminBookingsAction();
    const bookings = Array.isArray(res?.data) ? res.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-foreground">All Bookings</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Track all orders across pending, in-progress, and completed states.
                    </p>
                </div>
                <Badge variant="outline" className="border-border/70 text-xs">
                    Total: {bookings.length}
                </Badge>
            </div>

            <Card className="border-border/70 bg-card/60 backdrop-blur overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground font-semibold">
                            <tr>
                                <th className="py-3 px-4">Booking ID</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Technician</th>
                                <th className="py-3 px-4">Service</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Scheduled Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40 text-foreground">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((b: any) => {
                                    const id = b.bookingId || b.id;
                                    const status = (b.status || "").toUpperCase();

                                    return (
                                        <tr key={id} className="hover:bg-muted/20 transition-colors">
                                            <td className="py-3 px-4 font-mono font-bold text-[11px]">
                                                #{id?.slice(0, 8)}
                                            </td>
                                            <td className="py-3 px-4 font-medium">
                                                {b.customer?.name || b.user?.name || "Customer"}
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground">
                                                {b.technician?.user?.name || b.technician?.name || "Unassigned"}
                                            </td>
                                            <td className="py-3 px-4 font-semibold">{b.service?.name}</td>
                                            <td className="py-3 px-4 font-black">${b.service?.price}</td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    className={`text-[9px] font-bold ${status === "PENDING"
                                                            ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                                                            : status === "COMPLETED"
                                                                ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                                                                : status === "IN_PROGRESS" || status === "PAID"
                                                                    ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                                                                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                                        }`}
                                                >
                                                    {status}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground">
                                                {new Date(b.scheduleDate || b.createdAt).toLocaleDateString()}
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
    );
}