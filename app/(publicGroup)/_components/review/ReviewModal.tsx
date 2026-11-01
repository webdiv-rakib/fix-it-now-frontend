'use client'

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitReviewAction } from "../../_actions/reviewAction";


interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string;
    serviceId: string;
    serviceName: string;
    onSuccess?: (reviewData: { rating: number; comment: string }) => void;
}

export default function ReviewModal({
    isOpen,
    onClose,
    bookingId,
    serviceId,
    serviceName,
    onSuccess,
}: ReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            setError("Please write a few words about your experience.");
            return;
        }

        setLoading(true);
        setError(null);

        const res = await submitReviewAction({
            bookingId,
            serviceId,
            rating,
            comment,
        });

        if (res?.success) {
            setLoading(false);
            if (onSuccess) {
                onSuccess({ rating, comment });
            }
            onClose();
        } else {
            setLoading(false);
            setError(res?.message || "Could not submit review. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-card border-border/80">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-foreground">
                        Rate & Review Service
                    </DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                        How was your experience with <strong className="text-foreground">{serviceName}</strong>?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* 5-Star Selector */}
                    <div className="flex flex-col items-center justify-center gap-1.5 py-2">
                        <div className="flex items-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const filled = (hoverRating || rating) >= star;
                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            className={`h-7 w-7 transition-colors ${filled
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-muted-foreground/40 hover:text-amber-400/50"
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground">
                            {rating === 5 && "Excellent"}
                            {rating === 4 && "Very Good"}
                            {rating === 3 && "Average"}
                            {rating === 2 && "Poor"}
                            {rating === 1 && "Terrible"}
                        </span>
                    </div>

                    {/* Feedback Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">Your Feedback</label>
                        <Textarea
                            rows={3}
                            placeholder="Tell us what you liked or how the specialist can improve..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="resize-none text-xs"
                        />
                    </div>

                    {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
                </div>

                <DialogFooter className="flex sm:justify-between items-center gap-2 pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        disabled={loading}
                        className="text-xs"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        size="sm"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs gap-1.5 h-8"
                    >
                        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                        Submit Review
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}