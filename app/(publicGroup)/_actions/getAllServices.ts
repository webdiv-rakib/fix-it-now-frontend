'use server'
export const getAllCategories = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
        cache: 'force-cache'
    })
    const result = await res.json();
    return result
}