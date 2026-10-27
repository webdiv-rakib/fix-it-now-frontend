/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

export type RegisterState = {
    success: boolean;
    statusCode?: number;
    message?: string;
    data?: any;
} | null;


export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    console.log(formData);
    const role = formData.get('role');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const payload = {
        role,
        name,
        email,
        phone,
        password
    }
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/registration`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(payload)
        })
        const result = await res.json();
        return result
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error?.message || 'Failed to connect to the server. Please try again.'
        }
    }
}