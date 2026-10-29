import Link from 'next/link'
import React from 'react'
export type ICategory = {
    categoryId: string,
    name: string,
    description: string
}
type Category = {
    category: ICategory
}

const AllCategory = ({ category }: Category) => {
    return (
        <Link
            href={`/services?category=${encodeURIComponent(category.name)}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-400 hover:shadow-sm hover:shadow-amber-400/10 active:scale-95"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 transition-transform duration-200 group-hover:scale-125 group-hover:bg-amber-400" />
            <span>{category.name}</span>
        </Link>
    )
}

export default AllCategory
