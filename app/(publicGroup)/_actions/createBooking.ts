/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface BookingPayload {
    serviceId: string;
    scheduleDate: string;
    serviceAddress: string;
    notes?: string;
}

export const createBooking = async (payload: BookingPayload) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        redirect("/login");
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/booking/create-booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                serviceId: payload.serviceId,
                scheduleDate: new Date(payload.scheduleDate).toISOString(),
                serviceAddress: payload.serviceAddress,
                notes: payload.notes || "",
            }),
        });

        return await res.json();
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Failed to create booking",
        };
    }
};