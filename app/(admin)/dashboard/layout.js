import Sidebar from '@/components/dashboard/Sidebar'
import "@/app/globals.css"
import React from 'react'
import DashboardHeader from '@/components/dashboard/Header';
import DashboardState from '@/contextApi/DashboardState';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: "Onushilon Academy | Online Courses and Skill Development",
    description: "Onushilon Academy offers various online courses and skill development programs designed to help individuals enhance their professional skills.",
    keywords: "Onushilon Academy, online courses, skill development, education, learning, professional growth, online classes",
};

export default function DashboardLayout({ children }) {
    return (

        <html lang="en">
            <body cz-shortcut-listen="true">

                <Toaster />
                <div className='flex'>
                    <DashboardState>
                        <Sidebar />
                        <main className=' w-full md:flex-1 h-screen bg-gray-200 overflow-y-auto'>
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
