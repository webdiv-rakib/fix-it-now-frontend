import NavBar from '@/components/shared/NavBar'
import React from 'react'

const AuthGroupLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default AuthGroupLayout
