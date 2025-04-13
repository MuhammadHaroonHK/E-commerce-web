import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router-dom';

const CartContent = () => {
    const products = [{
        _id: 1,
        name: "T-Shirt",
        price: 15,
        quantity: 1,
        color: "blue",
        size: "M",
        img: "https://picsum.photos/200?random=1"
    },
    {
        _id: 2,
        name: "Jeans",
        price: 10,
        quantity: 1,
        color: "Black",
        size: "M",
        img: "https://picsum.photos/200?random=2"
    },
    ]
    return (

        // container
        <div>
            {products.map((product, key) => (

                // Cart content
                <div key={key} className='flex items-start justify-between mt-6'>

                    {/* container */}
                    <div className='flex items-start gap-2'>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.img} alt={product.name} className='w-24' />
                        </Link>

                        {/* Left side */}
                        <div>
                            <h2 className='font-semibold'>{product.name}</h2>
                            <p className='text-gray-500 text-sm'>Color: {product.color} | Size: {product.size}</p>
                            <div className='flex items-center gap-2'>
                                <button className='border rounded px-3 text-xl font-medium'>-</button>
                                <p>{product.quantity}</p>
                                <button className='border rounded px-3 text-xl font-medium'>+</button>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className='flex flex-col justify-end items-end'>
                            <p>Price: ${product.price.toLocaleString()}</p>
                            <MdDeleteOutline className='text-red-500 text-2xl cursor-pointer' />
                        </div>
                    </div>

                </div>
            ))

            }
        </div>
    )
}

export default CartContent