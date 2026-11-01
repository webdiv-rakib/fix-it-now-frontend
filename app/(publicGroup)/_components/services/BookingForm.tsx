'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBooking } from "../../_actions/createBooking";

interface BookingFormProps {
  serviceId: string;
  price: number;
}

export default function BookingForm({ serviceId, price }: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    scheduleDate: "",
    serviceAddress: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await createBooking({
      serviceId,
      scheduleDate: formData.scheduleDate,
      serviceAddress: formData.serviceAddress,
      notes: formData.notes,
    });

    setLoading(false);

    if (res?.success) {
      // Backend returns created booking object
      const bookingId = res?.data?.bookingId || res?.data?.id;
      router.push(`/dashboard/bookings?new=${bookingId}`);
    } else {
      setError(res?.message || "Failed to create booking. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* 1. Schedule Date & Time */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Calendar className="h-3.5 w-3.5 text-amber-400" />
          Schedule Date & Time
        </label>
        <Input
          type="datetime-local"
          required
          value={formData.scheduleDate}
          onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
          className="border-border/60 text-xs"
        />
      </div>

      {/* 2. Service Address */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          Service Address
        </label>
        <Input
          type="text"
          required
          placeholder="e.g. 123 Elm Street, Apt 4B"
          value={formData.serviceAddress}
          onChange={(e) => setFormData({ ...formData, serviceAddress: e.target.value })}
          className="border-border/60 text-xs"
        />
      </div>

      {/* 3. Notes */}
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <FileText className="h-3.5 w-3.5 text-amber-400" />
          Special Notes (Optional)
        </label>
        <Input
          type="text"
          placeholder="e.g. Please call 10 minutes before arrival."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="border-border/60 text-xs"
        />
      </div>

      {/* 4. Price Summary */}
      <div className="space-y-1.5 rounded-xl border border-border/50 bg-background/50 p-3 text-xs">
        <div className="flex justify-between text-muted-foreground">
          <span>Service Fee</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between border-t border-border/50 pt-1.5 font-bold text-foreground">
          <span>Total</span>
          <span className="text-amber-400">${price}</span>
        </div>
      </div>

      {/* 5. Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="h-10 w-full gap-2 bg-amber-400 text-xs font-bold text-slate-950 shadow-md shadow-amber-400/20 hover:bg-amber-300"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Creating Booking...</span>
          </>
        ) : (
          <span>Book Now</span>
        )}
      </Button>
    </form>
  );
}