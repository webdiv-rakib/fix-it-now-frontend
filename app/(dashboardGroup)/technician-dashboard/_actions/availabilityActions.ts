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

// 1. Fetch technician's current profile & slots
export const getTechnicianProfile = async () => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/profile`, {
            headers,
            cache: "no-store",
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, data: null, message: error?.message };
    }
};

// 2. Patch updated available slots
export const updateAvailabilityAction = async (availableSlots: string[]) => {
    const headers = await getAuthHeaders();

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/technician-profile-update`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ availableSlots }),
        });

        const result = await res.json();

        if (res.ok || result?.success) {
            revalidatePath("/technician-dashboard/availability");
            revalidatePath("/technicians");
            return {
                success: true,
                message: result?.message || "Available slots updated successfully"
            };
        }

        return {
            success: false,
            message: result?.message || "Failed to update availability",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "An unexpected error occurred",
        };
    }
};