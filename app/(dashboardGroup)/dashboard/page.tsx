/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getUserBookings } from "../_actions/getUserBookings";
import CustomerBookingCard from "../_components/CustomerBookingCard";


export default async function CustomerBookingsPage() {
    const res = await getUserBookings();
    const bookings = Array.isArray(res?.data) ? res.data : [];

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        My <span className="text-amber-400">Bookings</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Track technician responses, acceptances, and payments.
                    </p>
                </div>
                <Badge variant="outline" className="border-border/70 text-xs">
                    {bookings.length} Total
                </Badge>
            </div>

            {bookings.length === 0 ? (
                <Card className="border-dashed border-border/70 bg-card/40 p-12 text-center">
                    <p className="text-sm text-muted-foreground">You have no active bookings.</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking: any) => (
                        <CustomerBookingCard key={booking.bookingId} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
}