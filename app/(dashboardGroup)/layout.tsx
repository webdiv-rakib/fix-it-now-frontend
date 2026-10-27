import NavBar from '@/components/shared/NavBar'
import { getMe } from '@/service/getMe';
import React from 'react'

const DashboardGroupLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();
    return (
        <div>
            <NavBar user={user} />
            {children}
        </div>
    )
}

export default DashboardGroupLayout
