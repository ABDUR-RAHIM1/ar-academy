
import Header from '@/components/clients/header/Header';
import '../globals.css'
import DashboardState from '@/contextApi/DashboardState';
import Search from '@/components/clients/globals/search/Search';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/clients/Footer/Footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import 'katex/dist/katex.min.css';
import { API_URL } from '@/constans';

export const metadata = {
  title: {
    default: 'Onushilon Academy - Learn & Grow',
    template: '%s -- Onushilon Academy - Learn & Grow',
  },
  description: `Onushilon Academy is a leading Bangladeshi platform for complete job preparation, live exams, previous job exam solutions, and skill development. সরকারি-বেসরকারি চাকরির জন্য প্রস্তুতি নিন, এক্সপার্ট-গাইডেড কোর্স এবং রিয়েল-টাইম লাইভ এক্সাম এর মাধ্যমে ক্যারিয়ারে এগিয়ে যান।`,
  openGraph: {
    title: 'Onushilon Academy - Learn & Grow',
    description: `Onushilon Academy is a leading Bangladeshi platform for complete job preparation, live exams, previous job exam solutions, and skill development. সরকারি-বেসরকারি চাকরির জন্য প্রস্তুতি নিন, এক্সপার্ট-গাইডেড কোর্স এবং রিয়েল-টাইম লাইভ এক্সাম এর মাধ্যমে ক্যারিয়ারে এগিয়ে যান।`,
    url: API_URL,
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
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </DashboardState>
      </body>
    </html>
  );
}
