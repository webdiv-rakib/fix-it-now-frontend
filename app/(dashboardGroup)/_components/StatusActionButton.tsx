'use client'

import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateBookingStatusAction } from "../_actions/technicianBookings";

export default function StatusActionButton({
    bookingId,
    currentStatus,
}: {
    bookingId: string;
    currentStatus: string;
}) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (status: "ACCEPTED" | "REJECTED") => {
        setLoading(true);
        await updateBookingStatusAction(bookingId, status);
        setLoading(false);
    };

    if (currentStatus !== "PENDING") {
        return null;
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                size="sm"
                disabled={loading}
                onClick={() => handleUpdate("ACCEPTED")}
                className="h-8 gap-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
            >
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
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