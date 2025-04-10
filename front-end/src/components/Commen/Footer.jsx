import React from 'react'
import { FaInstagram, FaMeta, FaXTwitter } from 'react-icons/fa6';
import { MdOutlineAddIcCall } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (

        // container
        <div className='bg-gray-100 border-t border-gray-400 xl:p-12 md:p-16 sm:p-16 vsm:p-6 mt-10'>

            {/* content */}
            <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 vsm:grid-cols-1 gap-6'>

                {/* First side */}
                <div>
                    <h2 className='font-semibold text-[20px] mb-4'>Newsletter</h2>
                    <p className='text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat officia asperiores doloremque.</p>
                    <p className='mb-4 mt-4'>Sign Up and get 10% off your first order.</p>

                    {/* Input form */}
                    <form className='flex xl:flex-row md:flex-row sm:flex-row vsm:flex-col xl:gap-0 md:gap-0 sm:gap-0 vsm:gap-4'>
                        <input type="email" placeholder='Enter your Email' required className='border border-gray-600 p-1.5 focus:outline-none rounded-lg sm:rounded-none' />
                        <button className='bg-black text-white p-1.5 rounded-lg sm:rounded-none'>Subscribe</button>
                    </form>
                </div>

                {/* Second side */}
                <div>
                    <h2 className='font-semibold text-[20px] mb-4'>Shope</h2>
                    <ul>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">Men's Top Wear</Link>
                        </li>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">Women's Top Wear</Link>
                        </li>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">Men's Bottom Wear</Link>
                        </li>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">Men's Bottom Wear</Link>
                        </li>
                    </ul>
                </div>

                {/* Third side */}
                <div>
                    <h2 className='font-semibold text-[20px] mb-4'>Support</h2>
                    <ul>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">Contact Us</Link>
                        </li>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">About Us</Link>
                        </li>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">FAQs</Link>
                        </li>
                        <li className='hover:text-gray-700 mb-2'>
                            <Link to="#">Features</Link>
                        </li>
                    </ul>
                </div>

                {/* Fourt side */}
                <div>
                    <h2 className='font-semibold text-[20px] mb-4'>Follow Us</h2>
                    <div className='gap-3 mt-1 flex'>
                        <a href="#" className='text-[18px] hover:text-gray-600'><FaMeta /></a>
                        <a href="#" className='text-[18px] hover:text-gray-600'><FaInstagram /></a>
                        <a href="#" className='text-[18px] hover:text-gray-600'><FaXTwitter /></a>
                    </div>
                    <div className='mt-6'>
                        <p className='text-gray-700'>Call Us</p>
                        <p><MdOutlineAddIcCall className='inline mr-2' /> +92 312-3456789</p>
                    </div>
                </div>
            </div >

            {/* Last footer */}
            <div className='border-t-[1px] border-gray-500 mt-10'>
                <p className='text-center mt-6'>&copy; {new Date().getFullYear()} Haroon. All rights are reserved.</p>

            </div>
        </div>
    )
}

export default Footer