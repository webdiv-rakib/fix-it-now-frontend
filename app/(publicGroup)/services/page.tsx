/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { X, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service, ServiceCard } from "../_components/services/ServiceCard";
import { getAllServices } from "../_actions/getAllServices";
import getAllCategories from "../_actions/getAllCategoryies";

interface ServicesPageProps {
    searchParams: Promise<{
        category?: string;
        search?: string;
    }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
    const resolvedParams = await searchParams;
    const selectedCategory = resolvedParams?.category;
    const searchQuery = resolvedParams?.search;

    // Fetch services and all categories concurrently
    const [servicesRes, categoriesRes] = await Promise.all([
        getAllServices(selectedCategory, searchQuery),
        getAllCategories(),
    ]);

    const rawServices: Service[] = Array.isArray(servicesRes?.data) ? servicesRes.data : [];
    const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

    // Filter in-memory to guarantee matching even if the backend returns all items
    const filteredServices = rawServices.filter((service: any) => {
        let matchesCategory = true;
        let matchesSearch = true;

        if (selectedCategory) {
            const catName = service.category?.name || service.categoryName || "";
            matchesCategory = catName.toLowerCase() === selectedCategory.toLowerCase();
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const name = (service.name || "").toLowerCase();
            const desc = (service.description || "").toLowerCase();
            matchesSearch = name.includes(q) || desc.includes(q);
        }

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen pb-24">
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

            {/* 2. Filter Controls & Active Indicator */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-4">
                {/* Horizontal Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <Link href="/services">
                        <Badge
                            className={`cursor-pointer px-3.5 py-1.5 text-xs transition-all ${!selectedCategory
                                ? "bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 shadow-sm shadow-amber-400/20"
                                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                                }`}
                        >
                            All Services
                        </Badge>
                    </Link>

                    {categories.map((cat: any) => {
                        const isActive = selectedCategory?.toLowerCase() === cat.name?.toLowerCase();
                        return (
                            <Link
                                key={cat.categoryId || cat.id}
                                href={`/services?category=${encodeURIComponent(cat.name)}`}
                            >
                                <Badge
                                    className={`cursor-pointer px-3.5 py-1.5 text-xs transition-all whitespace-nowrap ${isActive
                                        ? "bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 shadow-sm shadow-amber-400/20"
                                        : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
                                        }`}
                                >
                                    {cat.name}
                                </Badge>
                            </Link>
                        );
                    })}
                </div>

                {/* Filter Summary & Reset Pill */}
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-muted-foreground font-medium">
                        Showing <span className="text-foreground font-bold">{filteredServices.length}</span>{" "}
                        {filteredServices.length === 1 ? "service" : "services"}
                    </p>

                    {selectedCategory && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 px-3 py-1 text-xs font-semibold text-amber-400">
                            <span>Category: {selectedCategory}</span>
                            <Link href="/services" aria-label="Clear category filter">
                                <X className="h-3.5 w-3.5 hover:text-foreground transition-colors cursor-pointer" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. Services Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
                {filteredServices.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 p-16 text-center space-y-3">
                        <div className="h-12 w-12 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                            <Wrench className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-base text-foreground">No services found</h3>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                            {selectedCategory
                                ? `There are no active services currently listed under "${selectedCategory}".`
                                : "No services matched your query."}
                        </p>
                        <div className="pt-2">
                            <Link href="/services">
                                <Button variant="outline" size="sm" className="text-xs">
                                    Clear Filters
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredServices.map((service: Service) => (
                            <ServiceCard key={service.serviceId} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}