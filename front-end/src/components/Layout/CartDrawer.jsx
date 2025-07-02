import React, { useState } from 'react'
import { MdOutlineClose } from "react-icons/md";
import CartContent from '../Cart/CartContent'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CartDrawer = ({ closeCart }) => {

    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const [isclose, setIsClose] = useState(false)
    const closeHandle = () => {
        setIsClose(!isclose);
        closeCart(false)
    }
    const navigate = useNavigate();

    const checkHandler = () => {
        setIsClose(!isclose)
        if (!user) {
            navigate("/login?redirct=checkout")
        } else {
            navigate("checkout")
        }
    }

    return (
        <>
            {isclose ? <></> :
                <div className='z-20 fixed w-1/3 md:w-1/3 sm:w-80 vsm:w-72 h-full bg-white top-0 right-0 border-l border-gray-600
                flex flex-col'>

                    <MdOutlineClose className='absolute right-0 m-2 cursor-pointer' onClick={closeHandle} />

                    {/* Cart Contents */}
                    <div className='flex-grow p-4 mt-10 overflow-y-auto'>
                        <h2 className='font-semibold text-[24px] mb-4'>Your Cart</h2>

                        {cart && cart?.products?.length > 0 ? (
                            <CartContent cart={cart} userId={userId} guestId={guestId} />
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>

                    {/* Bottom Section */}
                    <div className='p-4 border-t border-gray-300'>
                        {cart && cart?.products?.length > 0 && (
                            <>
                                <button onClick={checkHandler} className='bg-black text-white rounded-lg py-3 w-full'>
                                    Check Out
                                </button>
                                <p className='text-sm tracking-tighter mt-2 text-gray-500 text-center'>
                                    Shipping, Taxes, and Discounts
                                </p>
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default CartDrawer