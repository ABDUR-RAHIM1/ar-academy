import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e40af] text-white p-6 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-sm">© ২০২৫ অনুশীলন একাডেমী । সমস্ত অধিকার সংরক্ষিত।</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="/about" className="hover:text-[#0891b2]">আমাদের সম্পর্কে</a>
          <a href="/contact" className="hover:text-[#0891b2]">যোগাযোগ করুন</a>
          <a href="/privacy-policy" className="hover:text-[#0891b2]">গোপনীয়তা নীতি</a>
          <a href="/terms" className="hover:text-[#0891b2]">সেবা শর্তাবলী</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
