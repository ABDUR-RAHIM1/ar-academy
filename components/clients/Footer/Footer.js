import Link from 'next/link';
import React from 'react';
import { Facebook, Youtube, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1e40af] text-white pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Section 1: Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <span className="bg-white text-[#1e40af] px-2 py-1 rounded-lg italic">A</span>
              অনুশীলন একাডেমী
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-xs">
              আমরা শিক্ষার্থীদের দক্ষতা বৃদ্ধিতে এবং মানসম্মত শিক্ষা প্রদানে প্রতিশ্রুতিবদ্ধ। অনুশীলনের সাথেই শুরু হোক আপনার সাফল্যের যাত্রা।
            </p>
            <div className="flex space-x-4 pt-2">
              <a target='_blank' href="https://www.facebook.com/OnushilonAcademy360/" className="p-2 bg-blue-700/50 rounded-full hover:bg-blue-500 transition-colors">
                <Facebook size={18} />
              </a>
              <Link href="#" className="p-2 bg-blue-700/50 rounded-full hover:bg-blue-500 transition-colors">
                <Youtube size={18} />
              </Link>
              <Link href="#" className="p-2 bg-blue-700/50 rounded-full hover:bg-blue-500 transition-colors">
                <Globe size={18} />
              </Link>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-blue-400/30 pb-2 inline-block">লিঙ্কসমূহ</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link href="/about-us" className="hover:text-blue-300 transition-colors">আমাদের সম্পর্কে</Link></li>
                <li><Link href="/courses" className="hover:text-blue-300 transition-colors">সকল কোর্স</Link></li>
                <li><Link href="/contact" className="hover:text-blue-300 transition-colors">যোগাযোগ</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b border-blue-400/30 pb-2 inline-block">আইনগত</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li><Link href="/privacy-policy" className="hover:text-blue-300 transition-colors">গোপনীয়তা নীতি</Link></li>
                <li><Link href="/terms" className="hover:text-blue-300 transition-colors">শর্তাবলী</Link></li>
              </ul>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg border-b border-blue-400/30 pb-2 inline-block">সরাসরি যোগাযোগ</h3>
            <ul className="space-y-3 text-sm text-blue-100">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-300" />
                <span>+৮৮০ ১২৩৪-৫৬৭৮৯০</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-blue-300" />
                <span>onushilona@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-blue-300" />
                <span>লালমনিরহাট, রংপুর, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700/50 pt-8 mt-8 flex flex-col md:row items-center justify-between gap-4 text-xs text-blue-300 font-medium tracking-wide">
          <p>© ২০২৬ অনুশীলন একাডেমী । সমস্ত অধিকার সংরক্ষিত।</p>
          <p>Developed by <a href='https://www.facebook.com/Aabdurrahim.17' target='_blank' className="text-white underline">Abdur Rahim</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;