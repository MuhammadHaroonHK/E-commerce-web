import React, { useState } from 'react'
import { MdOutlineClose } from "react-icons/md";
import CartContent from '../Cart/CartContent'


const CartDrawer = ({ closeCart }) => {

    const [isclose, setIsClose] = useState(false)
    const closeHandle = () => {
        setIsClose(!isclose);
        closeCart(false)
    }

    return (
        <>
            {isclose ? <></> :

                // Container
                <div className='z-20 fixed w-1/3 md:w-1/3 sm:w-80 vsm:w-72 h-full bg-white top-0 right-0 border-[2px] border-l-gray-600'>
                    <MdOutlineClose className='absolute right-0 m-2 cursor-pointer' onClick={closeHandle} />

                    {/* Cart Contents */}
                    <div className='flex-grow p-4 overflow-y-auto mt-10'>
                        <h2 className='font-semibold text-[24px]'>Your Cart</h2>
                        <CartContent />
                    </div>

                    {/* Bellow Section */}
                    <div className='p-4 absolute bottom-0 items-center'>
                        <button className='bg-black text-white rounded-lg py-3 w-full'>Check Out</button>
                        <p className='text-sm tracking-tighter mt-2 text-gray-500 text-center'>Shipping, Taxes, and Discounts</p>
                    </div>
                </div>}
        </>
    )
}

export default CartDrawer