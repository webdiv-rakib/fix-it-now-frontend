import React from "react";
import { Search, SlidersHorizontal, Users, ShieldCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TechniciansProfileCard, { Technician } from "../_components/technicians/TechniciansProfileCard";
import { getAllTechnicians } from "../_actions/getAllTechnicians";

const TechniciansPage = async () => {
    const technicians = await getAllTechnicians();
    return (
        <div className="min-h-screen pb-24">
            {/* 1. Header Banner */}
            <section className="relative border-b border-border/50 bg-card/30 py-12 backdrop-blur md:py-16">
                <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-137.5 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

                <div className="mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8">
                    <Badge
                        variant="outline"
                        className="border-amber-400/30 bg-amber-400/10 px-3 py-1 font-semibold text-amber-400"
                    >
                        Verified Field Specialists
                    </Badge>

                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                        Find Top Rated <span className="text-amber-400">Technicians</span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
                        Book certified, background-checked trade professionals in your area with upfront rates and guaranteed quality.
                    </p>

                    {/* Quick Metrics Bar */}
                    <div className="mx-auto flex max-w-lg items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" /> 100% Background Checked
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-amber-400" /> Same-Day Available
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-sky-400" /> 500+ Local Pros
                        </span>
                    </div>
                </div>
            </section>

            {/* 2. Controls & Grid */}
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Search & Filter Toolbar */}
                <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between">
                    {/* Search Input Bar */}
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by skill, name, or area..."
                            className="h-10 border-border/70 bg-background/50 pl-10 text-sm focus-visible:ring-amber-400"
                        />
                    </div>

                    {/* Trade Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        {["All Pros", "Electricians", "Plumbers", "HVAC", "Handyman"].map((tab, i) => (
                            <button
                                key={tab}
                                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${i === 0
                                    ? "bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20"
                                    : "border border-border/70 bg-background/60 text-muted-foreground hover:border-amber-400/40 hover:text-foreground"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}

                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1.5 rounded-xl border-border/70 text-xs text-muted-foreground hover:text-foreground"
                        >
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            <span>Filters</span>
                        </Button>
                    </div>
                </div>

                {/* Technicians Grid Layout */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        technicians.data.map((technician: Technician) => (
                            <TechniciansProfileCard key={technician.technicianId} technician={technician} />
                        ))
                    }
                    {/* <TechniciansProfileCard />
                    <TechniciansProfileCard />
                    <TechniciansProfileCard />
                    <TechniciansProfileCard /> */}
                </div>
            </main>
        </div>
    );
};

export default TechniciansPage;