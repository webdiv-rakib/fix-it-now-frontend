 import Link from "next/link";
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import getAllCategories from "./_actions/getAllCategoryies";
import AllCategory, { ICategory } from "./_components/category/AllCategory";

export default async function HomePage() {
  const categoriesRes = await getAllCategories();
  const categories: ICategory[] = Array.isArray(categoriesRes?.data)
    ? categoriesRes.data
    : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Glow */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-16 border-b border-border/40">
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-175 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>On-Demand Verified Home Repairs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Expert Home Services, <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Fixed In No Time.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Book background-checked technicians for electrical, plumbing, and home
            repairs with upfront pricing and confirmed live time slots.
          </p>

          {/* Search Bar Form (redirects to /services with query params) */}
          <form
            action="/services"
            method="GET"
            className="mx-auto max-w-3xl rounded-2xl border border-border/80 bg-card/80 p-2.5 backdrop-blur-xl shadow-2xl shadow-black/20"
          >
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  name="search"
                  type="text"
                  placeholder="What service do you need? (e.g. AC repair, wiring)"
                  className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <div className="hidden sm:block h-6 w-px bg-border/60" />

              <div className="relative w-full sm:w-48">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-400" />
                <input
                  name="location"
                  type="text"
                  placeholder="City / Area"
                  className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto h-11 bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 px-6 gap-2 shrink-0 shadow-md shadow-amber-400/20"
              >
                <span>Find Specialist</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% Background Checked
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Transparent Upfront Pricing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Secure Stripe Checkout
            </span>
          </div>
        </div>
      </section>

      {/* 2. Service Categories Grid */}
      <section className="py-16 md:py-20 bg-muted/20 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Explore Domains
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
                Popular Service Categories
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 group"
            >
              <span>View All Services</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {categories.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground border border-dashed border-border/60 rounded-xl">
              No service categories available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category: ICategory) => (
                <AllCategory key={category.categoryId} category={category} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. How It Works Section (Linked by Navbar #how-it-works) */}
      <section id="how-it-works" className="py-20 border-b border-border/40 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-black text-foreground">How FixItNow Works</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              From choosing your specialist to job completion, we make home repairs seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 space-y-3 relative">
              <span className="text-3xl font-black text-amber-400/30">01</span>
              <h3 className="font-bold text-base text-foreground">Choose Service</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Select your service category and pick an experienced local technician.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 space-y-3 relative">
              <span className="text-3xl font-black text-amber-400/30">02</span>
              <h3 className="font-bold text-base text-foreground">Pick Time Slot</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Select an available date and confirmed working slot from the technician calendar.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 space-y-3 relative">
              <span className="text-3xl font-black text-amber-400/30">03</span>
              <h3 className="font-bold text-base text-foreground">Pay Securely</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Once the technician accepts, pay seamlessly through Stripe Checkout.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 space-y-3 relative">
              <span className="text-3xl font-black text-amber-400/30">04</span>
              <h3 className="font-bold text-base text-foreground">Job Done & Review</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Technician completes the job. Rate the quality and submit your honest feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why FixItNow / Value Props */}
      <section className="py-20 bg-muted/10 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">Vetted Specialists</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every technician undergoes identity verification and credential validation.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">Guaranteed Slots</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  No vague wait windows. Technicians arrive at the exact time slot you booked.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">Protected Checkout</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Funds are protected via encrypted Stripe checkout sessions until service begins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-500/30 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            <h2 className="text-2xl sm:text-4xl font-black text-foreground">
              Ready to get your home repairs sorted?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              Find top-rated technicians in your area or sign up as a service professional today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/services">
                <Button className="h-11 bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 px-6">
                  Browse Services
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-11 border-border/80 text-foreground px-6">
                  Join as Technician
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}