'use client'

import { useState } from "react";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateUserStatusAction } from "../../_actions/adminActions";


export default function UserStatusToggle({
    userId,
    currentStatus,
}: {
    userId: string;
    currentStatus: string;
}) {
    const [loading, setLoading] = useState(false);
    const isBanned = (currentStatus || "").toUpperCase() === "BANNED";

    const handleToggle = async () => {
        setLoading(true);
        const nextStatus = isBanned ? "ACTIVE" : "BANNED";
        await updateUserStatusAction(userId, nextStatus);
        setLoading(false);
    };

    return (
        <Button
            size="sm"
            variant="outline"
            disabled={loading}
            onClick={handleToggle}
            className={`h-7 px-2.5 text-[11px] font-semibold gap-1.5 transition-all ${isBanned
                    ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                    : "border-rose-500/40 text-rose-400 hover:bg-rose-500/10"
                }`}
        >
            {loading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
            ) : isBanned ? (
                <>
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Unban User</span>
                </>
            ) : (
                <>
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Ban User</span>
                </>
            )}
        </Button>
    );
}