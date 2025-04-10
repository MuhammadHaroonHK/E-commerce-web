import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const OrderDetails = () => {

    const { id } = useParams();
    const [OrderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const mockOrderDetails = {
            _id: id,
            createdAt: new Date(),
            isPaid: true,
            isDelevered: false,
            paymentMethod: "PayPal",
            shippingMethod: "Standard",
            shippingAddress: { city: "Peshawar", country: "Pakistan" },

            orderItems: [{
                productId: 1,
                name: "T-Shirt",
                price: 15,
                quantity: 1,
                img: "https://picsum.photos/200?random=1"
            },
            {
                productId: 2,
                name: "T-Shirt",
                price: 13,
                quantity: 2,
                img: "https://picsum.photos/200?random=2"
            },
            ],

        };
        setOrderDetails(mockOrderDetails);
    }, [id])
    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h1 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h1>

            {/* container */}
            {!OrderDetails ? <p>No Order Found</p> :
                <div className='border p-1 sm:p-6 rounded-lg'>

                    {/* Upper section */}
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className='font-semibold text-lg'>Order ID: #{OrderDetails._id}</h3>
                            <p className='text-gray-500'>Order Date: {OrderDetails.createdAt.toDateString()}</p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span
                                className={`${OrderDetails.isPaid ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {OrderDetails.isPaid ? "Approved" : "Pendding"}
                            </span>
                            <span
                                className={`${OrderDetails.isDelevered ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                    } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {OrderDetails.isDelevered ? "Delivered" : "Pendding"}
                            </span>
                        </div>

                    </div>

                    {/* Middle section */}
                    <div className='grid grid-cols-1 sm:col-span-2 md:grid-cols-3 gap-8 mb-8'>
                        <div>
                            <h2 className='font-bold text-2xl'>Payment Info</h2>
                            <p className='text-gray-700'>Payment method: {OrderDetails.paymentMethod}</p>
                            <p className='text-gray-700'>Status: {OrderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h2 className='font-bold text-2xl'>Shipping Info</h2>
                            <p className='text-gray-700'>Shipping method: {OrderDetails.shippingMethod}</p>
                            <p className='text-gray-700'>Address: {`${OrderDetails.shippingAddress.city}, ${OrderDetails.shippingAddress.country}`}</p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className='overflow-x-auto'>
                        <h2 className='font-bold text-xl'>Products</h2>
                        <table className='min-w-full text-gray-600 mb-4'>
                            {/* Head of table */}
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='py-2 px-4'>Name</th>
                                    <th className='py-2 px-4'>Price</th>
                                    <th className='py-2 px-4'>Quantity</th>
                                    <th className='py-2 px-4'>Total</th>
                                </tr>

                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {OrderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b'>

                                        <td className='flex gap-4 justify-center items-center'>
                                            <img src={item.img} alt={item.name} className='w-12 h-12 object-cover rounded-lg' />
                                            <Link to={`/product/${item.productId}`} className='text-blue-600 hover:underline'>{item.name}</Link>
                                        </td>

                                        <td className='text-center'>${item.price}</td>
                                        <td className='text-center'>${item.quantity}</td>
                                        <td className='text-center'>${item.price * item.quantity}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        {/* My Order Section */}
                        <div>
                            <Link to="/my-orders" className='text-blue-600 hover:underline'>Back to MyOrders</Link>
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default OrderDetails