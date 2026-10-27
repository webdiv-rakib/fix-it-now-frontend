// import Link from "next/link";
// import {
//   Search,
//   MapPin,
//   Star,
//   ShieldCheck,
//   Clock,
//   Sparkles,
//   Wrench,
//   ArrowRight,
//   Zap,
//   CheckCircle,
//   ThumbsUp,
//   SlidersHorizontal
// } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";
import LoginPage from "../(authGroup)/login/page";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import NavBar from "@/components/shared/NavBar";
// import { getMe } from "@/service/getMe";

// Mock data representing public API preview items
// const FEATURED_SERVICES = [
//   {
//     id: "srv-1",
//     title: "Emergency Pipe Leak Repair",
//     category: "Plumbing",
//     startingPrice: 45,
//     rating: 4.9,
//     reviewsCount: 128,
//     image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop&q=80",
//     popular: true,
//   },
//   {
//     id: "srv-2",
//     title: "Circuit Breaker Diagnosis & Fix",
//     category: "Electrical",
//     startingPrice: 60,
//     rating: 4.85,
//     reviewsCount: 94,
//     image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80",
//     popular: false,
//   },
//   {
//     id: "srv-3",
//     title: "HVAC Deep Cleaning & Refill",
//     category: "Air Conditioning",
//     startingPrice: 75,
//     rating: 4.95,
//     reviewsCount: 210,
//     image: "https://images.unsplash.com/photo-1631545830607-ec074d2091ea?w=600&auto=format&fit=crop&q=80",
//     popular: true,
//   },
//   {
//     id: "srv-4",
//     title: "Drywall Patch & Interior Touchup",
//     category: "Carpentry",
//     startingPrice: 50,
//     rating: 4.79,
//     reviewsCount: 62,
//     image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop&q=80",
//     popular: false,
//   },
// ];

// const TOP_TECHNICIANS = [
//   {
//     id: "tech-1",
//     name: "Marcus Vance",
//     specialty: "Master Electrician",
//     rating: 4.98,
//     jobsDone: 340,
//     hourlyRate: 55,
//     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
//     availableToday: true,
//   },
//   {
//     id: "tech-2",
//     name: "Elena Rostova",
//     specialty: "Plumbing Specialist",
//     rating: 4.92,
//     jobsDone: 215,
//     hourlyRate: 48,
//     avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
//     availableToday: true,
//   },
//   {
//     id: "tech-3",
//     name: "David Chen",
//     specialty: "Appliance & HVAC Tech",
//     rating: 4.88,
//     jobsDone: 180,
//     hourlyRate: 50,
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
//     availableToday: false,
//   },
// ];


export default async function HomePage() {
  console.log('Root Route')
  const user = await getMe();
  console.log(user)
  return (
    <div>
      Hello, Next.js!
      <Button size={"lg"} variant={"destructive"}>
        Click Me
      </Button>
      <LoginPage />
    </div>

  );
}
// <div className="flex flex-col pb-20">
//   <section className="relative overflow-hidden pt-12 md:pt-20">
//     {/* Ambient Glow */}
//     <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]" />

//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
//       <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
//         <Sparkles className="h-3.5 w-3.5" />
//         <span>On-Demand Reliable Home Repairs</span>
//       </div>

//       <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
//         Expert Home Services, <br className="hidden sm:inline" />
//         <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
//           Fixed In No Time.
//         </span>
//       </h1>

//       <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
//         Book background-checked technicians for plumbing, electrical, and appliance installations with transparent pricing and live time slots.
//       </p>

//       {/* Quick Search & Filter Bar */}
//       {/* <div className="mx-auto max-w-3xl rounded-2xl border border-border/80 bg-card/70 p-2.5 backdrop-blur-xl shadow-2xl shadow-black/20">
//         <div className="flex flex-col sm:flex-row items-center gap-2">
//           <div className="relative flex-1 w-full">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="What service do you need? (e.g. pipe leak, wiring)"
//               className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
//             />
//           </div>

//           <div className="hidden sm:block h-6 w-px bg-border/60" />

//           <div className="relative w-full sm:w-44">
//             <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
//             <input
//               type="text"
//               placeholder="Your City / Zip"
//               className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
//             />
//           </div>

//           <Link href="/services" className="w-full sm:w-auto">
//             <Button className="w-full sm:w-auto h-11 bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 px-6 gap-2">
//               <span>Explore</span>
//               <ArrowRight className="h-4 w-4" />
//             </Button>
//           </Link>
//         </div>
//       </div> */}

//       {/* Popular Category Chips */}
//       {/* <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
//         <span className="font-medium text-foreground">Popular:</span>
//         {["Plumbing", "Electrical", "HVAC", "Painting", "Carpentry"].map((cat) => (
//           <Link
//             key={cat}
//             href={`/services?category=${cat.toLowerCase()}`}
//             className="rounded-full border border-border/60 bg-card/40 px-3 py-1 hover:border-amber-400 hover:text-amber-400 transition-colors"
//           >
//             {cat}
//           </Link>
//         ))}
//       </div> */}
//     </div>
//   </section>
// </div>
// <div className="flex flex-col pb-20">
//   <NavBar/>

//   {/* 1. HERO SECTION */}
//   <section className="relative overflow-hidden pt-12 md:pt-20">
//     {/* Ambient Glow */}
//     <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[130px]" />

//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
//       <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-400">
//         <Sparkles className="h-3.5 w-3.5" />
//         <span>On-Demand Reliable Home Repairs</span>
//       </div>

//       <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
//         Expert Home Services, <br className="hidden sm:inline" />
//         <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
//           Fixed In No Time.
//         </span>
//       </h1>

//       <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
//         Book background-checked technicians for plumbing, electrical, and appliance installations with transparent pricing and live time slots.
//       </p>

//       {/* Quick Search & Filter Bar */}
//       <div className="mx-auto max-w-3xl rounded-2xl border border-border/80 bg-card/70 p-2.5 backdrop-blur-xl shadow-2xl shadow-black/20">
//         <div className="flex flex-col sm:flex-row items-center gap-2">
//           <div className="relative flex-1 w-full">
//             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <input
//               type="text"
//               placeholder="What service do you need? (e.g. pipe leak, wiring)"
//               className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
//             />
//           </div>

//           <div className="hidden sm:block h-6 w-px bg-border/60" />

//           <div className="relative w-full sm:w-44">
//             <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
//             <input
//               type="text"
//               placeholder="Your City / Zip"
//               className="w-full bg-transparent pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
//             />
//           </div>

//           <Link href="/services" className="w-full sm:w-auto">
//             <Button className="w-full sm:w-auto h-11 bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 px-6 gap-2">
//               <span>Explore</span>
//               <ArrowRight className="h-4 w-4" />
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Popular Category Chips */}
//       <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
//         <span className="font-medium text-foreground">Popular:</span>
//         {["Plumbing", "Electrical", "HVAC", "Painting", "Carpentry"].map((cat) => (
//           <Link
//             key={cat}
//             href={`/services?category=${cat.toLowerCase()}`}
//             className="rounded-full border border-border/60 bg-card/40 px-3 py-1 hover:border-amber-400 hover:text-amber-400 transition-colors"
//           >
//             {cat}
//           </Link>
//         ))}
//       </div>
//     </div>
//   </section>

//   {/* 2. VALUE PROPS (TRUST PILLARS) */}
//   <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <Card className="border-border/60 bg-card/40 backdrop-blur-md">
//         <CardContent className="p-6 flex items-start gap-4">
//           <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400 shrink-0">
//             <ShieldCheck className="h-6 w-6" />
//           </div>
//           <div className="space-y-1">
//             <h3 className="text-base font-bold text-foreground">Verified Technicians</h3>
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               Every service provider passes background validation and license verification.
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="border-border/60 bg-card/40 backdrop-blur-md">
//         <CardContent className="p-6 flex items-start gap-4">
//           <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400 shrink-0">
//             <Clock className="h-6 w-6" />
//           </div>
//           <div className="space-y-1">
//             <h3 className="text-base font-bold text-foreground">Live Time Slot Booking</h3>
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               Pick direct slots from technicians&apos; schedules without phone call back-and-forths.
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="border-border/60 bg-card/40 backdrop-blur-md">
//         <CardContent className="p-6 flex items-start gap-4">
//           <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400 shrink-0">
//             <Zap className="h-6 w-6" />
//           </div>
//           <div className="space-y-1">
//             <h3 className="text-base font-bold text-foreground">Upfront Guaranteed Pricing</h3>
//             <p className="text-xs text-muted-foreground leading-relaxed">
//               Clear starting quotes, escrow payment hold, and zero surprise hidden charges.
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   </section>

//   {/* 3. FEATURED SERVICES GRID */}
//   <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
//     <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
//       <div>
//         <Badge variant="outline" className="border-amber-400/30 text-amber-400 bg-amber-400/5 mb-2">
//           Featured Solutions
//         </Badge>
//         <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
//           Most Requested Repairs
//         </h2>
//       </div>
//       <Link href="/services">
//         <Button variant="ghost" className="gap-2 text-amber-500 hover:text-amber-400">
//           <span>View all services</span>
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </Link>
//     </div>

//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {FEATURED_SERVICES.map((service) => (
//         <Card
//           key={service.id}
//           className="group overflow-hidden border-border/60 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl hover:shadow-black/10"
//         >
//           <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={service.image}
//               alt={service.title}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//             <Badge className="absolute left-3 top-3 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-800 text-[10px] font-bold">
//               {service.category}
//             </Badge>
//           </div>

//           <CardContent className="p-5 space-y-3">
//             <div className="flex items-center justify-between text-xs text-muted-foreground">
//               <div className="flex items-center gap-1 text-amber-400">
//                 <Star className="h-3.5 w-3.5 fill-amber-400" />
//                 <span className="font-semibold text-foreground">{service.rating}</span>
//                 <span className="text-muted-foreground">({service.reviewsCount})</span>
//               </div>
//               <span className="text-[11px]">Starts at</span>
//             </div>

//             <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-amber-400 transition-colors">
//               {service.title}
//             </h3>

//             <div className="flex items-center justify-between pt-2 border-t border-border/50">
//               <span className="text-lg font-black text-foreground">
//                 ${service.startingPrice}
//               </span>
//               <Link href={`/services/${service.id}`}>
//                 <Button size="sm" variant="outline" className="h-8 text-xs font-semibold hover:border-amber-400 hover:text-amber-400">
//                   View
//                 </Button>
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   </section>

//   {/* 4. TOP-RATED TECHNICIANS */}
//   <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
//     <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
//       <div>
//         <Badge variant="outline" className="border-amber-400/30 text-amber-400 bg-amber-400/5 mb-2">
//           Verified Experts
//         </Badge>
//         <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
//           Top Rated Pros in Your Area
//         </h2>
//       </div>
//       <Link href="/technicians">
//         <Button variant="ghost" className="gap-2 text-amber-500 hover:text-amber-400">
//           <span>Meet all technicians</span>
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </Link>
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {TOP_TECHNICIANS.map((tech) => (
//         <Card key={tech.id} className="border-border/60 bg-card/50 backdrop-blur p-6 space-y-5">
//           <div className="flex items-center gap-4">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={tech.avatar}
//               alt={tech.name}
//               className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-400/40"
//             />
//             <div>
//               <h4 className="font-bold text-foreground">{tech.name}</h4>
//               <p className="text-xs text-muted-foreground">{tech.specialty}</p>
//               <div className="flex items-center gap-1.5 mt-1 text-xs">
//                 <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
//                 <span className="font-semibold text-foreground">{tech.rating}</span>
//                 <span className="text-muted-foreground">• {tech.jobsDone} jobs</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between rounded-xl bg-background/50 p-3 text-xs border border-border/40">
//             <span className="text-muted-foreground">Standard Hourly Rate</span>
//             <span className="font-bold text-foreground">${tech.hourlyRate}/hr</span>
//           </div>

//           <Link href={`/technicians/${tech.id}`} className="block">
//             <Button className="w-full bg-amber-400 font-bold text-slate-950 hover:bg-amber-300">
//               Book Appointment
//             </Button>
//           </Link>
//         </Card>
//       ))}
//     </div>
//   </section>

//   {/* 5. HOW IT WORKS */}
//   <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//     <div className="rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-12 backdrop-blur-xl">
//       <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
//           How FixItNow Works
//         </h2>
//         <p className="text-sm text-muted-foreground">
//           Three seamless steps from booking to guaranteed satisfaction.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
//         <div className="space-y-3">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 font-bold text-lg border border-amber-400/20">
//             1
//           </div>
//           <h4 className="font-bold text-foreground text-base">Select Service & Slot</h4>
//           <p className="text-xs text-muted-foreground leading-relaxed">
//             Browse available technicians, compare verified ratings, and pick an open slot from their live calendar.
//           </p>
//         </div>

//         <div className="space-y-3">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 font-bold text-lg border border-amber-400/20">
//             2
//           </div>
//           <h4 className="font-bold text-foreground text-base">Pro Confirms & Repairs</h4>
//           <p className="text-xs text-muted-foreground leading-relaxed">
//             Technician reviews and accepts the job. Once approved, complete payment securely via Stripe checkout.
//           </p>
//         </div>

//         <div className="space-y-3">
//           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 font-bold text-lg border border-amber-400/20">
//             3
//           </div>
//           <h4 className="font-bold text-foreground text-base">Approve & Review</h4>
//           <p className="text-xs text-muted-foreground leading-relaxed">
//             Inspect completed repair work, mark job resolved, and submit a transparent review to help the community.
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>

// </div>