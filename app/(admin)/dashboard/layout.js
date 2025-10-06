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
        default: 'অ্যাডমিনঃ অনুশীলন একাডেমী',
        template: '%s -- অনুশীলন একাডেমী',
    },
    description: `অনুশীলন একাডেমী: সরকারি-বেসরকারি চাকরির সম্পূর্ণ প্রস্তুতি, প্রতিদিন লাইভ এক্সাম, বিগত বছরের প্রশ্ন সমাধান, এবং একাডেমিক, ভর্তি ও পেশাদার স্কিল ডেভেলপমেন্টের জন্য বাংলাদেশের সেরা অনলাইন প্ল্যাটফর্ম। এখানে পাবেন বিশাল প্রশ্ন ডেটাবেস, অধ্যায়ভিত্তিক ও মডেল টেস্ট, তাৎক্ষণিক ফলাফল ও লিডারবোর্ডের সুবিধা। স্মার্ট প্রস্তুতির মাধ্যমে আপনার উজ্জ্বল ভবিষ্যৎ নিশ্চিত করুন।`,
    alternates: {
        canonical: `${BASE_URL}/dashboard`,
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
    },
    openGraph: {
        title: 'অনুশীলন একাডেমী: চাকরির প্রস্তুতি, লাইভ এক্সাম ও স্কিল ডেভেলপমেন্ট',
        description: `অনুশীলন একাডেমী: সরকারি-বেসরকারি চাকরির সম্পূর্ণ প্রস্তুতি, প্রতিদিন লাইভ এক্সাম, বিগত বছরের প্রশ্ন সমাধান, এবং একাডেমিক, ভর্তি ও পেশাদার স্কিল ডেভেলপমেন্টের জন্য বাংলাদেশের সেরা অনলাইন প্ল্যাটফর্ম। এখানে পাবেন বিশাল প্রশ্ন ডেটাবেস, অধ্যায়ভিত্তিক ও মডেল টেস্ট, তাৎক্ষণিক ফলাফল ও লিডারবোর্ডের সুবিধা। স্মার্ট প্রস্তুতির মাধ্যমে আপনার উজ্জ্বল ভবিষ্যৎ নিশ্চিত করুন।`,
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
        title: 'অনুশীলন একাডেমী: চাকরির প্রস্তুতি, লাইভ এক্সাম ও স্কিল ডেভেলপমেন্ট',
        description: `অনুশীলন একাডেমী: সরকারি-বেসরকারি চাকরির সম্পূর্ণ প্রস্তুতি, প্রতিদিন লাইভ এক্সাম, বিগত বছরের প্রশ্ন সমাধান, এবং একাডেমিক, ভর্তি ও পেশাদার স্কিল ডেভেলপমেন্টের জন্য বাংলাদেশের সেরা অনলাইন প্ল্যাটফর্ম। এখানে পাবেন বিশাল প্রশ্ন ডেটাবেস, অধ্যায়ভিত্তিক ও মডেল টেস্ট, তাৎক্ষণিক ফলাফল ও লিডারবোর্ডের সুবিধা। স্মার্ট প্রস্তুতির মাধ্যমে আপনার উজ্জ্বল ভবিষ্যৎ নিশ্চিত করুন।`,
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
                        <main className=' w-full md:flex-1 bg-gray-100 overflow-y-auto'>
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
