/* eslint-disable @typescript-eslint/no-unused-vars */
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

// 1. Overview
export const getAdminOverviewAction = async () => {
    const headers = await getAuthHeaders();
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/overview`, {
        headers,
        cache: "no-store",
    });
    return res.json();
};

export const getAdminUsersAction = async () => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
            headers,
            cache: "no-store",
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, data: [] };
    }
};

// 2. Update User Status (ACTIVE <-> BANNED)
export const updateUserStatusAction = async (userId: string, status: "ACTIVE" | "BANNED") => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ status }),
        });
        const result = await res.json();
        revalidatePath("/admin-dashboard/users");
        return result;
    } catch (error: any) {
        return { success: false, message: error?.message || "Failed to update user status" };
    }
};

// 3. Get All Bookings
export const getAdminBookingsAction = async () => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
            headers,
            cache: "no-store",
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, data: [] };
    }
};

// 4. Get All Categories
export const getAdminCategoriesAction = async () => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
            headers,
            cache: "no-store",
        });
        return await res.json();
    } catch (error: any) {
        return { success: false, data: [] };
    }
};

// 5. Create Category
export const createCategoryAction = async (payload: { name: string; description?: string }) => {
    const headers = await getAuthHeaders();
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/create-categories`, {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
        });
        const result = await res.json();
        revalidatePath("/admin-dashboard/categories");
        return result;
    } catch (error: any) {
        return { success: false, message: error?.message || "Failed to create category" };
    }
};