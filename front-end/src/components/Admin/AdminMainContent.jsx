import React from 'react'
import { Link } from 'react-router-dom'

const AdminMainContent = () => {
    const Products=[
        {
            orderId:"001",
            user:"Admin User",
            totalPrice:"$199.93",
            status:"Processing"
        },
        {
            orderId:"002",
            user:"Admin User",
            totalPrice:"$120.3",
            status:"Processing"
        },
        {
            orderId:"003",
            user:"Admin User",
            totalPrice:"$79",
            status:"Processing"
        },
        {
            orderId:"004",
            user:"Admin User",
            totalPrice:"$50",
            status:"Processing"
        },
        {
            orderId:"005",
            user:"Admin User",
            totalPrice:"$150.27",
            status:"Processing"
        },

    ]
  return (
    <div className='w-full px-5 sm:px-10 lg:px-20 py-10'>
        <h1 className='font-bold text-2xl'>Admin Dashboard</h1>

        {/* Total Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
            <div className='shadow-lg p-6'>
                <h2 className='font-semibold text-xl'>Revenue</h2>
                <p className='text-xl'>$319.94</p>
            </div>

            <div className='shadow-lg p-6'>
                <h2 className='font-semibold text-xl'>Total Orders</h2>
                <p className='text-xl'>4</p>
                <Link className='text-blue-600 hover:underline'>Manage Orders</Link>
            </div>

            <div className='shadow-lg p-6'>
                <h2 className='font-semibold text-xl'>Total Products</h2>
                <p className='text-xl'>40</p>
                <Link className='text-blue-600 hover:underline'>Manage Products</Link>
            </div> 
        </div>

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
            <tbody>
        {Products.map((product) => (
            <tr key={product.orderId}>
                <td className='border-b px-4 py-2'>{product.orderId}</td>
                <td className='border-b px-4 py-2'>{product.user}</td>
                <td className='border-b px-4 py-2'>{product.totalPrice}</td>
                <td className='border-b px-4 py-2'>{product.status}</td>
            </tr>
        ))}
        </tbody>
        </table>
</div>
    </div>
  )
}

export default AdminMainContent