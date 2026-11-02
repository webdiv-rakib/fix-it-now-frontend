'use server'

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const getAuthToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
};

export const getAdminOverviewAction = async () => {
    const token = await getAuthToken();
    if (!token) return { success: false, data: null };

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/overview`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        return await res.json();
    } catch (error) {
        return { success: false, data: null };
    }
};

export const getAdminUsersAction = async () => {
    const token = await getAuthToken();
    if (!token) return { success: false, data: [] };

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        return await res.json();
    } catch (error) {
        return { success: false, data: [] };
    }
};