import React from 'react'
import { Link } from 'react-router-dom'
import feature from '../assets/featured.webp'

const FeaturesSection = () => {
  return (
    <div className='py-20 px-6 md:px-16 lg:px-32 flex flex-col-reverse md:flex-row'>
      <div className='bg-slate-200 px-4 md:px-12 py-10 md:pt-32 w-full md:w-1/2 rounded-b-xl md:rounded-l-xl md:rounded-br-none'>
        <p>Comfort and Style</p>
        <h1 className='font-bold text-3xl mb-3'>Apperal made for your everyday life</h1>
        <p className='text-gray-700 mb-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur voluptatem omnis odit totam suscipit iusto impedit ratione, porro similique magni, molestias nostrum doloribus et, voluptas libero nobis adipisci! Eaque, aut!</p>

        <Link to="/collection/all" className='bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900'>Shop Now</Link>
      </div>

      <div className='w-full md:w-1/2 h-[400px] md:h-[500px]'>
        <img src={feature} alt="" className='w-full h-full object-cover rounded-t-xl md:rounded-t-none md:rounded-r-xl md:rounded-tr-xl' />
      </div>

    </div>
  )
}

export default FeaturesSection