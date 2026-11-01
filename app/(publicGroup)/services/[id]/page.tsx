import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSingleService } from "../../_actions/getSingleService";
import BookingForm from "../../_components/services/BookingForm";

export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await getSingleService(id);

    if (!res?.success || !res?.data) {
        notFound();
    }

    const service = res.data;

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Service Details */}
                <div className="space-y-4 lg:col-span-2">
                    <Badge className="bg-amber-400 font-bold text-slate-950">
                        {service.category?.name || "Service"}
                    </Badge>

                    <h1 className="text-3xl font-extrabold text-foreground">
                        {service.name}
                    </h1>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                    </p>

                    <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                        <span className="text-xs text-muted-foreground">Technician</span>
                        <p className="font-semibold text-foreground">
                            {service.technician?.user?.name || "Assigned Specialist"}
                        </p>
                    </div>
                </div>

                {/* Right Column: Interactive Booking Form */}
                <div>
                    <Card className="border-border/80 bg-card/60 backdrop-blur">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-lg font-bold text-foreground">
                                Book This Service
                            </h2>
                            <BookingForm serviceId={service.serviceId} price={service.price} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}