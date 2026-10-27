'use server'

import { cookies } from "next/headers"

export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        // throw new Error('User Not Logged In')
        return {
            suceess: false,
            message: 'User Not Logged In'
        }
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/profile`, {
        headers: {
            Cookie: `accessToken=${accessToken}`
        },
        // cache: 'no-store'
    });
    const result = res.json();
    console.log(result)
    return result
}