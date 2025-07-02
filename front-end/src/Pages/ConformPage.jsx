import React, { useEffect, useState } from 'react';

const ConformPage = () => {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('lastOrder');
        if (stored) {
            setOrderData(JSON.parse(stored));
        }
    }, []);

    if (!orderData) {
        return (
            <div className='text-center mt-10'>
                <h1 className='text-2xl font-bold text-red-600'>No Order Found</h1>
                <p className='text-gray-500'>You have not placed any recent orders.</p>
            </div>
        );
    }

    const { orderId, date, products, paymentMethod, address } = orderData;

    return (
        <div>
            <h1 className='text-[24px] md:text-[32px] font-bold text-green-700 text-center mt-4'>
                Thanks for Your Order!
            </h1>

            <div className='w-full md:w-[800px] border rounded-lg mx-auto p-2 sm:p-6 mt-4'>

                {/* Top Info */}
                <div className='flex justify-between gap-4'>
                    <div>
                        <h2 className='font-bold'>Order ID: {orderId}</h2>
                        <p className='text-gray-500'>Order Date: {new Date(date).toDateString()}</p>
                    </div>
                    <div>
                        <p className='text-green-700'>Estimated Delivery: {new Date(date).toDateString()}</p>
                    </div>
                </div>

                {/* Products */}
                {products?.map((product, key) => (
                    <div key={key} className='flex items-center justify-between mt-10 p-3'>
                        <div className='flex gap-2'>
                            <img src={product.image} alt={product.name} className='w-16 rounded-lg' />
                            <div>
                                <h2 className='font-semibold'>{product.name}</h2>
                                <p className='text-gray-500 text-sm'>
                                    {product.color} | {product.size}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold'>${product.price.toLocaleString()}</p>
                            <p className='text-gray-500'>QTY: {product.quantity}</p>
                        </div>
                    </div>
                ))}

                {/* Payment & Address */}
                <div className='w-full md:w-1/2 flex justify-between mt-16 gap-4'>
                    <div>
                        <h2 className='font-bold text-[22px]'>Payment</h2>
                        <p className='text-gray-600'>{paymentMethod || 'N/A'}</p>
                    </div>

                    <div>
                        <h2 className='font-bold text-[22px]'>Address</h2>
                        <p className='text-gray-600'>{address || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConformPage;
