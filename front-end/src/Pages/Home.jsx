import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../Products/GenderCollection'
import NewArival from '../Products/NewArival'
import BestSeller from '../Products/BestSeller'

const Home = () => {
  return (
    <>
    <Hero/>
    <GenderCollection/>
    <NewArival/>
    <BestSeller/>
    </>
  )
}

export default Home