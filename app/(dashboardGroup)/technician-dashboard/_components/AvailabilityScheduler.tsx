'use client'

import { useState } from "react";
import { toast } from "sonner";
import {
    CalendarDays,
    Clock,
    Plus,
    Trash2,
    Save,
    Loader2,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { updateAvailabilityAction } from "../_actions/availabilityActions";
import Link from "next/link";

const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const PRESET_BLOCKS = [
    { label: "Morning", time: "09:00 AM - 01:00 PM" },
    { label: "Afternoon", time: "01:00 PM - 05:00 PM" },
    { label: "Evening", time: "05:00 PM - 09:00 PM" },
    { label: "Full Day", time: "09:00 AM - 05:00 PM" },
];

interface AvailabilitySchedulerProps {
    initialSlots?: string[];
}

export default function AvailabilityScheduler({ initialSlots = [] }: AvailabilitySchedulerProps) {
    const [slots, setSlots] = useState<string[]>(initialSlots);
    const [selectedDay, setSelectedDay] = useState<string>("Monday");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [saving, setSaving] = useState(false);

    // Convert 24hr "09:00" -> "09:00 AM"
    const formatTime12h = (time24: string) => {
        const [h, m] = time24.split(":").map(Number);
        const period = h >= 12 ? "PM" : "AM";
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        return `${hour12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
    };

    // Add custom slot
    const handleAddCustomSlot = () => {
        if (!startTime || !endTime) {
            toast.error("Please pick both start and end times");
            return;
        }
        if (startTime >= endTime) {
            toast.error("End time must be after start time");
            return;
        }

        const slotStr = `${selectedDay}: ${formatTime12h(startTime)} - ${formatTime12h(endTime)}`;

        if (slots.includes(slotStr)) {
            toast.error("This exact slot is already added");
            return;
        }

        setSlots((prev) => [...prev, slotStr]);
        toast.success(`Added ${slotStr}`);
    };

    // Add preset shift
    const handleAddPreset = (timeRange: string) => {
        const slotStr = `${selectedDay}: ${timeRange}`;
        if (slots.includes(slotStr)) {
            toast.error("This slot is already added");
            return;
        }
        setSlots((prev) => [...prev, slotStr]);
        toast.success(`Added ${selectedDay} (${timeRange})`);
    };

    // Remove single slot
    const handleRemoveSlot = (slotToRemove: string) => {
        setSlots((prev) => prev.filter((s) => s !== slotToRemove));
    };

    // Clear slots for current day
    const handleClearDay = () => {
        setSlots((prev) => prev.filter((s) => !s.startsWith(`${selectedDay}:`)));
        toast.info(`Cleared slots for ${selectedDay}`);
    };

    // Save changes to backend
    const handleSave = async () => {
        setSaving(true);
        const res = await updateAvailabilityAction(slots);
        setSaving(false);

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    const currentDaySlots = slots.filter((s) => s.startsWith(`${selectedDay}:`));

    return (
        <div className="space-y-6">
            {/* Top Bar with Save Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                        <CalendarDays className="h-6 w-6 text-amber-400" />
                        Working Hours & Available Slots
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Choose which days and hours customers can select during booking checkout.
                    </p>
                </div>


                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs h-9 px-5 gap-2 shadow-md shadow-amber-400/20 shrink-0 self-start sm:self-auto"
                >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    <span>{saving ? "Saving Schedule..." : "Save Availability"}</span>
                </Button>
            </div>
            <div className="flex items-center gap-2 border-b border-border/50 pb-4 mb-6">
                <Link
                    href="/technician-dashboard"
                    className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:border-amber-400/40 hover:text-foreground transition-all"
                >
                    <Wrench className="h-3.5 w-3.5 text-amber-400" />
                    <span>Assigned Bookings</span>
                </Link>

                <Link
                    href="/technician-dashboard/availability"
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-sm shadow-amber-400/20"
                >
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>Manage Available Slots</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Day Selector & Preset/Custom Pickers */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Day of Week Navigation */}
                    <Card className="border-border/70 bg-card/60 backdrop-blur">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-bold text-foreground">Select Day</CardTitle>
                            <CardDescription className="text-xs">
                                Pick a day to inspect or add shifts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                                {DAYS_OF_WEEK.map((day) => {
                                    const daySlotsCount = slots.filter((s) => s.startsWith(`${day}:`)).length;
                                    const isSelected = selectedDay === day;

                                    return (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => setSelectedDay(day)}
                                            className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs transition-all ${isSelected
                                                ? "border-amber-400 bg-amber-400/10 text-amber-400 font-bold shadow-xs shadow-amber-400/20"
                                                : "border-border/60 bg-muted/20 text-muted-foreground hover:border-border hover:text-foreground"
                                                }`}
                                        >
                                            <span>{day.slice(0, 3)}</span>
                                            <span className={`text-[10px] mt-1 ${daySlotsCount > 0 ? "text-amber-400 font-bold" : "text-muted-foreground/60"}`}>
                                                {daySlotsCount > 0 ? `${daySlotsCount} slot${daySlotsCount > 1 ? "s" : ""}` : "Off"}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Shifts & Custom Times */}
                    <Card className="border-border/70 bg-card/60 backdrop-blur">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-amber-400" />
                                        Add Shifts for {selectedDay}
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Choose a preset or define custom working hours
                                    </CardDescription>
                                </div>
                                {currentDaySlots.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearDay}
                                        className="h-7 text-[11px] text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 px-2"
                                    >
                                        Clear {selectedDay}
                                    </Button>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {/* Presets */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                    Quick Shifts
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {PRESET_BLOCKS.map((preset) => (
                                        <Button
                                            key={preset.label}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAddPreset(preset.time)}
                                            className="border-border/70 bg-muted/20 hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-400 text-xs h-auto py-2 flex flex-col items-center gap-0.5"
                                        >
                                            <span className="font-bold text-foreground text-xs">{preset.label}</span>
                                            <span className="text-[9px] text-muted-foreground">{preset.time}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Hours */}
                            <div className="pt-3 border-t border-border/40 space-y-3">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                    Custom Working Window
                                </label>
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    <div className="w-full sm:flex-1">
                                        <span className="text-[10px] text-muted-foreground mb-1 block">Start Time</span>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="w-full rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <span className="hidden sm:inline-block text-muted-foreground pt-4">to</span>

                                    <div className="w-full sm:flex-1">
                                        <span className="text-[10px] text-muted-foreground mb-1 block">End Time</span>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="w-full rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                                        />
                                    </div>

                                    <div className="w-full sm:w-auto sm:pt-4">
                                        <Button
                                            type="button"
                                            onClick={handleAddCustomSlot}
                                            className="w-full sm:w-auto bg-amber-400/20 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-slate-950 font-bold text-xs h-9 px-4 gap-1.5"
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Add Slot</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Weekly Schedule Overview */}
                <div className="lg:col-span-5 space-y-4">
                    <Card className="border-border/70 bg-card/60 backdrop-blur h-full flex flex-col justify-between">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-bold text-foreground">Weekly Overview</CardTitle>
                                <Badge variant="outline" className="text-[10px] font-mono border-amber-400/30 text-amber-400">
                                    {slots.length} Total Window{slots.length === 1 ? "" : "s"}
                                </Badge>
                            </div>
                            <CardDescription className="text-xs">
                                All confirmed booking windows currently published to customers
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4 flex-1">
                            {slots.length === 0 ? (
                                <div className="p-8 text-center border border-dashed border-border/70 rounded-xl space-y-2">
                                    <AlertCircle className="h-6 w-6 text-muted-foreground mx-auto" />
                                    <p className="text-xs font-semibold text-foreground">No working hours configured</p>
                                    <p className="text-[11px] text-muted-foreground">
                                        Add shifts using the presets or custom window on the left.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-105 overflow-y-auto pr-1">
                                    {DAYS_OF_WEEK.map((day) => {
                                        const daySlots = slots.filter((s) => s.startsWith(`${day}:`));
                                        if (daySlots.length === 0) return null;

                                        return (
                                            <div key={day} className="rounded-xl border border-border/50 bg-muted/20 p-3 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                                        {day}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {daySlots.length} window{daySlots.length === 1 ? "" : "s"}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {daySlots.map((slot) => {
                                                        const timeOnly = slot.replace(`${day}:`, "").trim();
                                                        return (
                                                            <div
                                                                key={slot}
                                                                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card/90 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-xs"
                                                            >
                                                                <Clock className="h-3 w-3 text-amber-400" />
                                                                <span>{timeOnly}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveSlot(slot)}
                                                                    className="text-muted-foreground hover:text-rose-400 transition-colors ml-0.5"
                                                                    title="Remove slot"
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}