import Footer from '@/components/clients/Footer/Footer'
import Categories from '@/components/clients/home/Categories/Categories'
import Faq from '@/components/clients/home/FAQ/Faq'
import Features from '@/components/clients/home/Features/Features'
import Gallary from '@/components/clients/home/Gallary/Gallary'
import Hero from '@/components/clients/home/Hero'
import Subscription from '@/components/clients/home/Subscription/Subscription'
import React from 'react'

export default function HomePage() {
  return (
    <div className='relative animateOnLoad'>
      <Hero />
      <Categories />
      <Features />
      <Gallary />
      <Subscription />
      <Faq />
      <Footer />
    </div>


  )
}
