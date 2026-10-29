/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from "@/components/ui/badge";
import { Service, ServiceCard } from "../_components/services/ServiceCard";
import { getAllServices } from "../_actions/getAllServices";

export default async function ServicesPage() {
    const services = await getAllServices();
    // const serviceList: Service[] = services?.data || [];
    if (!services.success || !services.data.length) {
        return (
            <p className="text-center text-muted-foreground">No services found.</p>
        )
    }
    return (
        <div className="min-h-screen pb-24 px-10">
            {/* 1. Header Banner */}
            <section className="relative border-b border-border/50 bg-card/30 py-12 md:py-16 backdrop-blur">
                <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[550px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3 text-center">
                    <Badge
                        variant="outline"
                        className="border-amber-400/30 bg-amber-400/10 text-amber-400 font-semibold px-3 py-1"
                    >
                        FixItNow Catalog
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                        Explore All <span className="text-amber-400">Services</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
                        Transparent pricing, certified local experts, and guaranteed workmanship on every repair.
                    </p>
                </div>
            </section>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    services.data.map((service: Service) => (
                        <ServiceCard key={service.serviceId} service={service} />
                    ))
                }
            </div>
        </div>
    );
}
