import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

const CartContent = () => {
    const products=[{
        productId:1,
        name:"T-Shirt",
        price:15,
        quantity:1,
        color: "blue",
        size:"M",
        img:"https://picsum.photos/200?random=1"
    },
    {
        productId:2,
        name:"Jeans",
        price:10,
        quantity:1,
        color: "Black",
        size:"M",
        img:"https://picsum.photos/200?random=2"
    },
]
  return (
    <div>
    {products.map((product, key) =>(
        <div key={key} className='flex items-start justify-between mt-6'>
            <div className='flex items-start gap-2'>
            <img src={product.img} alt={product.name} className='w-24'/>
            <div>
            <h2 className='font-semibold'>{product.name}</h2>
            <p className='text-gray-500 text-sm'>Color: {product.color} | Size: {product.size}</p>
            <div className='flex items-center'>
                <button className='border rounded p-1 text-xl font-medium'>-</button>
                <p>{product.quantity}</p>
                <button className='border rounded p-1 text-xl font-medium'>+</button>
            </div>
            </div>
            <div className='flex flex-col justify-end items-end'>
                <p>Price: ${product.price.toLocaleString()}</p>
                <MdDeleteOutline className='text-red-500 text-2xl cursor-pointer'/>
            </div>
            </div>

        </div> 
    ))
        
    }
    </div>
  )
}

export default CartContent