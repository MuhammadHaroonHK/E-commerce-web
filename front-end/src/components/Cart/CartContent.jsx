import React, { useCallback } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemQuantity, removeItemLocally } from '../../redux/slices/cartSlice';

const CartContent = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    //handling adding or subtracting item in cart
    const handleAddToCart = useCallback((productId, delta, color, size) => {
        // Find the matching product from the latest cart state
        const product = cart.products.find(
            (p) =>
                p.productId === productId &&
                p.color === color &&
                p.size === size
        );

        if (!product) return;

        const newQuantity = product.quantity + delta;

        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                guestId,
                userId,
                size,
                color,
            }));
        }
    }, [dispatch, guestId, userId, cart.products]);


    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeItemLocally({ productId, size, color }));
        dispatch(removeFromCart({ productId, guestId, userId, size, color }));
    };

    return (

        // container
        <div>
            {cart.products.map((product, key) => (

                // Cart content
                <div key={key} className='flex items-start justify-between mt-6'>

                    {/* container */}
                    <div className='flex items-start gap-2'>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} className='w-24' />
                        </Link>

                        {/* Left side */}
                        <div>
                            <h2 className='font-semibold'>{product.name}</h2>
                            <p className='text-gray-500 text-sm'>Color: {product.color} | Size: {product.size}</p>
                            <div className='flex items-center gap-2'>
                                <button
                                    onClick={() =>
                                        handleAddToCart(product.productId, -1, product.color, product.size)
                                    }

                                    className='border rounded px-3 text-xl font-medium'
                                >
                                    -
                                </button>
                                <p>{product.quantity}</p>
                                <button
                                    onClick={() =>
                                        handleAddToCart(product.productId, 1, product.color, product.size)
                                    }

                                    className='border rounded px-3 text-xl font-medium'
                                >
                                    +
                                </button>
                            </div>

                        </div>

                        {/* Right side */}
                        <div className='flex flex-col justify-end items-end'>
                            <p>Price: ${product.price.toLocaleString()}</p>
                            <MdDeleteOutline
                                onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
                                className='text-red-500 text-2xl cursor-pointer' />
                        </div>
                    </div>

                </div>
            ))

            }
        </div>
    )
}

export default CartContent