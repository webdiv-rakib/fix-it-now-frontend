'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Clock,
    CheckCircle2,
    CreditCard,
    Calendar,
    MapPin,
    Loader2,
    CheckCheck,
    Wrench,
    XCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initiatePaymentAction } from "../_actions/initiatePaymentAction";

interface CustomerBookingCardProps {
    booking: {
        bookingId: string;
        status: "PENDING" | "ACCEPTED" | "REJECTED" | "PAID" | "IN_PROGRESS" | "COMPLETED";
        scheduleDate: string;
        serviceAddress: string;
        service: {
            name: string;
            price: number;
        };
    };
}

export default function CustomerBookingCard({ booking }: CustomerBookingCardProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Poll for status updates every 5 seconds while waiting for technician confirmation
    useEffect(() => {
        if (booking.status !== "PENDING") return;

        const interval = setInterval(() => {
            router.refresh();
        }, 5000);

        return () => clearInterval(interval);
    }, [booking.status, router]);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        const res = await initiatePaymentAction(booking.bookingId);
        const checkoutUrl = res?.data?.paymentUrl || res?.paymentUrl;

        if (res?.success && checkoutUrl) {
            window.location.href = checkoutUrl;
        } else {
            setLoading(false);
            setError(res?.message || "Failed to start payment session.");
        }
    };

    const isPending = booking.status === "PENDING";
    const isAccepted = booking.status === "ACCEPTED";
    const isPaid = booking.status === "PAID";
    const isInProgress = booking.status === "IN_PROGRESS";
    const isCompleted = booking.status === "COMPLETED";
    const isRejected = booking.status === "REJECTED";

    return (
        <Card className="border-border/70 bg-card/60 backdrop-blur transition-all hover:border-border">
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
                                            : isInProgress
                                                ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                                                : isCompleted
                                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                                }`}
                        >
                            {isPending && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                            {isAccepted && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {isPaid && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {isInProgress && <Wrench className="h-3 w-3 mr-1 animate-pulse" />}
                            {isCompleted && <CheckCheck className="h-3 w-3 mr-1" />}
                            {isRejected && <XCircle className="h-3 w-3 mr-1" />}
                            {isInProgress ? "IN PROGRESS" : booking.status}
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
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/50">
                    <div>
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Total</span>
                        <p className="text-lg font-black text-foreground">${booking.service?.price}</p>
                    </div>

                    {error && <span className="text-[11px] text-rose-400">{error}</span>}

                    {/* 1. Pending Technician Acceptance */}
                    {isPending && (
                        <p className="text-[11px] text-amber-400/90 flex items-center gap-1.5 italic">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Awaiting technician confirmation
                        </p>
                    )}

                    {/* 2. Accepted by Technician -> Trigger Stripe Checkout */}
                    {isAccepted && (
                        <Button
                            size="sm"
                            disabled={loading}
                            onClick={handlePayment}
                            className="h-8 gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    <span>Redirecting...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-3.5 w-3.5" />
                                    <span>Proceed to Pay</span>
                                </>
                            )}
                        </Button>
                    )}

                    {/* 3. Paid & Scheduled */}
                    {isPaid && (
                        <Badge variant="outline" className="text-blue-400 border-blue-500/30 text-xs py-1">
                            Paid & Scheduled
                        </Badge>
                    )}

                    {/* 4. In Progress */}
                    {isInProgress && (
                        <Badge variant="outline" className="text-sky-400 border-sky-500/30 text-xs py-1 gap-1">
                            <Wrench className="h-3 w-3" />
                            Service in Progress
                        </Badge>
                    )}

                    {/* 5. Completed */}
                    {isCompleted && (
                        <Badge variant="outline" className="text-purple-400 border-purple-500/30 text-xs py-1 gap-1">
                            <CheckCheck className="h-3 w-3" />
                            Service Completed
                        </Badge>
                    )}

                    {/* 6. Rejected */}
                    {isRejected && (
                        <p className="text-xs text-rose-400">Declined by specialist</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}