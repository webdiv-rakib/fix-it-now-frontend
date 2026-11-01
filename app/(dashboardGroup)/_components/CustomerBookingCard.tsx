'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle2, XCircle, CreditCard, Calendar, MapPin, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CustomerBookingCardProps {
    booking: {
        bookingId: string;
        status: "PENDING" | "ACCEPTED" | "REJECTED" | "PAID" | "COMPLETED";
        scheduleDate: string;
        serviceAddress: string;
        service: {
            name: string;
            price: number;
        };
    };
}

export default function CustomerBookingCard({ booking: initialBooking }: CustomerBookingCardProps) {
    const router = useRouter();
    const [booking, setBooking] = useState(initialBooking);

    // Poll for status changes while PENDING
    // useEffect(() => {
    //     if (booking.status !== "PENDING") return;

    //     const interval = setInterval(async () => {
    //         router.refresh(); // Refresh Next.js server payload
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [booking.status, router]);

    const isPending = booking.status === "PENDING";
    const isAccepted = booking.status === "ACCEPTED";
    const isPaid = booking.status === "PAID";
    const isRejected = booking.status === "REJECTED";

    return (
        <Card className="border-border/70 bg-card/60 backdrop-blur transition-all">
            <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        {/* Dynamic Status Badge */}
                        <Badge
                            className={`text-[10px] font-bold ${isPending
                                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                                    : isAccepted
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                        : isPaid
                                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                                }`}
                        >
                            {isPending && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                            {isAccepted && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {booking.status}
                        </Badge>

                        <span className="text-xs text-muted-foreground font-semibold">
                            #{booking.bookingId.slice(0, 8)}
                        </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground">
                        {booking.service?.name}
                    </h3>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-amber-400" />
                            {new Date(booking.scheduleDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-amber-400" />
                            {booking.serviceAddress}
                        </span>
                    </div>
                </div>

                {/* Action Button & Payment Trigger */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/50">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Total</span>
                        <p className="text-lg font-black text-foreground">${booking.service?.price}</p>
                    </div>

                    {/* Conditional Action based on state */}
                    {isPending && (
                        <p className="text-[11px] text-amber-400/90 flex items-center gap-1.5 italic">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Awaiting technician confirmation
                        </p>
                    )}

                    {isAccepted && (
                        <Button
                            size="sm"
                            onClick={() => router.push(`/payment/${booking.bookingId}`)}
                            className="h-8 gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                        >
                            <CreditCard className="h-3.5 w-3.5" />
                            <span>Proceed to Pay</span>
                        </Button>
                    )}

                    {isPaid && (
                        <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-xs">
                            Paid & Scheduled
                        </Badge>
                    )}

                    {isRejected && (
                        <p className="text-xs text-rose-400">Declined by specialist</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}