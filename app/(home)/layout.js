
import Header from '@/components/clients/header/Header';
import '../globals.css'
import DashboardState from '@/contextApi/DashboardState';
import Search from '@/components/clients/globals/search/Search';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/clients/Footer/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import 'katex/dist/katex.min.css';
import { BASE_URL } from '@/constans';
import LiveSupportChat from '@/components/clients/liveSupport/LiveSupport';
import { SEO_KEYWORDS } from '@/seo/keywords';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'অনুশীলন একাডেমী: চাকরির প্রস্তুতি, লাইভ এক্সাম ও স্কিল ডেভেলপমেন্ট',
    template: '%s -- অনুশীলন একাডেমী',
  },
  description: `অনুশীলন একাডেমী: সরকারি-বেসরকারি চাকরির সম্পূর্ণ প্রস্তুতি, প্রতিদিন লাইভ এক্সাম, বিগত বছরের প্রশ্ন সমাধান, এবং একাডেমিক, ভর্তি ও পেশাদার স্কিল ডেভেলপমেন্টের জন্য বাংলাদেশের সেরা অনলাইন প্ল্যাটফর্ম। এখানে পাবেন বিশাল প্রশ্ন ডেটাবেস, অধ্যায়ভিত্তিক ও মডেল টেস্ট, তাৎক্ষণিক ফলাফল ও লিডারবোর্ডের সুবিধা। স্মার্ট প্রস্তুতির মাধ্যমে আপনার উজ্জ্বল ভবিষ্যৎ নিশ্চিত করুন।`,
  keywords: SEO_KEYWORDS.home,
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    // shortcut: '/favicon.ico',
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




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" >
        <DashboardState>
          <Toaster />
          <TooltipProvider>
            <Search />     {/*  dynamicaly Show and hide , when click header Search Input */}
            <Header />
            <main className=' min-h-screen'>

              <LiveSupportChat />
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </DashboardState>
      </body>
    </html>
  );
}
