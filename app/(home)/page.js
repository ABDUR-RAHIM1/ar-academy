import React from 'react'

export default function HomePage() {
  return (
    <section className="secondaryBg py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold leading-tight mb-4">AR Academy তে স্বাগতম</h1>
        <p className="text-lg mb-8">
          বাংলাসহ, ইংরেজি, গণিত, বিজ্ঞান, ইতিহাস এবং আরও অনেক বিষয় AR Academy তে শিখুন। এখানেই আপনি আপনার পছন্দমত বিষয় পড়তে পারবেন, পুরোপুরি নিজের গতিতে!
        </p>
        <div>
          <button className="bg-[#1E90FF] text-white py-2 px-6 rounded-lg text-xl hover:bg-[#0c7db3] transition duration-300">এখনই যোগ দিন</button>
          <button className="bg-[#32CD32] text-white py-2 px-6 rounded-lg text-xl ml-4 hover:bg-[#28a829] transition duration-300">বিষয়গুলো এক্সপ্লোর করুন</button>
        </div>
      </div>
    </section>

  )
}
