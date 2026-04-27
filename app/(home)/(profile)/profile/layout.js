import React from 'react'
import Profile from './Profile'

export default function ProfileLayout({ children }) {
    return (
        <div className=' md:mx-10 max-w-[1440px] mx-auto min-h-screen'>
            <Profile />
            {children}
        </div>
    )
}
