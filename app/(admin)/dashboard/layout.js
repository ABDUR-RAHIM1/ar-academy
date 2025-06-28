import Sidebar from '@/components/dashboard/Sidebar'
import "@/app/globals.css"
import React from 'react'
import DashboardHeader from '@/components/dashboard/Header';
import DashboardState from '@/contextApi/DashboardState';
import { Toaster } from 'react-hot-toast';
import { BASE_URL } from '@/constans';

export const metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: 'Onushilon Academy - Learn & Grow',
        template: '%s -- Onushilon Academy - Learn & Grow',
    },
    description: `Onushilon Academy is a leading Bangladeshi platform for complete job preparation, live exams, previous job exam solutions, and skill development. সরকারি-বেসরকারি চাকরির জন্য প্রস্তুতি নিন, এক্সপার্ট-গাইডেড কোর্স এবং রিয়েল-টাইম লাইভ এক্সাম এর মাধ্যমে ক্যারিয়ারে এগিয়ে যান।`,
    openGraph: {
        title: 'Onushilon Academy - Learn & Grow',
        description: `Onushilon Academy is a leading Bangladeshi platform for complete job preparation, live exams, previous job exam solutions, and skill development. সরকারি-বেসরকারি চাকরির জন্য প্রস্তুতি নিন, এক্সপার্ট-গাইডেড কোর্স এবং রিয়েল-টাইম লাইভ এক্সাম এর মাধ্যমে ক্যারিয়ারে এগিয়ে যান।`,
        url: BASE_URL,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Onushilon Academy OG Image',
            },
        ],
        siteName: 'Onushilon Academy',
        type: 'website',
        locale: 'bn_BD',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Onushilon Academy - Learn & Grow',
        description: `Onushilon Academy is a leading Bangladeshi platform for complete job preparation, live exams, previous job exam solutions, and skill development. সরকারি-বেসরকারি চাকরির জন্য প্রস্তুতি নিন, এক্সপার্ট-গাইডেড কোর্স এবং রিয়েল-টাইম লাইভ এক্সাম এর মাধ্যমে ক্যারিয়ারে এগিয়ে যান।`,
        images: ['/og-image.png'],
    },
};



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
