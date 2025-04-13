import React from 'react'

const OrderManagement = () => {
    const products = [
        {
            _id: 123,
            name: "Shirt",
            price: "$79",
            customer: "Admin User",
            status: "Processing"
        },
        {
            _id: 456,
            name: "Shirt",
            price: "$79",
            customer: "Admin User",
            status: "Processing"
        },
        {
            _id: 789,
            name: "Shirt",
            price: "$79",
            customer: "Admin User",
            status: "Processing"
        },
        {
            _id: 132,
            name: "Shirt",
            price: "$79",
            customer: "Admin User",
            status: "Processing"
        },
    ];

    const handleStatus = (orderId, status) => {
        console.log("ID", orderId, "status", status)
    }
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
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}
                                    className='hover:bg-gray-50'>
                                    <td className='border-b px-4 py-2'>{product._id}</td>
                                    <td className='border-b px-4 py-2'>{product.customer}</td>
                                    <td className='border-b px-4 py-2'>{product.price}</td>
                                    <td className='border-b px-4 py-2'>
                                        <select className='border px-2 py-1' value={product.status}
                                            onChange={(e) => handleStatus(product._id, e.target.value)}>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className='border-b px-4 py-2'>
                                        <button className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg'
                                            onClick={(id) => handleStatus(product._id, "Delevered")}>Mark as Delevered</button>
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