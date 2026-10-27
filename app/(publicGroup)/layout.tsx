import NavBar from '@/components/shared/NavBar'
import React from 'react'

const PublicGroupLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default PublicGroupLayout
