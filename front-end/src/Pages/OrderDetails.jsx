import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../redux/slices/orderSlice';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { orderDetails, loading, error } = useSelector(state => state.order); // use order slice

    useEffect(() => {
        dispatch(fetchUserDetails(id));
    }, [dispatch, id]);

    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!orderDetails) return <p className="text-center text-gray-600">No Order Found</p>;

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h1 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h1>

            {/* container */}
            {!orderDetails ? <p>No Order Found</p> :
                <div className='border p-1 sm:p-6 rounded-lg'>

                    {/* Upper section */}
                    <div className='flex flex-col sm:flex-row justify-between mb-8'>
                        <div>
                            <h3 className='font-semibold text-lg'>Order ID: #{orderDetails._id}</h3>
                            <p className='text-gray-500'>Order Date: {new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                            <span
                                className={`${orderDetails.isPaid ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isPaid ? "Approved" : "Pendding"}
                            </span>
                            <span
                                className={`${orderDetails.isDelevered ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                    } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                                {orderDetails.isDelevered ? "Delivered" : "Pendding"}
                            </span>
                        </div>

                    </div>

                    {/* Middle section */}
                    <div className='grid grid-cols-1 sm:col-span-2 md:grid-cols-3 gap-8 mb-8'>
                        <div>
                            <h2 className='font-bold text-2xl'>Payment Info</h2>
                            <p className='text-gray-700'>Payment method: {orderDetails.paymentMethod}</p>
                            <p className='text-gray-700'>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        <div>
                            <h2 className='font-bold text-2xl'>Shipping Info</h2>
                            <p className='text-gray-700'>Shipping method: {orderDetails.shippingMethod || "Standard"}</p>
                            <p className='text-gray-700'>Address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}</p>
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
                            <tbody className='text-gray-700'>
                                {orderDetails.orderItems.map((item) => (
                                    <tr key={item.productId} className='border-b'>

                                        <td className='flex gap-4 justify-center items-center'>
                                            <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg' />
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