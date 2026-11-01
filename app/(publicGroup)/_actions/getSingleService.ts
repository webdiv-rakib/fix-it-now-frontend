'use server'

export const getSingleService = async (serviceId: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${serviceId}`, {
            cache: "no-store",
        });
        return await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return { success: false, data: null };
    }
};