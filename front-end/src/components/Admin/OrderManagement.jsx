import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchAllOders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOders());
        }
    }, [dispatch, user, navigate]);

    const handleStatus = (orderId, status) => {
        dispatch(updateOrderStatus({ id: orderId, status }))
            .then(() => dispatch(fetchAllOders()));
    };

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(orders)
    return (
        <div className='w-full px-5 sm:px-10 lg:px-20 py-10'>
            <h1 className='font-bold text-2xl'>Orders Management</h1>

            <div className='min-w-full mx-auto p-2 mt-6 sm:mt-2 sm:p-6 overflow-x-auto'>
                <table className='min-w-full text-left whitespace-nowrap'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-4 py-2'>ID</th>
                            <th className='px-4 py-2'>Customers</th>
                            <th className='px-4 py-2'>Total Price</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Activities</th>
                        </tr>
                    </thead>

                    <tbody className='text-gray-700'>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}
                                    className='hover:bg-gray-50'>
                                    <td className='border-b px-4 py-2'>{order._id}</td>
                                    <td className='border-b px-4 py-2'>{order.user}</td>
                                    <td className='border-b px-4 py-2'>{order.totalPrice}</td>
                                    <td className='border-b px-4 py-2'>
                                        <select className='border px-2 py-1' value={order.status}
                                            onChange={(e) => handleStatus(order._id, e.target.value)}>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className='border-b px-4 py-2'>
                                        <button className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg'
                                            onClick={(id) => handleStatus(order._id, "Delivered")}>Mark as Delevered</button>
                                    </td>
                                </tr>
                            ))
                        ) :
                            (
                                <tr>
                                    <td colSpan={5} className='text-center text-gray-500 p-4'>No Order Found.</td>
                                </tr>
                            )}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default OrderManagement