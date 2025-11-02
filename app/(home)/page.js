
import Categories from '@/components/clients/home/Categories/Categories'
import Faq from '@/components/clients/home/FAQ/Faq'
import Features from '@/components/clients/home/Features/Features' 
import Hero from '@/components/clients/home/Hero'
import Reviews from '@/components/clients/home/reviews/Reviews'
import Subscription from '@/components/clients/home/Subscription/Subscription'
import React from 'react'

export default function HomePage() {
  return (
    <div className='relative animateOnLoad '>
      <Hero />
      <Categories />
      <Reviews />
      <Features /> 
      <Subscription />
      <Faq />
    </div>


  )
}
