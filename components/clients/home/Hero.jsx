import { heroImage } from '@/Images/Images'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

// export default function Hero() {
//   return (
//     <div className=' w-full h-[90vh] md:h-[80vh] flex items-center justify-center gap-5 flex-wrap py-10 md:py-0 heroBanner relative'>
//       <div className='leftText w-full md:w-[45%] px-5 flex flex-col gap-2 md:gap-5'>
//         <h1 className=' text-2xl  md:text-4xl font-bold text-yellow-200  '>
//           শেখার নতুন দিগন্তে আপনাকে <br />
//         </h1>
//         <h1 className=' text-3xl  md:text-5xl text-center md:text-right font-bold text-white  '>
//          স্বাগতম
//         </h1>

//         <p className=' text-white text-sm md:text-[16px]'>আমরা একটি আধুনিক অনলাইন লার্নিং প্ল্যাটফর্ম, যেখানে একাডেমিক পড়াশোনা, ভর্তি প্রস্তুতি, চাকরি প্রস্তুতি এবং জব এক্সাম প্রশ্ন সমাধানসহ নানান বিষয় শেখার সুযোগ পাবেন।</p>
//       </div>

//       <div className='rightImage w-full  md:w-[45%] px-5'>
//         <Image
//           src={heroImage}
//           width={500}
//           height={500}
//           alt='ar academy bd '
//           className="w-full h-full md:-translate-y-[0px] heroImageAnimate"
//         />
//       </div>


//       <div className='heroInfo w-[90%] m-auto py-5 px-3 bg-gradient-to-l to-[#33dfe985] from-[#1e708a] bg-opacity-90 text-white absolute left-auto bottom-10 rounded-xl shadow-xl flex items-center justify-between flex-wrap '>
//         <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
//           <h3 className=' text-xl font-bold'>৫০ হাজার +</h3>
//           <p>শিক্ষার্থী</p>
//         </div>
//         <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
//           <h3 className=' text-xl font-bold'> ৩ লক্ষ+</h3>
//           <p>প্রশ্ন</p>
//         </div>
//         <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
//           <h3 className=' text-xl font-bold'> ২০+</h3>
//           <p>মেন্টর</p>
//         </div>
//         <div className=' w-[48%] md:w-[24%] py-4 px-2 rounded-md shadow-md border border-teal-300 flex items-center flex-col gap-3 my-1'>
//           <h3 className=' text-xl font-bold'> ১০ লক্ষ+</h3>
//           <p>ওয়েবসাইট ভিজিট</p>
//         </div>
//       </div>


//     </div>
//   )
// }

// HeroSection.jsx

export default function Hero() {
  return (
    <section className="w-full min-h-[60vh] bg2 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl tracking-wider mb-6">
            Onushilon Academy – শেখা এখন আরও সহজ ও মজার
          </h1>
          <p className="text-lg text-white/90 mb-8">
            এক জায়গায় সবকিছু: পড়াশোনা, প্রস্তুতি, পরীক্ষা ও মূল্যায়ন! অনলাইনে ঘরে বসেই শেখো নিজের গতিতে।
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <Link href={"/categories"} className=' inline-block'>
              <button className=" border hover:bg-[#0891b2] text-white px-6 py-3 rounded-xl font-semibold shadow">
                এখনই শুরু করুন
              </button>
            </Link>

            <Link href={"/categories"} className=' inline-block'>
              <button className="bg-white color2 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100">
                কোর্স ব্রাউজ করুন
              </button>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="lg:w-1/2">
          <Image
            src={heroImage}
            width={500}
            height={500}
            alt="Online Learning"
            className="w-full max-w-md mx-auto h-full drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
