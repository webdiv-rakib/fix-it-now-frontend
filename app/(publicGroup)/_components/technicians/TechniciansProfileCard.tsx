/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
    Star,
    MapPin,
    CheckCircle2,
    PhoneCall,
    ArrowUpRight,
    User,
    Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Review = {
    rating: number;
    comment: string;
    createdAt: string;
};

export type Technician = {
    technicianId: string;
    bio: string | null;
    experienceYears: number;
    rating: number;
    availableSlots: string[];
    location: string | null;
    skills: string[];
    hourlyRate?: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        userId: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        avatarUrl?: string | null;
    };
    reviews: Review[];
};

type TechniciansProfileCardProps = {
    technician: Technician;
};

export const TechniciansProfileCard = ({ technician }: TechniciansProfileCardProps) => {
    const {
        technicianId,
        user,
        rating,
        experienceYears,
        skills = [],
        availableSlots = [],
        bio,
        hourlyRate,
        reviews = [],
    } = technician;

    // Calculate review average or fallback to rating
    const reviewCount = Array.isArray(reviews) ? reviews.length : 0;
    const displayRating = Number(rating || 0).toFixed(1);
    const displayRate = hourlyRate || 35; // Default standard base hourly rate

    return (
        <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-linear-to-b from-card/90 to-card/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-500/10">
            {/* Decorative top accent glow */}
            <div className="absolute -top-12 left-1/2 -z-10 h-24 w-3/4 -translate-x-1/2 rounded-full bg-amber-400/10 blur-2xl transition-all group-hover:bg-amber-400/20" />

            <div>
                {/* Top Header / Avatar & Availability */}
                <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="relative">
                            {/* Profile Avatar */}
                            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-border/80 bg-muted ring-2 ring-amber-400/20 transition-all group-hover:ring-amber-400/50">
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.name || "Technician"}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-amber-400/10 text-amber-500">
                                        <User className="h-8 w-8" />
                                    </div>
                                )}
                            </div>

                            {/* Online / Active status pulse */}
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
                            </span>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-col items-end gap-1.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                                <CheckCircle2 className="h-3 w-3" /> Available
                            </span>
                            {availableSlots.length > 0 && (
                                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                    <Clock className="h-2.5 w-2.5 text-amber-400" />
                                    {availableSlots.length} schedule slots
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Name & Headline */}
                    <div className="mt-4 space-y-1">
                        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-amber-400 truncate">
                            {user?.name || "Professional Specialist"}
                        </h3>

                        {bio ? (
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {bio}
                            </p>
                        ) : (
                            <p className="text-xs text-amber-400/80 font-medium">
                                Certified Home Service Specialist
                            </p>
                        )}

                        <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400/80" />
                            <span className="truncate">{user?.address || "Dhaka, Bangladesh"}</span>
                        </div>
                    </div>
                </div>

                {/* Highlight Stats Row */}
                <div className="mx-5 grid grid-cols-2 gap-2 rounded-xl border border-border/50 bg-muted/30 p-2.5 text-center backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-400">
                            <Star className="h-3.5 w-3.5 fill-amber-400" />
                            <span>{displayRating}</span>
                            {reviewCount > 0 && (
                                <span className="text-[10px] font-normal text-muted-foreground">
                                    ({reviewCount})
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Rating & Reviews</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-foreground">
                            {experienceYears > 0 ? `${experienceYears}+ Years` : "Verified Pro"}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Experience</p>
                    </div>
                </div>

                {/* Skills / Specialties Pills */}
                <CardContent className="p-5 pt-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Specialties
                    </p>
                    <div className="flex flex-wrap gap-1.5 min-h-6.5">
                        {Array.isArray(skills) && skills.length > 0 ? (
                            skills.slice(0, 3).map((skill, index) => (
                                <Badge
                                    key={index}
                                    variant="outline"
                                    className="rounded-md border-border/60 bg-background/50 px-2 py-0.5 text-[10px] font-medium text-foreground hover:border-amber-400/40"
                                >
                                    {skill}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-[11px] italic text-muted-foreground">
                                General Maintenance & Repairs
                            </span>
                        )}
                        {skills.length > 3 && (
                            <span className="text-[10px] text-muted-foreground self-center">
                                +{skills.length - 3} more
                            </span>
                        )}
                    </div>
                </CardContent>
            </div>

            {/* Card Action Footer */}
            <div className="border-t border-border/60 bg-muted/20 px-5 py-3.5">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Standard Rate
                        </span>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-lg font-black tracking-tight text-foreground">
                                ${displayRate}
                            </span>
                            <span className="text-xs text-muted-foreground">/hr</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {user?.phone && (
                            <a href={`tel:${user.phone}`} aria-label={`Call ${user.name}`}>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 rounded-lg border-border/70 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-400 transition-colors"
                                >
                                    <PhoneCall className="h-3.5 w-3.5" />
                                </Button>
                            </a>
                        )}

                        {/* Dynamic Link to Detailed Technician Page */}
                        <Link href={`/technicians/${technicianId}`}>
                            <Button
                                size="sm"
                                className="group/btn h-8 gap-1 rounded-lg bg-amber-400 px-3 text-xs font-bold text-slate-950 transition-all hover:bg-amber-300 active:scale-95 shadow-xs shadow-amber-400/20"
                            >
                                <span>Book Pro</span>
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TechniciansProfileCard;