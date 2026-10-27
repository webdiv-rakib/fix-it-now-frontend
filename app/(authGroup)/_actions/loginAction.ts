'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from 'jsonwebtoken'

type LoginState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    console.log(formData);
    console.log(prevState, "prev state")
    const email = formData.get('email');
    const password = formData.get('password');
    // console.log(email, password);
    const payload = {
        email,
        password
    };

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,
        {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(payload)
        }
    )
    const result = await res.json();
    // console.log(result);
    // Set Cookies to the browser
    if (result.success) {
        const cookieStore = await cookies()
        cookieStore.set('accessToken', result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: 'lax'
        });
        cookieStore.set('refreshToken', result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'lax'
        });
        // redirect('/dashboard', 'replace');
    };

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    if (decodedToken.role === 'CUSTOMER') {
        redirect('/dashboard')
    }
    else if (decodedToken.role === 'TECHNICIAN') {
        redirect('/technician-dashboard')
    }
    else if (decodedToken.role === "ADMIN") {
        redirect('/admin-dashboard')
    }

    // console.log(result)
    return result;
}