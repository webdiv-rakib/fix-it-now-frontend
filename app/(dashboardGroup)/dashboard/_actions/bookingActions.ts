/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const getAuthHeaders = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const cancelBookingAction = async (bookingId: string) => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/booking/cancel/${bookingId}`, {
            method: "PUT",
            headers,
        });

        const data = await res.json();

        if (data?.success || res.ok) {
            revalidatePath("/dashboard/customer");
            revalidatePath("/dashboard");
            return { success: true, message: data?.message || "Booking cancelled successfully" };
        }

        return {
            success: false,
            message: data?.message || "Failed to cancel booking",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "An unexpected error occurred",
        };
    }
};