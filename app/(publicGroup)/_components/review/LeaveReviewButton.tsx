'use client'

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewModal from "./ReviewModal";

interface LeaveReviewButtonProps {
    bookingId: string;
    serviceId: string;
    serviceName: string;
    hasReview?: boolean;
}

export default function LeaveReviewButton({
    bookingId,
    serviceId,
    serviceName,
    hasReview = false,
}: LeaveReviewButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [reviewed, setReviewed] = useState(hasReview);

    if (reviewed) {
        return (
            <Button
                size="sm"
                disabled
                variant="outline"
                className="h-8 border-border/60 text-muted-foreground text-xs font-semibold gap-1.5"
            >
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>Reviewed</span>
            </Button>
        );
    }

    return (
        <>
            <Button
                size="sm"
                onClick={() => setIsOpen(true)}
                className="h-8 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs gap-1.5 shadow-sm shadow-amber-400/20"
            >
                <Star className="h-3.5 w-3.5 fill-slate-950" />
                <span>Leave Review</span>
            </Button>

            <ReviewModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                bookingId={bookingId}
                serviceId={serviceId}
                serviceName={serviceName}
                onSuccess={() => {
                    setReviewed(true);
                }}
            />
        </>
    );
}