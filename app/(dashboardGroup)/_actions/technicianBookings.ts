/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getTechnicianBookings = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return { success: false, data: [] };

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/booking/technician-bookings`, {
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

export const updateBookingStatusAction = async (
    bookingId: string,
    status: "ACCEPTED" | "REJECTED" | "COMPLETED"
) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/booking/update-booking-status/${bookingId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            }
        );

        const result = await res.json();
        revalidatePath("/technician/bookings");
        return result;
    } catch (error: any) {
        return { success: false, message: error?.message || "Failed to update status" };
    }
};