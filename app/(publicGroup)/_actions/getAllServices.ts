'use server'
export const getAllServices = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
        cache: 'force-cache',
        next: {
            revalidate: 60 * 60 * 24, // 24 hou
            tags: ['services'],
        }
    });
    const result = await res.json()
    return result;
}