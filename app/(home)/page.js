
import Search from '@/components/clients/globals/search/Search'
import Categories from '@/components/clients/home/Categories'
import Hero from '@/components/clients/home/Hero'
import React from 'react'

export default function HomePage() {
  return (
    <div className='relative'>
      <Hero />
      <Categories />
      <Search />     {/*  dynamicaly Show and hide , when click header Search Input */}
  
    </div>


  )
}
