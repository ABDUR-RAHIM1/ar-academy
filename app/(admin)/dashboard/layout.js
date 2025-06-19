import Sidebar from '@/components/dashboard/Sidebar'
import "@/app/globals.css"
import React from 'react'
import DashboardHeader from '@/components/dashboard/Header';
import DashboardState from '@/contextApi/DashboardState';
import { Toaster } from 'react-hot-toast';
import { siteMetadata } from '@/seo/siteMetadata';

export const metadata = siteMetadata

export default function DashboardLayout({ children }) {
    return (

        <html lang="en">
            <body cz-shortcut-listen="true">

                <Toaster />
                <div className='flex h-screen'>
                    <DashboardState>
                        <Sidebar />
                        <main className=' w-full md:flex-1 bg-gray-200 overflow-y-auto'>
                            <DashboardHeader />
                            <div className='p-3'>
                                {children}
                                <div className=' my-5' />
                            </div>
                        </main>
                    </DashboardState>
                </div>
            </body>
        </html>
    )
}
