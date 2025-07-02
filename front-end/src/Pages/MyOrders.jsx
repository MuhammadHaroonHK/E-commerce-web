import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrder } from '../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const {orders, loading, error}=useSelector((state)=>state.order);

    useEffect(()=>{
        dispatch(fetchUserOrder())
    }, [dispatch])

    const handleDetails = (_id) => {
        navigate(`/order-details/${_id}`);
    }

    if(loading) {
        return <p>Loading</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }
    return (
        <div>
            <div className='min-w-full mx-auto p-4 sm:p-6 overflow-x-auto'>
                <h2 className='font-bold text-2xl'>My Orders</h2>
                <table className='px-4 min-w-full text-left whitespace-nowrap'>
                    <thead className='uppercase bg-gray-200'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>IMAGE</th>
                            <th className='py-2 px-4 sm:py-3'>Id</th>
                            <th className='py-2 px-4 sm:py-3'>Created</th>
                            <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                            <th className='py-2 px-4 sm:py-3'>Items</th>
                            <th className='py-2 px-4 sm:py-3'>Price</th>
                            <th className='py-2 px-4 sm:py-3'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className='cursor-pointer hover:bg-gray-50 border-b'
                                    onClick={() => handleDetails(order._id)}>
                                    <td><img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='w-12 h-12 object-cover rounded-lg' /></td>
                                    <td className='py-2 px-4 sm:py-3'>#{order._id}</td>

                                    <td className='py-2 px-4 sm:py-3'>
                                        {new Date(order.createdAt).toLocaleDateString()} {" "}
                                        {new Date(order.createdAt).toLocaleTimeString()}</td>

                                    <td className='py-2 px-4 sm:py-3'>{order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}</td>
                                    <td className='py-2 px-4 sm:py-3'>{order.orderItems.length}</td>
                                    <td className='py-2 px-4 sm:py-3'>{order.totalPrice}</td>
                                    <td className='py-2 px-4 sm:py-3'>
                                        <span className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} rounded-full px-2 py-1`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className='text-center text-gray-500 p-4'>You have no orders</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default MyOrders