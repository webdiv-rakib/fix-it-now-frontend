'use client'

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cancelBookingAction } from "../_actions/bookingActions";


interface CancelBookingButtonProps {
    bookingId: string;
    status: string;
}

export default function CancelBookingButton({
    bookingId,
    status,
}: CancelBookingButtonProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const normalizedStatus = (status || "").toUpperCase();

    // Status Validation Rule from Assignment 5:
    // Visible/cancellable ONLY BEFORE work starts (REQUESTED, PENDING, ACCEPTED).
    // CANNOT be cancelled if IN_PROGRESS, COMPLETED, CANCELLED, or DECLINED.
    const isCancellable =
        normalizedStatus === "REQUESTED" ||
        normalizedStatus === "PENDING" ||
        normalizedStatus === "ACCEPTED";

    if (!isCancellable) {
        return null;
    }

    const handleCancel = async () => {
        setLoading(true);
        const res = await cancelBookingAction(bookingId);
        setLoading(false);
        setOpen(false);

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    disabled={loading}
                    className="h-8 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs font-semibold gap-1.5 transition-colors"
                >
                    {loading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <XCircle className="h-3.5 w-3.5" />
                    )}
                    <span>Cancel Booking</span>
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-card border-border/80 text-foreground">
                <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground text-xs">
                        Are you sure you want to cancel this booking? This will remove the scheduled slot and inform the technician.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="text-xs">Keep Booking</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleCancel}
                        disabled={loading}
                        className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                    >
                        {loading ? "Cancelling..." : "Confirm Cancel"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}