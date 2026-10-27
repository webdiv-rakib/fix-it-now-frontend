import NavBar from '@/components/shared/NavBar'
import React from 'react'

const DashboardGroupLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default DashboardGroupLayout
