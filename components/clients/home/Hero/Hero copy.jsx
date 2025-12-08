import { COMMON_ALT_TEXT } from '@/constans'; 
import { heroImage } from '@/Images/Images';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (

    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-5 md:px-10 py-10 md:py-20 border-b bg2"
    >

      {/* Text Content */}
      <div className="w-full lg:w-[50%] text-center lg:text-left space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
          অনুশীলন একাডেমী
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold color1">
          শেখা এখন আরও সহজ ও মজার
        </h2>
        <p className="text-base sm:text-lg text-black max-w-lg mx-auto lg:mx-0">
          এক জায়গায় সবকিছু: পড়াশোনা, প্রস্তুতি, পরীক্ষা ও মূল্যায়ন! অনলাইনে ঘরে বসেই শেখো নিজের গতিতে।
        </p>

        <div className="flex items-center gap-4 pt-2">
          <Link href="/account/register">
            <button className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              রেজিস্টার করো <FiArrowRight />
            </button>
          </Link>

          <Link href="/categories">
            <button className="px-6 py-3 rounded-xl bg-white text-blue-900 hover:bg-gray-100 font-semibold shadow-md transition-all duration-300">
              ফিচারস ব্রাউজ করো
            </button>
          </Link>
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


    </div>
  );
}
