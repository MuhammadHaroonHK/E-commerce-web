import React from 'react'
import { HiMiniShoppingBag } from "react-icons/hi2";
import { LuRefreshCcw } from "react-icons/lu";
import { FaRegAddressCard } from "react-icons/fa";

const FinalSection = () => {
  return (
    <section>
      <div className='container mx-auto py-10'>

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 space-y-8 md:space-y-0'>
        <div className='text-center flex flex-col justify-center items-center'>
          <HiMiniShoppingBag className='w-6 h-6'/>
          <h2 className='font-bold text-lg mt-6 uppercase'>Free International Shipping</h2>
          <p className='text-gray-700'>On all orders over $100.00</p>

        </div>
        <div className='text-center flex flex-col justify-center items-center'>
          <LuRefreshCcw className='w-6 h-6'/>
          <h2 className='font-bold text-lg mt-6 uppercase'>45 days return</h2>
          <p className='text-gray-700'>Money Back Gurentee</p>
        </div>
        <div className='text-center flex flex-col justify-center items-center'>
          <FaRegAddressCard className='w-6 h-6'/>
          <h2 className='font-bold text-lg mt-6 uppercase'>secure checkout</h2>
          <p className='text-gray-700'>100% secure checkout process</p>
        </div>

    </div>
      </div>
    </section>
  )
}

export default FinalSection