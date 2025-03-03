import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../Products/GenderCollection'
import NewArival from '../Products/NewArival'
import BestSeller from '../Products/BestSeller'
import FeaturedCollection from '../Products/FeaturedCollection'
import FeaturesSection from '../Products/FeaturesSection'
import FinalSection from '../Products/FinalSection'

const Home = () => {
  return (
    <>
    <Hero/>
    <GenderCollection/>
    <NewArival/>
    <BestSeller/>
    <div className='py-2 px-2 md:px-14 lg:px-16 xl:px-28 mt-6'>
                <h2 className='text-2xl font-bold text-center'>Top Wear for Women's</h2>
                </div>
    <FeaturedCollection/>
    <FeaturesSection/>
    <FinalSection/>
    </>
  )
}

export default Home