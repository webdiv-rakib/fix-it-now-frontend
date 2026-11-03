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

// 1. Fetch technician's current profile data
export const getTechnicianProfileData = async () => {
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

// 2. Fetch available categories for service creation
export const getCategoriesForService = async () => {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
            cache: "no-store",
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, data: [] };
    }
};

// 3. Update Technician Profile Action
export const updateTechnicianProfile = async (payload: {
    bio?: string;
    experienceYears?: number;
    hourlyRate?: number;
    skills?: string[];
    phone?: string;
    address?: string;
}) => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/technician-profile-update`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok || result?.success) {
            revalidatePath("/technician-dashboard");
            revalidatePath("/technicians");
            return { success: true, message: result?.message || "Profile updated successfully" };
        }

        return { success: false, message: result?.message || "Failed to update profile" };
    } catch (error: any) {
        return { success: false, message: error?.message || "Something went wrong" };
    }
};

// 4. Create New Service Action
export const createNewServiceAction = async (payload: {
    name: string;
    categoryId: string;
    price: number;
    description: string;
    imageUrl?: string;
}) => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/create-service`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (res.ok || result?.success) {
            revalidatePath("/services");
            revalidatePath("/technician-dashboard");
            return { success: true, message: result?.message || "Service created successfully" };
        }

        return { success: false, message: result?.message || "Failed to create service" };
    } catch (error: any) {
        return { success: false, message: error?.message || "Something went wrong" };
    }
};