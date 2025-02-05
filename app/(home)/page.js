 
import Categories from '@/components/clients/home/Categories/Categories'
import Hero from '@/components/clients/home/Hero'
import Subscription from '@/components/clients/home/Subscription/Subscription'
import React from 'react'

export default function HomePage() {
  return (
    <div className='relative'>
      <Hero />
      <Categories />
      <Subscription />
    </div>


  )
}
