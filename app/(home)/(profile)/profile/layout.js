import React from 'react'
import Profile from './Profile'

export default function ProfileLayout({ children }) {
    return (
        <div>
            <Profile />
            {children}
        </div>
    )
}
