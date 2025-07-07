import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAdminProducts } from '../../redux/slices/adminProductSlice'
import { fetchAllOders } from '../../redux/slices/adminOrderSlice'

const AdminMainContent = () => {
    const dispatch=useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {products, loading:productsLoading, error:productsError} = useSelector((state)=>state.adminProducts);
    const {orders,totalOrders,totalSales, loading:ordersLoading, error:ordersError} = useSelector((state)=>state.adminOrders);

    useEffect(()=>{
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOders());
    },[dispatch]);
    
    console.log(orders);
    
    return (
        <div className='w-full px-5 sm:px-10 lg:px-20 py-10'>
            <h1 className='font-bold text-2xl'>Admin Dashboard</h1>

            {productsLoading || ordersLoading ? (
                <p>Loading ...</p>
            ) : productsError ? (
                <p className='text-red-500'>Error fetching products : {productsError}</p>
            ) : ordersError ? (
                <p className='text-red-500'>Error fetching orders : {ordersError}</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
                    {/* Total Section */}
                    <div className='shadow-lg p-6'>
                        <h2 className='font-semibold text-xl'>Revenue</h2>
                        <p className='text-xl'>$ {(totalSales ?? 0).toFixed(2)}</p>

                    </div>

                    <div className='shadow-lg p-6'>
                        <h2 className='font-semibold text-xl'>Total Orders</h2>
                        <p className='text-xl'>{totalOrders}</p>
                        <Link to={"/admin/orders"} className='text-blue-600 hover:underline'>Manage Orders</Link>
                    </div>

                    <div className='shadow-lg p-6'>
                        <h2 className='font-semibold text-xl'>Total Products</h2>
                        <p className='text-xl'>{products.length}</p>
                        <Link to={"/admin/products"} className='text-blue-600 hover:underline'>Manage Products</Link>
                    </div>
                </div>
            )}
            

            {/* Recent orders */}
            <div className='min-w-full mx-auto p-2 mt-6 sm:mt-2 sm:p-6 overflow-x-auto'>
                <h2 className='font-bold text-2xl mb-2'>Recent Orders</h2>
                <table className='min-w-full text-left whitespace-nowrap'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-4 py-2'>Order ID</th>
                            <th className='px-4 py-2'>User</th>
                            <th className='px-4 py-2'>Total Price</th>
                            <th className='px-4 py-2'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td className='border-b px-4 py-2'>{order._id}</td>
                                    <td className='border-b px-4 py-2'>{user.name}</td>
                                    <td className='border-b px-4 py-2'>$ {order.totalPrice}</td>
                                    <td className='border-b px-4 py-2'>{order.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center text-gray-500 p-4'>No Recent Orders Found.</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default AdminMainContent