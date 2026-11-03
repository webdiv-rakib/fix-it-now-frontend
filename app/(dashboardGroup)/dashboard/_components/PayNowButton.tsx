/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initiatePaymentAction } from "../../_actions/initiatePaymentAction";


interface PayNowButtonProps {
    bookingId: string;
}

export default function PayNowButton({ bookingId }: PayNowButtonProps) {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        try {
            setLoading(true);
            const res = await initiatePaymentAction(bookingId);

            // Support common backend response structures: res.data.paymentUrl, res.data.url, or res.data.checkoutUrl
            const checkoutUrl =
                res?.data?.paymentUrl ||
                res?.data?.url ||
                res?.data?.sessionUrl ||
                res?.data?.checkoutUrl;

            if ((res?.success || res?.statusCode === 200) && checkoutUrl) {
                toast.loading("Redirecting to Stripe secure checkout...");
                // Redirect browser directly to Stripe Checkout
                window.location.href = checkoutUrl;
            } else {
                toast.error(res?.message || "Failed to initiate payment session");
                setLoading(false);
            }
        } catch (err: any) {
            toast.error(err?.message || "Something went wrong initiating payment");
            setLoading(false);
        }
    };

    return (
        <Button
            size="sm"
            onClick={handlePay}
            disabled={loading}
            className="h-8 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs gap-1.5 shadow-sm shadow-amber-400/20"
        >
            {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
                <CreditCard className="h-3.5 w-3.5" />
            )}
            <span>{loading ? "Preparing Checkout..." : "Pay Now"}</span>
        </Button>
    );
}