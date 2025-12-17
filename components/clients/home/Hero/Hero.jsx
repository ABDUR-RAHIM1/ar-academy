import { Button } from '@/components/ui/button';
import { COMMON_ALT_TEXT } from '@/constans';
import { heroImage } from '@/Images/Images';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (

    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-5 md:px-10 py-10 md:py-20 border-b heroBg"
    >

      {/* Text Content */}
      <div className="w-full lg:w-[50%] text-center lg:text-left space-y-6">

        <svg
          viewBox="0 0 1200 150"  // height কমানো
          className="w-full max-w-[700px] mx-auto lg:mx-0"
        >
          <defs>
            <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          <text
            x="0"
            y="110"               // vertical position ঠিক করা
            fill="url(#heroGrad)"
            style={{ fontSize: "100px", fontWeight: 800 }}
          >
            অনুশীলন একাডেমী
          </text>
        </svg>

        {/* Gradient Secondary Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold 
                 bg-gradient-to-r from-indigo-600 to-blue-500 
                 text-transparent bg-clip-text">
          শেখা এখন আরও সহজ ও মজার
        </h2>

        {/* Normal Paragraph */}
        <p className="text-base sm:text-lg text-black max-w-lg mx-auto lg:mx-0">
          এক জায়গায় সবকিছু: পড়াশোনা, প্রস্তুতি, পরীক্ষা ও মূল্যায়ন!
          অনলাইনে ঘরে বসেই শেখো নিজের গতিতে।
        </p>

        <div className="grid grid-cols-2  gap-4 pt-4 px-5">

          {/* Student Account */}
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl shadow-lg backdrop-blur-xl transition-all duration-300 flex items-center gap-2 text-[15px] md:text-lg"
          >
            <Link href="/account/student/register">
              শিক্ষার্থী একাউন্ট <FiArrowRight className="text-xl" />
            </Link>
          </Button>

            {/* Sub Admin Account */}
          <Button
            asChild
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-5 rounded-xl shadow-md transition-all duration-300 text-[15px] md:text-lg"
          >
            <Link href="/account/subAdmin/register">
              সাব অ্যাডমিন একাউন্ট
            </Link>
          </Button>

          {/* Features Browse */}
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 px-7 py-5 rounded-xl shadow-lg transition-all duration-300 text-[15px] md:text-lg"
          >
            <Link href="/categories">
              ফিচারস ব্রাউজ করো
            </Link>

          </Button>
          <Button asChild className="bg-purple-600 hover:bg-purple-700  text-white hover:opacity-90 px-7 py-5 rounded-xl shadow-lg transition-all duration-300 text-[15px] md:text-lg">
            <Link href="/courses">
              কোর্স সমূহ
            </Link>
          </Button>

        </div>

      </div>

      {/* Image Section */}
      <div className="w-full lg:w-[50%] flex justify-center items-center">
        <Image
          src={heroImage}
          width={1000}
          height={1000}
          alt={COMMON_ALT_TEXT}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* <div className="w-full lg:w-[45%] flex justify-center items-center">
        <svg
          className="w-[80%] h-auto"
          viewBox="0 0 640 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="640" height="480" fill="white" />
          <circle cx="320" cy="240" r="200" fill="#E0F2FE" />
  
          <rect x="230" y="170" width="180" height="140" rx="8" fill="#3B82F6" />
          <path d="M230 170 L320 210 L410 170" fill="#2563EB" />
          <line x1="230" y1="170" x2="230" y2="310" stroke="#1E3A8A" strokeWidth="2" />
          <line x1="410" y1="170" x2="410" y2="310" stroke="#1E3A8A" strokeWidth="2" />
 
          <rect x="290" y="320" width="60" height="10" rx="2" fill="#FACC15" />
          <polygon points="350,320 360,325 350,330" fill="#EF4444" />
 
          <text x="320" y="220" textAnchor="middle" fontSize="18" fill="white" fontWeight="bold">
            EDUCATION
          </text>
        </svg>
      </div> */}


    </div >
  );
}
