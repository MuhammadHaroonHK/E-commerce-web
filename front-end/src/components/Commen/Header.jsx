import React from 'react'
import { FaMeta } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Header = () => {
    return (

        // Container
        <div className='bg-red-600 text-white flex justify-between w-[100%] xl:px-20 md:px-20 sm:px-20 py-1 relative vsm:px-2'>

            {/* Left Side */}
            <div className='gap-3 mt-1 hidden md:flex'>
                <a href="#" className='text-[18px] hover:text-gray-900'><FaMeta /></a>
                <a href="#" className='text-[18px] hover:text-gray-900'><FaInstagram /></a>
                <a href="#" className='text-[18px] hover:text-gray-900'><FaXTwitter /></a>
            </div>

            {/* Center */}
            <div className='m-auto text-center'>
                <p>We ship worldwild - Fast and relaible shipping!</p>
            </div>

            {/* Right Side */}
            <div className='hidden md:flex'>
                <p>+92 312-3456789</p>
            </div>
        </div>
    )
}

export default Header