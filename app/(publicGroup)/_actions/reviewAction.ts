/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface ReviewPayload {
    bookingId: string;
    serviceId: string;
    rating: number;
    comment: string;
}

export const submitReviewAction = async (payload: ReviewPayload) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return { success: false, message: "Please log in to submit a review." };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        const result = await res.json();

        if (result?.success) {
            revalidatePath("/dashboard/bookings");
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to submit review",
        };
    }
};