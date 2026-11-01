'use server'

import { cookies } from "next/headers";

export const getUserBookings = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return { success: false, data: [] };

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/booking`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
};