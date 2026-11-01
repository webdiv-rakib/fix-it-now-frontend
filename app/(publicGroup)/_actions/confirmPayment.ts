/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const confirmPaymentAction = async (sessionId: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token || !sessionId) {
        return { success: false, message: "Missing session or token" };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sessionId }),
            cache: "no-store",
        });

        const result = await res.json();

        // Clear Next.js cache so the customer dashboard displays the fresh "PAID" status
        revalidatePath("/dashboard/bookings");

        return result;
    } catch (error: any) {
        return { success: false, message: error?.message || "Confirmation failed" };
    }
};