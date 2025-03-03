import React, { useState } from 'react'
import Filter from '../components/Commen/Filter'
import FeaturedCollection from '../Products/FeaturedCollection'
import { RiFilterLine } from "react-icons/ri";

const Collection = () => {

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const openToggle = () => {
    setIsOpenFilter(!isOpenFilter);
  }
  return (
    // container
    <div className='flex'>

      {/* Left Filter Side */}
      <div className={`w-1/2 sm:w-1/5 border-r-2 p-2  sm:block ${isOpenFilter ? "sm:block" : "hidden"}`}>
        <Filter />
      </div>

      {/* Right All Collection side */}
      <div className=' p-2 w-full'>
        <h2 className='font-bold text-2xl'>All Collections</h2>

        {/* Filter Icon */}
        <div className='flex justify-center items-center cursor-pointer mt-6 sm:hidden'>
          <RiFilterLine className='w-6 h-6' />
          <button onClick={openToggle} className='font-semibold text-lg'>Filter</button>
        </div>
        <FeaturedCollection />
      </div>
    </div>
  )
}

export default Collection