import React from 'react'
import { Link } from 'react-router-dom';

const ProductManagement = () => {
    const products = [
        {
            _id: 123,
            name: "Shirt",
            price: "$79",
            sku: "BW-005"
        },
        {
            _id: 456,
            name: "Shirt",
            price: "$79",
            sku: "BW-005"
        },
        {
            _id: 789,
            name: "Shirt",
            price: "$79",
            sku: "BW-005"
        },
        {
            _id: 132,
            name: "Shirt",
            price: "$79",
            sku: "BW-005"
        },
    ];

    const hadleEdit = (id) => {
        console.log("Edit id:", id)
    }

    const hadleDelete = (id) => {
        console.log("Delete id:", id)
    }
    return (
        <div className='w-full px-5 sm:px-10 lg:px-20 py-10'>
            <h1 className='font-bold text-2xl'>Products Management</h1>

            <div className='min-w-full mx-auto p-2 mt-6 sm:mt-2 sm:p-6 overflow-x-auto'>
                <table className='min-w-full text-left whitespace-nowrap'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-4 py-2'>Name</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>SKU</th>
                            <th className='px-4 py-2'>Activities</th>
                        </tr>
                    </thead>

                    <tbody className='text-gray-700'>

                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}
                                    className='hover:bg-gray-50 cursor-pointer'>
                                    <td className='border-b px-4 py-2'>{product.name}</td>
                                    <td className='border-b px-4 py-2'>{product.price}</td>
                                    <td className='border-b px-4 py-2'>{product.sku}</td>
                                    <td className='border-b px-4 py-2'>
                                        <Link to={`${product._id}/edit`}
                                            className='bg-yellow-500 hover:bg-yellow-600 text-white mr-3 px-2 py-1 rounded-lg'
                                        >Edit
                                        </Link>
                                        <button className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg'
                                            onClick={(id) => hadleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) :
                            (
                                <tr>
                                    <td colSpan={4} className='text-center text-gray-500 p-4'>No Product Found.</td>
                                </tr>
                            )}

                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default ProductManagement