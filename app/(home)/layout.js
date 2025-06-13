
import Header from '@/components/clients/header/Header';
import '../globals.css'
import DashboardState from '@/contextApi/DashboardState';
import Search from '@/components/clients/globals/search/Search';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/clients/Footer/Footer';
import { siteMetadata } from '@/seo/siteMetadata';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata = siteMetadata


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
