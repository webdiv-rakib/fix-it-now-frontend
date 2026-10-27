import Link from "next/link";
import { Wrench, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

            <div className="mx-auto flex max-w-md flex-col items-center text-center">
                {/* Visual 404 Badge with Brand Icon */}
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
                    <Wrench className="h-10 w-10 text-amber-400 rotate-45" />
                    <span className="absolute -bottom-2.5 rounded-full border border-border/80 bg-card px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                        Error 404
                    </span>
                </div>

                {/* Text Content */}
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Page Under Construction
                </h1>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
                    We couldn&apos;t find the repair or page you were looking for. It might have been relocated, deleted, or never existed.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto h-10 gap-2 bg-amber-400 px-5 text-xs font-bold text-slate-950 shadow-md shadow-amber-400/20 hover:bg-amber-300 transition-all">
                            <Home className="h-4 w-4" />
                            <span>Back to Home</span>
                        </Button>
                    </Link>

                    <Link href="/services" className="w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto h-10 gap-2 border-border/80 bg-card/60 px-5 text-xs font-semibold backdrop-blur hover:border-amber-400/50 hover:text-amber-400"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Browse Services</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}