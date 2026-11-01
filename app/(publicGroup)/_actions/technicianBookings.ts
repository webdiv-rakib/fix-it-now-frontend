/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

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
            `${process.env.BACKEND_API_URL}/api/booking/update-status/${bookingId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
                cache: "no-store",
            }
        );

        const result = await res.json();

        // Revalidate pages so updates reflect across both roles
        revalidatePath("/technician/bookings");
        revalidatePath("/dashboard/bookings");

        return result;
    } catch (error: any) {
        return { success: false, message: error?.message || "Failed to update status" };
    }
};