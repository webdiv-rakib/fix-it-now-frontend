'use server'
export const getAllTechnicians = async () => {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/all-technician`, {
        cache: 'force-cache',
        next:{
            revalidate: 60 * 60 * 24, // 24 hours
            tags: ['technicians'],
        }
    });
    const result = await res.json();
    return result
}