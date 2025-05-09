import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e40af] text-white p-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">© ২০২৫ অনুশীলন একাডেমী । সমস্ত অধিকার সংরক্ষিত।</p>
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="/about-us" className="hover:text-[#0891b2]">আমাদের সম্পর্কে</Link>
          <Link href="/contact" className="hover:text-[#0891b2]">যোগাযোগ করুন</Link>
          <Link href="/privacy-policy" className="hover:text-[#0891b2]">গোপনীয়তা নীতি</Link>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
