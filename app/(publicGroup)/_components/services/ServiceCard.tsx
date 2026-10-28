/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * {
    "success": true,
    "statusCode": 200,
    "message": "Services fetched successfully",
    "data": [
        {
            "serviceId": "aedf93c5-3e31-4543-96ed-e9aa470289bf",
            "name": "Fix Leaky Faucet",
            "description": "I will come and repair any leaky faucet or pipe under the sink.",
            "price": 35.5,
            "categoryId": "49614d98-380d-4259-9692-38e1a8f816f6",
            "technicianId": "5efaa5a9-9f0d-4a6f-8a59-cd87c3c2962c",
            "category": {
                "categoryId": "49614d98-380d-4259-9692-38e1a8f816f6",
                "name": "Plumbing"
            },
            "technician": {
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
                    "name": "John Doe",
                    "email": "customer20@example.com",
                    "phone": "01794181719",
                    "address": "234 Main Street, Dhaka"
                }
            }
        },
 * 
 */

export type Service = {
    serviceId: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    technicianId: string;
    category: {
        categoryId: string;
        name: string;
    };
    // technician: {
    //     technicianId: string;
    //     bio: string | null;
    //     experienceYears: number;
    //     rating: number;
    //     availableSlots: string[];
    //     location: string | null;
    //     skills: string[];
    //     userId: string;
    //     createdAt: string;
    //     updatedAt: string;
    //     user: {
    //         name: string;
    //         email: string;
    //         phone: string;
    //         address: string;
    //     };
    // };
};
type ServiceCardProps = {
    service: Service;
}


export async function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Card className="group flex flex-col justify-between overflow-hidden border-border/70 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl hover:shadow-black/20">
            <div>
                {/* Cover Image Container */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                    <img
                        src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop&q=80"
                        alt="Service Image"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                            <Star className="h-3.5 w-3.5 fill-amber-400" />
                            <span>4.9</span>
                            <span className="text-muted-foreground font-normal">(120)</span>
                        </div>

                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>1 - 2 hrs</span>
                        </div>
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-amber-400 transition-colors">
                        {service.name}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {service.description}
                    </p>
                </CardContent>
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 p-5 pt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                            Rate
                        </span>
                        <p className="text-xl font-black text-foreground">
                            {service.price}$
                        </p>
                    </div>

                    <Link href="/services/1">
                        <Button
                            size="sm"
                            className="h-9 gap-1.5 bg-amber-400 px-4 text-xs font-bold text-slate-950 hover:bg-amber-300 active:scale-[0.98] transition-all"
                        >
                            <span>Book</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}