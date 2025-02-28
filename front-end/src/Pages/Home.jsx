import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../Products/GenderCollection'
import NewArival from '../Products/NewArival'
import BestSeller from '../Products/BestSeller'
import FeaturedCollection from '../Products/FeaturedCollection'
import FeaturesSection from '../Products/FeaturesSection'
import Footer from '../components/Commen/Footer'
import FinalSection from '../Products/FinalSection'
import Navbar from '../components/Commen/Navbar'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <GenderCollection/>
    <NewArival/>
    <BestSeller/>
    <FeaturedCollection/>
    <FeaturesSection/>
    <FinalSection/>
    <Footer/>
    </>
  )
}

export default Home