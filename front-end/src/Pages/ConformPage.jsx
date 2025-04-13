import React from 'react'

const ConformPage = () => {

    const products = [{
        productId: 1,
        name: "T-Shirt",
        price: 15,
        quantity: 1,
        color: "blue",
        size: "M",
        img: "https://picsum.photos/200?random=1"
    }]

    return (
        // Container
        <div>
            <h1 className='text-[24px] md:text-[32px] font-bold text-green-700 text-center mt-4'>Thanks for Your Order!</h1>

            {/* Top content */}
            <div className='w-full md:w-[800px] border rounded-lg mx-auto p-2 sm:p-6 mt-4'>

                {/* container */}
                <div className='flex justify-between gap-4'>

                    {/* Left side */}
                    <div>
                        <h2 className='font-bold'>Order ID: 54ca988re23bnd246ux</h2>
                        <p className='text-gray-500'>Order Date: {new Date().toDateString()}</p>

                    </div>

                    {/* Right side */}
                    <div>
                        <p className='text-green-700'>Estimated Delivery: {new Date().toDateString()}</p>
                    </div>
                </div>


                {/* Middle content */}
                {products.map((product, key) => (

                    <div key={key} className='flex items-center justify-between mt-10 p-3'>

                        {/* Left side */}
                        <div className='flex gap-2'>
                            <img src={product.img} alt={product.name} className='w-16 rounded-lg' />
                            <div>
                                <h2 className='font-semibold'>{product.name}</h2>
                                <p className='text-gray-500 text-sm'>{product.color} | {product.size}</p>
                            </div>
                        </div>

                        {/* Right side (Price) */}
                        <div>
                            <p className='font-semibold'>${product.price.toLocaleString()}</p>
                            <p className='text-gray-500'>QTY: {product.quantity}</p>

                        </div>
                    </div>
                ))}

                {/* Bottom content */}

                <div className='w-full md:w-1/2 flex justify-between mt-16 gap-4'>
                    <div>
                        <h2 className='font-bold text-[22px]'>Payment</h2>
                        <p className='text-gray-600'>PayPal</p>
                    </div>

                    <div>
                        <h2 className='font-bold text-[22px]'>Address</h2>
                        <p className='text-gray-600'>Peshawar, Pakistan</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConformPage