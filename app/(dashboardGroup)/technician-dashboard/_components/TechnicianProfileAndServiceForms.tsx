/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import { toast } from "sonner";
import {
    User,
    Wrench,
    Clock,
    DollarSign,
    MapPin,
    Phone,
    Save,
    Loader2,
    Plus,
    X,
    PlusCircle,
    Layers,
    Image as ImageIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createNewServiceAction, updateTechnicianProfile } from "../_actions/profileAndServiceAction";


const COMMON_SKILLS = [
    "Pipe Repair",
    "Circuit Breakers",
    "HVAC Maintenance",
    "Appliance Setup",
    "Wiring",
    "Leak Detection",
    "Painting",
    "Carpentry"
];

interface Props {
    initialProfile?: any;
    categories?: Array<{ categoryId?: string; id?: string; name: string }>;
}

export default function TechnicianProfileAndServiceForms({ initialProfile, categories = [] }: Props) {
    // --- Profile State ---
    const [profileLoading, setProfileLoading] = useState(false);
    const [bio, setBio] = useState(initialProfile?.bio || "");
    const [experienceYears, setExperienceYears] = useState(initialProfile?.experienceYears ?? 1);
    const [hourlyRate, setHourlyRate] = useState(initialProfile?.hourlyRate ?? 40);
    const [phone, setPhone] = useState(initialProfile?.user?.phone || "");
    const [address, setAddress] = useState(initialProfile?.user?.address || "");
    const [skills, setSkills] = useState<string[]>(initialProfile?.skills || []);
    const [customSkill, setCustomSkill] = useState("");

    // --- Service Creation State ---
    const [serviceLoading, setServiceLoading] = useState(false);
    const [serviceName, setServiceName] = useState("");
    const [categoryId, setCategoryId] = useState(categories[0]?.categoryId || categories[0]?.id || "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // Skill Handlers
    const handleAddSkill = (skillToAdd: string) => {
        const trimmed = skillToAdd.trim();
        if (!trimmed) return;
        if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
            toast.error("Skill already added");
            return;
        }
        setSkills((prev) => [...prev, trimmed]);
        setCustomSkill("");
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills((prev) => prev.filter((s) => s !== skillToRemove));
    };

    // Submit Profile Update
    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);

        const res = await updateTechnicianProfile({
            bio,
            experienceYears: Number(experienceYears),
            hourlyRate: Number(hourlyRate),
            skills,
            phone,
            address,
        });

        setProfileLoading(false);

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    // Submit New Service
    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!serviceName.trim() || !categoryId || !price || !description.trim()) {
            toast.error("Please fill in all required service fields");
            return;
        }

        setServiceLoading(true);

        const res = await createNewServiceAction({
            name: serviceName.trim(),
            categoryId,
            price: Number(price),
            description: description.trim(),
            imageUrl: imageUrl.trim() || undefined,
        });

        setServiceLoading(false);

        if (res.success) {
            toast.success(res.message);
            setServiceName("");
            setPrice("");
            setDescription("");
            setImageUrl("");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="space-y-10">
            {/* SECTION 1: Update Technician Profile */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                        <User className="h-6 w-6 text-amber-400" />
                        Update Technician Profile
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Keep your credentials, service areas, and trade skills up to date for potential clients.
                    </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <Card className="border-border/70 bg-card/60 backdrop-blur">
                        <CardContent className="p-6 space-y-4">
                            {/* Bio */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">
                                    Professional Bio / Introduction
                                </label>
                                <Textarea
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="e.g. Master electrician with 6+ years troubleshooting high-voltage panels, home automation, and repairs..."
                                    className="border-border/70 bg-background/50 text-xs focus-visible:ring-amber-400"
                                />
                            </div>

                            {/* Experience & Rate */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                                        Years of Experience
                                    </label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={50}
                                        value={experienceYears}
                                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                                        Standard Hourly Rate ($)
                                    </label>
                                    <Input
                                        type="number"
                                        min={5}
                                        max={500}
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>
                            </div>

                            {/* Phone & Address */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <Phone className="h-3.5 w-3.5 text-amber-400" />
                                        Contact Phone
                                    </label>
                                    <Input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="017XXXXXXXX"
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-amber-400" />
                                        Service Area / City
                                    </label>
                                    <Input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="e.g. Uttara / Ashulia, Dhaka"
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>
                            </div>

                            {/* Skills Management */}
                            <div className="space-y-3 pt-2 border-t border-border/40">
                                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                    <Wrench className="h-3.5 w-3.5 text-amber-400" />
                                    Trade Skills & Specialties
                                </label>

                                {/* Active Skill Badges */}
                                <div className="flex flex-wrap gap-2 min-h-[32px] p-2 rounded-xl border border-border/50 bg-background/30">
                                    {skills.length === 0 ? (
                                        <span className="text-xs text-muted-foreground italic">
                                            No skills added yet. Select or type below.
                                        </span>
                                    ) : (
                                        skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                className="bg-amber-400/10 text-amber-400 border border-amber-400/30 gap-1.5 text-xs py-1 px-2.5"
                                            >
                                                <span>{skill}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="hover:text-rose-400 transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))
                                    )}
                                </div>

                                {/* Add Custom Skill */}
                                <div className="flex gap-2">
                                    <Input
                                        value={customSkill}
                                        onChange={(e) => setCustomSkill(e.target.value)}
                                        placeholder="Add custom skill (e.g. Drain Unclogging, Generator Repair)"
                                        className="border-border/70 bg-background/50 text-xs"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleAddSkill(customSkill);
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleAddSkill(customSkill)}
                                        className="border-border/70 text-xs shrink-0 gap-1"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        <span>Add</span>
                                    </Button>
                                </div>

                                {/* Quick Presets */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {COMMON_SKILLS.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => handleAddSkill(tag)}
                                            className="text-[11px] rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 text-muted-foreground hover:border-amber-400/40 hover:text-amber-400 transition-colors"
                                        >
                                            + {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-3">
                                <Button
                                    type="submit"
                                    disabled={profileLoading}
                                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs h-9 px-5 gap-2 shadow-md shadow-amber-400/20"
                                >
                                    {profileLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    <span>{profileLoading ? "Updating Profile..." : "Save Profile Details"}</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </section>

            {/* SECTION 2: Create a New Service */}
            <section className="space-y-4 pt-6 border-t border-border/60">
                <div>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground flex items-center gap-2">
                        <PlusCircle className="h-6 w-6 text-amber-400" />
                        Create a New Service Offering
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                        Publish a specific service package that customers can discover and book across FixItNow.
                    </p>
                </div>

                <form onSubmit={handleServiceSubmit}>
                    <Card className="border-border/70 bg-card/60 backdrop-blur">
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Service Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        Service Name *
                                    </label>
                                    <Input
                                        type="text"
                                        required
                                        value={serviceName}
                                        onChange={(e) => setServiceName(e.target.value)}
                                        placeholder="e.g. Emergency Circuit Breaker Repair"
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <Layers className="h-3.5 w-3.5 text-amber-400" />
                                        Service Category *
                                    </label>
                                    <select
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        className="w-full h-9 rounded-md border border-border/70 bg-background/50 px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                                    >
                                        {categories.length === 0 ? (
                                            <option value="">No categories found</option>
                                        ) : (
                                            categories.map((cat: any) => (
                                                <option key={cat.categoryId || cat.id} value={cat.categoryId || cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Base Starting Price */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                                        Starting Base Price (60$) *
                                    </label>
                                    <Input
                                        type="number"
                                        required
                                        min={1}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="e.g. 60"
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>

                                {/* Optional Image URL */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                                        <ImageIcon className="h-3.5 w-3.5 text-sky-400" />
                                        Cover Image URL (Optional)
                                    </label>
                                    <Input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="border-border/70 bg-background/50 text-xs"
                                    />
                                </div>
                            </div>

                            {/* Service Description */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">
                                    Detailed Service Description *
                                </label>
                                <Textarea
                                    rows={3}
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe what's included in this service, diagnostic steps, parts replacement guarantees..."
                                    className="border-border/70 bg-background/50 text-xs"
                                />
                            </div>

                            <div className="flex justify-end pt-3">
                                <Button
                                    type="submit"
                                    disabled={serviceLoading}
                                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs h-9 px-5 gap-2 shadow-md shadow-amber-400/20"
                                >
                                    {serviceLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
                                    <span>{serviceLoading ? "Creating Service..." : "Publish Service"}</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </section>
        </div>
    );
}