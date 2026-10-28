import Link from "next/link";
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function HomePage() {
  console.log('Root Route')
  const user = await getMe();
  console.log(user)
  return (
    <div className="flex flex-col pb-20">
      {/* <Button size={"lg"} variant={"destructive"}>
        Click Me
      </Button> */}
      {/* <LoginPage /> */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        {/* Ambient Glow */}
        {/* <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]" /> */}

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>On-Demand Reliable Home Repairs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Expert Home Services, <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Fixed In No Time.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Book background-checked technicians for plumbing, electrical, and appliance installations with transparent pricing and live time slots.
          </p>

          {/* Quick Search & Filter Bar */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-border/80 bg-card/70 p-2.5 backdrop-blur-xl shadow-2xl shadow-black/20">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g. pipe leak, wiring)"
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <div className="hidden sm:block h-6 w-px bg-border/60" />

              <div className="relative w-full sm:w-44">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
                <input
                  type="text"
                  placeholder="Your City / Zip"
                  className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <Link href="/services" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-11 bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 px-6 gap-2">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}