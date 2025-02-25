import React from 'react'
import { Link } from 'react-router-dom'
import womenCol from '../assets/womens-collection.jpg'
import menCol from '../assets/mens-collection.jpg'

const GenderCollection = () => {
  return (
    <section>
      {/* Container */}

      <div className='flex xl:flex-row justify-center items-center lg:flex-row md:flex-row sm:flex-col vsm:flex-col gap-4 xl:p-10 lg:p-10 md:p-10 sm:py-10 vsm:py-10 '>

        {/* Left container */}

        <div>
          <div className='relative xl:w-[500px] lg:w-[500px] md:w-[350px] sm:w-[400px] vsm:w-[270px]'>
            <img src={womenCol} alt="" className='rounded-lg object-cover w-full xl:h-[500px] lg:h-[500px] md:h-[450px] sm:h-[400px] vsm:h-[350px]' />
            <div className='absolute bottom-4 left-2 p-2 bg-white rounded-lg'>
              <h2 className='font-bold text-xl'>Women's Collection</h2>
              <Link to="collection/all?women" className='underline text-sm text-gray-800'>Shop Now</Link>
            </div>
          </div>
        </div>

        {/* Right container */}

        <div>
          <div className='relative xl:w-[500px] lg:w-[500px] md:w-[350px] sm:w-[400px] vsm:w-[270px]'>
            <img src={menCol} alt="" className='rounded-lg object-cover w-full xl:h-[500px] lg:h-[500px] md:h-[450px] sm:h-[400px] vsm:h-[350px]' />
            <div className='absolute bottom-4 left-2 p-2 bg-white rounded-lg'>
              <h2 className='font-bold text-xl'>Men's Collection</h2>
              <Link to="collection/all?men" className='underline text-sm text-gray-800'>Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GenderCollection