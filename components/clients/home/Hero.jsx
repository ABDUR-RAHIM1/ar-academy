import { userLogin } from '@/constans'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <section className="bg2 py-20 px-4 rounded-b-[30px]">
      <div className=" w-full md:w-[50%] m-auto text-center">
        <h1 className=" text-2xl md:text-4xl font-bold leading-tight mb-4">AR Academy তে স্বাগতম</h1>
        <p className=" text-sm md:text-lg mb-8">
          বাংলাসহ, ইংরেজি, গণিত, বিজ্ঞান, ইতিহাস এবং আরও অনেক বিষয় AR Academy তে শিখুন। এখানেই আপনি আপনার পছন্দমত বিষয় পড়তে পারবেন, পুরোপুরি নিজের গতিতে!
        </p>
        <div>
          <Link href={userLogin} className="bg-[#1E90FF] text-sm text-white py-2 px-3 md:px-6 rounded-lg md:text-xl hover:bg-[#0c7db3] transition duration-300">যোগ দিন</Link>
          <button id='categories' className="bg-[#32CD32] text-sm text-white py-2 px-3 md:px-6 rounded-lg md:text-xl ml-4 hover:bg-[#28a829] transition duration-300">এক্সপ্লোর করুন</button>
        </div>
      </div>
    </section>
  )
}
