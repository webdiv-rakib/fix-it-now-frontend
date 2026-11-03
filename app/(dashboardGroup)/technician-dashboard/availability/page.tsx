import Link from "next/link";
import { getTechnicianProfile } from "../_actions/availabilityActions";
import AvailabilityScheduler from "../_components/AvailabilityScheduler";
import { CalendarDays, Wrench } from "lucide-react";

export default async function TechnicianAvailabilityPage() {
    const profileRes = await getTechnicianProfile();
    const availableSlots: string[] = profileRes?.data?.availableSlots || [];

    return (
        <div className="mx-auto max-w-6xl px-4 py-8">
            {/* <div className="flex items-center gap-2 border-b border-border/50 pb-4 mb-6">
                <Link
                    href="/technician-dashboard"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-amber-400/40 hover:text-foreground transition-all"
                >
                    <Wrench className="h-3.5 w-3.5 text-amber-400" />
                    <span>Assigned Bookings</span>
                </Link>

                <Link
                    href="/technician-dashboard/availability"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-sm shadow-amber-400/20"
                >
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>Manage Available Slots</span>
                </Link>
            </div> */}
            <AvailabilityScheduler initialSlots={availableSlots} />
        </div>
    );
}