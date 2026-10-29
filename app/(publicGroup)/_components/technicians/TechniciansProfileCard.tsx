/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import {
    Star,
    MapPin,
    CheckCircle2,
    PhoneCall,
    ArrowUpRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * {
    "success": true,
    "statusCode": 200,
    "message": "Technicians fetched successfully",
    "data": [
        {
            "technicianId": "5efaa5a9-9f0d-4a6f-8a59-cd87c3c2962c",
            "bio": null,
            "experienceYears": 0,
            "rating": 4.3,
            "availableSlots": [
                "Monday: 09:00 AM - 02:00 PM",
                "Wednesday: 02:00 PM - 06:00 PM",
                "Friday: 10:00 AM - 05:00 PM"
            ],
            "location": null,
            "skills": [],
            "userId": "0c5ff5f9-4089-49a8-aec4-504041979281",
            "createdAt": "2026-10-07T18:46:52.132Z",
            "updatedAt": "2026-10-10T19:22:10.676Z",
            "user": {
                "userId": "0c5ff5f9-4089-49a8-aec4-504041979281",
                "name": "John Doe",
                "email": "customer20@example.com",
                "phone": "01794181719",
                "address": "234 Main Street, Dhaka"
            },
            "reviews": [
                {
                    "rating": 4,
                    "comment": "Fixed the issue quickly and professionally!",
                    "createdAt": "2026-10-10T19:22:10.456Z"
                },
                {
                    "rating": 4,
                    "comment": "Fixed the issue quickly and professionally!",
                    "createdAt": "2026-10-09T23:58:58.769Z"
                },
                {
                    "rating": 5,
                    "comment": "Fixed the issue quickly and professionally!",
                    "createdAt": "2026-10-09T23:33:06.937Z"
                }
            ]
        },
 * 
 */

export type Technician = {
    technicianId: string;
    bio: string | null;
    experienceYears: number;
    rating: number;
    availableSlots: string[];
    location: string | null;
    skills: string[];
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        userId: string;
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    reviews: {
        rating: number;
        comment: string;
        createdAt: string;
    };
};

type TechniciansProfileCardProps = {
    technician: Technician;
};

const TechniciansProfileCard = ({ technician }: TechniciansProfileCardProps) => {
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
                            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-border/80 bg-muted ring-2 ring-amber-400/20 transition-all group-hover:ring-amber-400/50">
                                <img
                                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"
                                    alt="Technician avatar"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            {/* Online / Active status pulse */}
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
                            </span>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-col items-end gap-1.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-500">
                                <CheckCircle2 className="h-3 w-3" /> Available Now
                            </span>
                        </div>
                    </div>

                    {/* Name & Headline */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-amber-400">
                            {technician.user.name}
                        </h3>
                        <p className="text-xs font-medium text-amber-400/90">
                            
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                            <span>{technician.user.address}</span>
                        </div>
                    </div>
                </div>

                {/* Highlight Stats Row */}
                <div className="mx-5 grid grid-cols-2 gap-2 rounded-xl border border-border/50 bg-muted/30 p-2.5 text-center backdrop-blur-sm">
                    <div>
                        <div className="flex items-center justify-center gap-1 text-xs font-bold text-amber-400">
                            <Star className="h-3.5 w-3.5 fill-amber-400" />
                            <span>{technician.rating}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Ratings</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-foreground">{technician.experienceYears}-Years</p>
                        <p className="text-[10px] text-muted-foreground">Experience</p>
                    </div>
                </div>

                {/* Skills / Specialties Pills */}
                <CardContent className="p-5 pt-3">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Specialties
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {technician.skills}
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
                                $45
                            </span>
                            <span className="text-xs text-muted-foreground">/hr</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-lg border-border/70 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-400"
                        >
                            <PhoneCall className="h-3.5 w-3.5" />
                        </Button>

                        <Link href="/technicians/1">
                            <Button
                                size="sm"
                                className="group/btn h-8 gap-1 rounded-lg bg-amber-400 px-3 text-xs font-bold text-slate-950 transition-all hover:bg-amber-300 active:scale-95"
                            >
                                <span>Hire</span>
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