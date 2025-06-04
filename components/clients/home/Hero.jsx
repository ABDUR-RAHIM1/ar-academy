import { COMMON_ALT_TEXT } from '@/constans'
import { heroImage } from '@/Images/Images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <section className="w-full min-h-[70vh] bg2 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide leading-tight drop-shadow-md mb-6">
            Onushilon Academy – শেখা এখন আরও সহজ ও মজার
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-10 drop-shadow-sm max-w-lg mx-auto lg:mx-0">
            এক জায়গায় সবকিছু: পড়াশোনা, প্রস্তুতি, পরীক্ষা ও মূল্যায়ন! অনলাইনে ঘরে বসেই শেখো নিজের গতিতে।
          </p>
          <div className="flex justify-center lg:justify-start gap-6">
            <Link href="/categories" className="inline-block">
              <button className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition duration-300 font-semibold shadow-lg drop-shadow-lg">
                এখনই শুরু করুন
              </button>
            </Link>
            <Link href="/categories" className="inline-block">
              <button className="px-8 py-3 rounded-xl bg-white text-blue-800 font-semibold hover:bg-gray-100 transition duration-300 shadow-md">
                কোর্স ব্রাউজ করুন
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/2 max-w-md mx-auto lg:mx-0">
          <Image
            src={heroImage}
            width={500}
            height={500}
            alt={COMMON_ALT_TEXT}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  )
}
