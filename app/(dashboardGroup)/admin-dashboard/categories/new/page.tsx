'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createCategoryAction } from "@/app/(dashboardGroup)/_actions/adminActions";


export default function CreateCategoryPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Category name is required.");
            return;
        }

        setLoading(true);
        setError(null);

        const res = await createCategoryAction({ name, description });

        if (res?.success) {
            router.push("/admin-dashboard/categories");
        } else {
            setLoading(false);
            setError(res?.message || "Failed to create category");
        }
    };

    return (
        <div className="max-w-xl space-y-6">
            <Link
                href="/admin-dashboard/categories"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Categories</span>
            </Link>

            <Card className="border-border/70 bg-card/60 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-foreground">Create New Category</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground">
                        Enter the details for the new service domain.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Category Name *</label>
                            <Input
                                placeholder="e.g. Electrical & Repair"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-xs h-9"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-foreground">Description (Optional)</label>
                            <Textarea
                                placeholder="Brief description of what services fall under this category..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="text-xs resize-none"
                            />
                        </div>

                        {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}

                        <div className="pt-2 flex justify-end gap-2">
                            <Link href="/admin-dashboard/categories">
                                <Button type="button" variant="ghost" size="sm" className="text-xs">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                size="sm"
                                disabled={loading}
                                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs gap-1.5 h-9"
                            >
                                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <PlusCircle className="h-3.5 w-3.5" />}
                                Save Category
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}