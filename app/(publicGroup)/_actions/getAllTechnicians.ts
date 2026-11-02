'use server'

export const getAllTechnicians = async (category?: string, search?: string) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const hasFilters = Boolean(category || search);

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/all-technicians${queryString}`, {
        ...(hasFilters
            ? { cache: "no-store" }
            : {
                cache: "force-cache",
                next: {
                    revalidate: 60 * 60 * 24, // 24 hours
                    tags: ["technicians"],
                },
            }),
    });

    const result = await res.json();
    return result;
};