'use client'

import { useState } from "react";
import { Check, X, CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { updateBookingStatusAction } from "../_actions/technicianBookings";

export default function StatusActionButton({
    bookingId,
    currentStatus,
}: {
    bookingId: string;
    currentStatus: string;
}) {
    const [loading, setLoading] = useState(false);

    // Normalize status to uppercase without hyphens/spaces (handles "in progress", "IN_PROGRESS", "ACCEPTED", etc.)
    const normalized = (currentStatus || "")
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, "_");

    const handleUpdate = async (status: "ACCEPTED" | "REJECTED" | "COMPLETED") => {
        setLoading(true);
        await updateBookingStatusAction(bookingId, status);
        setLoading(false);
    };

    // 1. Initial State: Customer requested booking
    if (normalized === "PENDING") {
        return (
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    disabled={loading}
                    onClick={() => handleUpdate("ACCEPTED")}
                    className="h-8 gap-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
                >
                    {loading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Check className="h-3.5 w-3.5" />
                    )}
                    Accept
                </Button>

                <Button
                    size="sm"
                    variant="outline"
                    disabled={loading}
                    onClick={() => handleUpdate("REJECTED")}
                    className="h-8 gap-1 border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs"
                >
                    <X className="h-3.5 w-3.5" />
                    Decline
                </Button>
            </div>
        );
    }

    // 2. Finished State: Booking is completed
    if (normalized === "COMPLETED") {
        return (
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs gap-1 py-1">
                <CheckCheck className="h-3.5 w-3.5" />
                Completed
            </Badge>
        );
    }

    // 3. Rejected State
    if (normalized === "REJECTED" || normalized === "CANCELLED") {
        return (
            <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-xs py-1">
                Declined
            </Badge>
        );
    }

    // 4. Active States (IN_PROGRESS, ACCEPTED, PAID): Show "Mark as Completed"
    return (
        <Button
            size="sm"
            disabled={loading}
            onClick={() => handleUpdate("COMPLETED")}
            className="h-8 gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20"
        >
            {loading ? (
                <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Updating...</span>
                </>
            ) : (
                <>
                    <CheckCheck className="h-3.5 w-3.5" />
                    <span>Mark as Completed</span>
                </>
            )}
        </Button>
    );
}