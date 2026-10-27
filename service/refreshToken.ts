'use server'

import { cookies } from "next/headers"

export const getNewAccessToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) {
        // throw new Error("User Not Logged In")
        return {
            sucsess: false,
            message: "Refresh token not found"
        }
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            // Authorization : accessToken as unknown as string,
            // Authorization: `${accessToken}`,
            // Authorization: `Bearer ${accessToken}`,
            Cookie: `refreshToken=${refreshToken}`
        },
        cache: "no-cache",
    });

    const result = await res.json();
    // console.log(result)
    return result
}