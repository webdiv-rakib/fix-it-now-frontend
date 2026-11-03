/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import CancelBookingButton from "../dashboard/_components/CancelBookingButton";
import PayNowButton from "../dashboard/_components/PayNowButton";
import LeaveReviewButton from "@/app/(publicGroup)/_components/review/LeaveReviewButton";

export default function CustomerBookingCard({ booking }: { booking: any }) {
    const status = (booking.status || "").toUpperCase();
    const bookingId = booking.bookingId || booking.id;
    const serviceId = booking.serviceId || booking.service?.serviceId || booking.service?.id;
    const serviceName = booking.service?.name || "Service";
    const hasReview = Boolean(booking.review || (Array.isArray(booking.reviews) && booking.reviews.length > 0));

    return (
        <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur p-5 space-y-4">
            {/* Top Header: Service Name, Technician, Price, Status Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h3 className="font-bold text-base text-foreground">
                        {serviceName}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        Specialist: <span className="text-foreground font-medium">{booking.technician?.user?.name || booking.technician?.name || "Assigned Specialist"}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-foreground">
                        ${booking.service?.price || booking.totalPrice}
                    </span>
                    <Badge
                        className={`text-[10px] font-bold ${status === "REQUESTED" || status === "PENDING"
                            ? "bg-amber-400/10 text-amber-400 border border-amber-400/30"
                            : status === "ACCEPTED"
                                ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                                : status === "PAID"
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                                    : status === "IN_PROGRESS"
                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                        : status === "COMPLETED"
                                            ? "bg-zinc-500/10 text-zinc-400 border border-zinc-500/30"
                                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                            }`}
                    >
                        {status}
                    </Badge>
                </div>
            </div>

            {/* Date & Location Details */}
            <div className="text-xs text-muted-foreground flex flex-wrap gap-4 pt-2 border-t border-border/40">
                <span>📅 Scheduled: <strong className="text-foreground">{new Date(booking.scheduleDate || booking.createdAt).toLocaleDateString()}</strong></span>
                {booking.timeSlot && <span>⏰ Slot: <strong className="text-foreground">{booking.timeSlot}</strong></span>}
            </div>

            {/* Action Footer: Pay Now, Leave Review, or Cancel */}
            <div className="flex items-center justify-end gap-2 pt-2">
                {/* 1. Direct Stripe Checkout Trigger when ACCEPTED */}
                {status === "ACCEPTED" && (
                    <PayNowButton bookingId={bookingId} />
                )}

                {/* 2. Customer Feedback & Rating Modal when COMPLETED */}
                {status === "COMPLETED" && (
                    <LeaveReviewButton
                        bookingId={bookingId}
                        serviceId={serviceId}
                        serviceName={serviceName}
                        hasReview={hasReview}
                    />
                )}

                {/* 3. Conditional Cancellation prior to IN_PROGRESS */}
                <CancelBookingButton bookingId={bookingId} status={status} />
            </div>
        </div>
    );
}