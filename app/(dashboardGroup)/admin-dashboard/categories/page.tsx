/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, FolderTree } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminCategoriesAction } from "../../_actions/adminActions";


export default async function AdminCategoriesPage() {
    const res = await getAdminCategoriesAction();
    const categories = Array.isArray(res?.data) ? res.data : [];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-foreground">Service Categories</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Manage categories used to group specialist services.
                    </p>
                </div>
                <Link href="/admin-dashboard/categories/new">
                    <Button className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs gap-1.5 h-9 shadow-md shadow-amber-400/20">
                        <Plus className="h-4 w-4" />
                        <span>Create Category</span>
                    </Button>
                </Link>
            </div>

            {categories.length === 0 ? (
                <Card className="border-dashed border-border/70 bg-card/40 p-12 text-center">
                    <p className="text-sm text-muted-foreground">No categories created yet.</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((c: any) => {
                        const id = c.categoryId || c.id;
                        return (
                            <Card key={id} className="border-border/70 bg-card/60 backdrop-blur transition-all hover:border-amber-400/40">
                                <CardContent className="p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FolderTree className="h-4 w-4 text-amber-400" />
                                            <h3 className="font-bold text-sm text-foreground">{c.name}</h3>
                                        </div>
                                        {c._count?.services !== undefined && (
                                            <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                                {c._count.services} services
                                            </Badge>
                                        )}
                                    </div>
                                    {c.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {c.description}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}