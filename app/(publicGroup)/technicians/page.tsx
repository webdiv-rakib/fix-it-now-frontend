/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import {
    Search,
    Users,
    ShieldCheck,
    Clock,
    X,
    Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TechniciansProfileCard, {
    Technician,
} from "../_components/technicians/TechniciansProfileCard";
import { getAllTechnicians } from "../_actions/getAllTechnicians";
import getAllCategories from "../_actions/getAllCategoryies";

interface TechniciansPageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
    }>;
}

const TechniciansPage = async ({ searchParams }: TechniciansPageProps) => {
    const resolvedParams = await searchParams;
    const selectedCategory = resolvedParams?.category;
    const searchQuery = resolvedParams?.search;

    // Concurrently fetch technicians and platform categories
    const [techniciansRes, categoriesRes] = await Promise.all([
        getAllTechnicians(selectedCategory, searchQuery),
        getAllCategories(),
    ]);

    const rawTechnicians: Technician[] = Array.isArray(techniciansRes?.data)
        ? techniciansRes.data
        : [];

    const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

    // Fallback trade names if category API has not populated yet
    const tradeTabs =
        categories.length > 0
            ? categories.map((c: any) => c.name)
            : ["Electricians", "Plumbers", "HVAC", "Handyman", "Appliance"];

    // Filter in memory to ensure immediate matching across skills, bio, and service categories
    const filteredTechnicians = rawTechnicians.filter((tech: any) => {
        let matchesCategory = true;
        let matchesSearch = true;

        if (selectedCategory) {
            const target = selectedCategory.toLowerCase();
            const techSkills = Array.isArray(tech.skills)
                ? tech.skills.join(" ").toLowerCase()
                : (tech.skills || "").toLowerCase();
            const techCategory = (
                tech.category?.name ||
                tech.categoryName ||
                tech.specialization ||
                ""
            ).toLowerCase();
            const services = Array.isArray(tech.services)
                ? tech.services.map((s: any) => s.name || s.category?.name || "").join(" ").toLowerCase()
                : "";

            matchesCategory =
                techSkills.includes(target) ||
                techCategory.includes(target) ||
                services.includes(target);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const name = (tech.user?.name || tech.name || "").toLowerCase();
            const bio = (tech.bio || "").toLowerCase();
            const address = (tech.user?.address || tech.address || "").toLowerCase();
            const skills = Array.isArray(tech.skills)
                ? tech.skills.join(" ").toLowerCase()
                : (tech.skills || "").toLowerCase();

            matchesSearch =
                name.includes(q) ||
                bio.includes(q) ||
                address.includes(q) ||
                skills.includes(q);
        }

        return matchesCategory && matchesSearch;
    });

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
                        Book certified, background-checked trade professionals in your area with
                        upfront rates and guaranteed quality.
                    </p>

                    {/* Quick Metrics Bar */}
                    <div className="mx-auto flex max-w-lg items-center justify-center gap-6 pt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" /> 100% Background Checked
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-amber-400" /> Confirmed Slots
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-sky-400" /> Certified Specialists
                        </span>
                    </div>
                </div>
            </section>

            {/* 2. Controls & Grid */}
            <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between">
                    {/* Search Form */}
                    <form method="GET" action="/technicians" className="relative w-full lg:max-w-md">
                        {selectedCategory && (
                            <input type="hidden" name="category" value={selectedCategory} />
                        )}
                        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            name="search"
                            defaultValue={searchQuery || ""}
                            placeholder="Search by skill, name, or area..."
                            className="h-10 w-full rounded-xl border border-border/70 bg-background/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                        />
                    </form>

                    {/* Trade Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2">
                        <Link href="/technicians">
                            <span
                                className={`inline-block rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${!selectedCategory
                                    ? "bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20 font-bold"
                                    : "border border-border/70 bg-background/60 text-muted-foreground hover:border-amber-400/40 hover:text-foreground"
                                    }`}
                            >
                                All Pros
                            </span>
                        </Link>

                        {tradeTabs.map((tab: string) => {
                            const isActive =
                                selectedCategory?.toLowerCase() === tab.toLowerCase();
                            return (
                                <Link
                                    key={tab}
                                    href={`/technicians?category=${encodeURIComponent(tab)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
                                        }`}
                                >
                                    <span
                                        className={`inline-block rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${isActive
                                            ? "bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20 font-bold"
                                            : "border border-border/70 bg-background/60 text-muted-foreground hover:border-amber-400/40 hover:text-foreground"
                                            }`}
                                    >
                                        {tab}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Filter Summary & Active Chip */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <p>
                        Showing <strong className="text-foreground">{filteredTechnicians.length}</strong>{" "}
                        {filteredTechnicians.length === 1 ? "technician" : "technicians"}
                    </p>

                    {(selectedCategory || searchQuery) && (
                        <div className="flex items-center gap-2">
                            {selectedCategory && (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 font-semibold text-amber-400">
                                    <span>Specialty: {selectedCategory}</span>
                                    <Link
                                        href={`/technicians${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
                                            }`}
                                        aria-label="Remove category filter"
                                    >
                                        <X className="h-3.5 w-3.5 hover:text-foreground cursor-pointer transition-colors" />
                                    </Link>
                                </div>
                            )}
                            {searchQuery && (
                                <div className="inline-flex items-center gap-1.5 rounded-full bg-muted/80 border border-border px-3 py-1 font-medium text-foreground">
                                    <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                                    <Link
                                        href={`/technicians${selectedCategory
                                            ? `?category=${encodeURIComponent(selectedCategory)}`
                                            : ""
                                            }`}
                                        aria-label="Clear search"
                                    >
                                        <X className="h-3.5 w-3.5 hover:text-rose-400 cursor-pointer transition-colors" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Technicians Grid Layout */}
                {filteredTechnicians.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-16 text-center space-y-3">
                        <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                            <Wrench className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-base text-foreground">
                            No technicians found
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                            {selectedCategory
                                ? `No verified specialists found matching "${selectedCategory}".`
                                : "No technicians match your search filters."}
                        </p>
                        <div className="pt-2">
                            <Link href="/technicians">
                                <Button variant="outline" size="sm" className="text-xs">
                                    Reset Filters
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredTechnicians.map((technician: Technician) => (
                            <TechniciansProfileCard
                                key={technician.technicianId}
                                technician={technician}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default TechniciansPage;