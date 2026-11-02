'use client'

import { Wrench } from "lucide-react";

export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md transition-all">
            {/* Soft Ambient Background Glow */}
            <div className="absolute h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center gap-5 p-6 text-center">
                {/* Animated Brand Icon Ring */}
                <div className="relative flex items-center justify-center">
                    {/* Outer Pulsing Glow Ring */}
                    <div className="absolute h-16 w-16 animate-ping rounded-2xl bg-amber-400/20 duration-1000" />

                    {/* Spinning Gradient Border */}
                    <div className="absolute h-14 w-14 animate-spin rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-300 to-transparent p-0.5" />

                    {/* Central Logo Box */}
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-card border border-border shadow-lg shadow-black/20">
                        <Wrench className="h-6 w-6 text-amber-400 animate-pulse" />
                    </div>
                </div>

                {/* Brand Name & Status Text */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-sm font-black tracking-wider uppercase text-foreground">
                            FixIt<span className="text-amber-400">Now</span>
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground animate-pulse font-medium">
                        Loading resources, please wait...
                    </p>
                </div>

                {/* Minimal Smooth Running Progress Bar */}
                <div className="h-1 w-36 overflow-hidden rounded-full bg-muted/60">
                    <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 animate-[loadingSlide_1.4s_ease-in-out_infinite]" />
                </div>
            </div>
        </div>
    );
}