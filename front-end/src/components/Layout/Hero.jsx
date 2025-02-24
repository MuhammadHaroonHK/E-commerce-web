import React from 'react'
import heroimg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section>

      {/* Container */}
      <div className='relative w-full h-[500px] md:h-[500px] lg:h-[500px] sm:h-[300px] vsm:h-[200px] xl:px-9 lg:px-6 md:px-5 sm:px-4 vsm:px-2'>

        {/* Main area */}
        <div>
          <img src={heroimg} alt="" className='object-cover w-full h-[500px] md:h-[500px] lg:h-[500px] sm:h-[300px] vsm:h-[200px]' />

          {/* text container */}
          <div className='absolute inset-0 bg-opacity-5 flex justify-center items-center'>

            {/* text area */}
            <div className='text-center text-white lg:mb-6 md:mb-6 sm:mb-6 vsm:mb-2 '>
              <h1 className='font-extrabold xl:text-6xl md:text-4xl sm:text-4xl vsm:text-xl uppercase'>Vacation <br /> Ready</h1>
              <div>

                <p className='text-gray-100 mb-6 px-6'>Explore our Vacation-ready outfits with fast worldwide shipping.</p>
              </div>

              {/* button */}
              <div>
                <Link to="#" className='bg-white text-black px-6 py-2 rounded-sm text-lg hover:bg-gray-900 hover:text-white'>Shop Now</Link>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero