'use server'

export const getAllServices = async (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const queryString = params.toString() ? `?${params.toString()}` : "";

    // Dynamic searches/categories should not be statically cached for 24h across all users,
    // but baseline requests can stay cached.
    const hasFilters = Boolean(category || search);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services${queryString}`, {
        ...(hasFilters
            ? { cache: "no-store" }
            : {
                cache: "force-cache",
                next: {
                    revalidate: 60 * 60 * 24, // 24 hours
                    tags: ["services"],
                },
            }),
    });

    const result = await res.json();
    return result;
};