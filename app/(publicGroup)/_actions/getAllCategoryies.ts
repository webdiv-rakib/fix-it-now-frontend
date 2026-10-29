'use server'
export default async function getAllCategories() {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
        cache: 'force-cache'

    })
    const result = await res.json();
    return result
}