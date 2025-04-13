import React, { useState, useEffect, useRef } from 'react';
import Filter from '../components/Commen/Filter';
import FeaturedCollection from '../Products/FeaturedCollection';
import { RiFilterLine } from "react-icons/ri";
import Popularity from '../components/Commen/Popularity';

const Collection = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const filterRef = useRef(null);

  const openToggle = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  // Close the filter when clicking outside of it on small devices
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpenFilter(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    // container
    <div className='flex'>

      {/* Left Filter Side */}
      <div
        ref={filterRef}
        className={`w-1/2 sm:w-1/5 border-r-2 p-2 sm:block ${isOpenFilter ? "sm:block" : "hidden"}`}
      >
        <Filter />
      </div>

      {/* Right All Collection side */}
      <div className='p-2 w-full'>
        <h2 className='font-bold text-2xl'>All Collections</h2>

        {/* Filter Icon */}
        <div className='flex justify-center items-center cursor-pointer mt-6 sm:hidden'>
          <RiFilterLine className='w-6 h-6' />
          <button onClick={openToggle} className='font-semibold text-lg'>Filter</button>
        </div>

        <div className='flex justify-end mr-8 mt-8'>
          <Popularity />
        </div>


        <FeaturedCollection />
      </div>
    </div>
  );
};

export default Collection;