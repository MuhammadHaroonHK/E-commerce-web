import React, { useEffect, useRef, useState } from 'react'
import { CiSquareChevLeft } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";
import { Link } from 'react-router-dom';
import axios from 'axios'

const NewArival = () => {

    const [newArrivals, setNewArrivals] = useState([]);
    useEffect(()=> {
        const fetchNewArrivals=async () => {
            try {
                const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
                setNewArrivals(response.data)
            } catch (error) {
                console.error(error)
            }
        };
        fetchNewArrivals()
    }, [])

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    };
    return (
        <section>

            {/* Upper Text */}

            <div className='mx-auto xl:p-4 lg:p-4 md:p-4 sm:p-2 vsm:p-0 '>
                <div className='text-center'>
                    <h2 className='font-semibold text-xl '>Explore New Arrivals</h2>
                    <p className='text-gray-700'>Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.</p>
                </div>

                {/* container */}
                <div className='relative'>

                    {/* Left Right Buttons */}
                    <div className='flex gap-2 absolute -top-4 right-0'>
                        <CiSquareChevLeft className='w-8 h-8 cursor-pointer' onClick={scrollLeft} />
                        <CiSquareChevRight className='w-8 h-8 cursor-pointer' onClick={scrollRight} />
                    </div>
                    {/* Scrolling Container */}

                    <div ref={scrollRef} className='mx-auto overflow-x-scroll flex flex-row gap-2 p-6 mt-10 scrollcss'>

                        {newArrivals.map((product) => (
                            <div key={product._id}>
                                <div className='min-w-64 h-72 relative'>
                                    <Link to={`/product/${product._id}`}>
                                        <img src={product.images[0]?.url} alt={product.images[0]?.alt || product.name} className='w-full h-full object-cover' />
                                        <div className='absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-white/30 text-black w-64 p-3'>
                                            <h2 className='font-bold'>{product.name}</h2>
                                            <p>$ {product.price}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </section>
    )
}

export default NewArival