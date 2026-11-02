import Link from "next/link";
import { Wrench, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface ICategory {
    categoryId: string;
    name: string;
    description?: string;
    _count?: {
        services: number;
    };
}

export default function AllCategory({ category }: { category: ICategory }) {
    return (
        <Link href={`/services?category=${encodeURIComponent(category.name)}`} className="group block">
            <Card className="h-full border-border/70 bg-card/60 backdrop-blur transition-all duration-300 hover:border-amber-400/50 hover:bg-card/90 hover:shadow-lg hover:shadow-amber-400/5 hover:-translate-y-1">
                <CardContent className="p-5 flex flex-col justify-between h-full">
                    <div className="flex items-start justify-between gap-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                            <Wrench className="h-5 w-5" />
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <div className="mt-4 space-y-1">
                        <h3 className="font-bold text-sm text-foreground group-hover:text-amber-400 transition-colors">
                            {category.name}
                        </h3>
                        {category.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {category.description}
                            </p>
                        )}
                    </div>

                    {category._count?.services !== undefined && (
                        <div className="mt-4 pt-3 border-t border-border/40 text-[11px] font-semibold text-muted-foreground">
                            {category._count.services} Available Services
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}