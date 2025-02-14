import { heroImage } from '@/Images/Images'
import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div className=' w-full h-[90vh] md:h-[80vh] flex items-center justify-center gap-5 flex-wrap py-10 md:py-0 heroBanner relative'>
      <div className='leftText w-full md:w-[45%] px-5 flex flex-col gap-2 md:gap-5'>
        <h1 className=' text-3xl  md:text-5xl font-bold text-red-800  '>
          AR Academy BD <br />
        </h1>
        <h1 className=' text-3xl  md:text-5xl text-center md:text-right font-bold text-white  '>
          তে স্বাগতম
        </h1>

        <p className=' text-white text-sm md:text-xl'>বাংলাসহ, ইংরেজি, গণিত, বিজ্ঞান, ইতিহাস এবং আরও অনেক বিষয় AR Academy তে শিখুন। এখানেই আপনি আপনার পছন্দমত বিষয় পড়তে পারবেন, পুরোপুরি নিজের গতিতে!</p>
      </div>

      <div className='rightImage w-full  md:w-[45%] px-5'>
        <Image
          src={heroImage}
          width={500}
          height={500}
          alt='ar academy bd '
          className="w-full h-full md:-translate-y-[0px] heroImageAnimate"
        />
      </div>


      <div className='heroInfo w-[90%] m-auto py-5 px-3 bg-gradient-to-l to-[#33dfe985] from-[#1e708a] bg-opacity-90 text-white absolute left-auto bottom-10 rounded-xl shadow-xl flex items-center justify-between flex-wrap '>
        <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
          <h3 className=' text-xl font-bold'>৫০ হাজার +</h3>
          <p>শিক্ষার্থী</p>
        </div>
        <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
          <h3 className=' text-xl font-bold'> ৩ লক্ষ+</h3>
          <p>প্রশ্ন</p>
        </div>
        <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
          <h3 className=' text-xl font-bold'> ২০+</h3>
          <p>মেন্টর</p>
        </div>
        <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
          <h3 className=' text-xl font-bold'> ১০ লক্ষ+</h3>
          <p>ওয়েবসাইট ভিজিট</p>
        </div>
      </div>


    </div>
  )
}
