/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic";

import { Calendar, Clock, MapPin, Phone, User, CheckCircle2, CheckCheck, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTechnicianBookings } from "../_actions/technicianBookings";
import StatusActionButton from "../_components/StatusActionButton";
import Link from "next/link";
import { CalendarDays } from "lucide-react";



export default async function TechnicianBookingsPage() {
    const res = await getTechnicianBookings();
    const bookings = Array.isArray(res?.data) ? res.data : [];

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        Assigned <span className="text-amber-400">Bookings</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Review service requests and update booking availability.
                    </p>
                </div>
                <Badge variant="outline" className="w-fit border-border/70 text-xs">
                    Total: {bookings.length}
                </Badge>
            </div>
            <div className="flex items-center gap-2 border-b border-border/50 pb-4">
                <Link
                    href="/technician-dashboard"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-sm shadow-amber-400/20"
                >
                    <Wrench className="h-3.5 w-3.5" />
                    <span>Assigned Bookings</span>
                </Link>

                <Link
                    href="/technician-dashboard/availability"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-amber-400/40 hover:text-foreground transition-all"
                >
                    <CalendarDays className="h-3.5 w-3.5 text-amber-400" />
                    <span>Manage Available Slots</span>
                </Link>
            </div>

            {bookings.length === 0 ? (
                <Card className="border-dashed border-border/70 bg-card/40 p-12 text-center">
                    <p className="text-sm text-muted-foreground">No bookings assigned yet.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {bookings.map((booking: any) => {
                        const rawStatus = (booking.status || "").toUpperCase().replace(/-/g, "_");
                        const isPending = rawStatus === "PENDING";
                        const isAccepted = rawStatus === "ACCEPTED";
                        const isPaid = rawStatus === "PAID";
                        const isInProgress = rawStatus === "IN_PROGRESS";
                        const isCompleted = rawStatus === "COMPLETED";
                        const targetId = booking.bookingId || booking.id;

                        return (
                            <Card
                                key={targetId}
                                className="border-border/70 bg-card/60 backdrop-blur transition-all hover:border-amber-400/40"
                            >
                                <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    {/* Left: Customer & Service Info */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                className={`text-[10px] font-bold ${isPending
                                                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                                                    : isAccepted
                                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                                        : isPaid
                                                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                                            : isInProgress
                                                                ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                                                                : isCompleted
                                                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                                                    }`}
                                            >
                                                {isPending && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                                                {isAccepted && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                                {isInProgress && <Wrench className="h-3 w-3 mr-1 animate-pulse" />}
                                                {isCompleted && <CheckCheck className="h-3 w-3 mr-1" />}
                                                {isInProgress ? "IN PROGRESS" : booking.status}
                                            </Badge>
                                            <span className="text-xs font-semibold text-muted-foreground">
                                                #{targetId?.slice(0, 8)}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-foreground">
                                            {booking.service?.name}
                                        </h3>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5 text-amber-400" />
                                                <span>{booking.user?.name || "Customer"}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone className="h-3.5 w-3.5 text-amber-400" />
                                                <span>{booking.user?.phone || "No phone provided"}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                                                <span>{new Date(booking.scheduleDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                                                <span className="truncate max-w-50">{booking.serviceAddress}</span>
                                            </div>
                                        </div>

                                        {booking.notes && (
                                            <p className="text-xs bg-muted/40 p-2 rounded border border-border/50 text-muted-foreground">
                                                <strong className="text-foreground">Note:</strong> {booking.notes}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right: Price & Quick Action */}
                                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-border/50 pt-3 md:pt-0 md:pl-6 gap-3 shrink-0">
                                        <div>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Fee</span>
                                            <p className="text-lg font-black text-foreground">
                                                ${booking.service?.price}
                                            </p>
                                        </div>

                                        <StatusActionButton
                                            bookingId={targetId}
                                            currentStatus={booking.status}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}