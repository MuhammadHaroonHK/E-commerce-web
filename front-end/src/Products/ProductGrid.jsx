import React from 'react'

const ProductGrid = () => {

    const products = [
        {
            _id: 1,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=1", alt: "Jeans" }
            ]
        },
        {
            _id: 2,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=2", alt: "Jeans" }
            ]
        },
        {
            _id: 3,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=3", alt: "Jeans" }
            ]
        },
        {
            _id: 4,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=4", alt: "Jeans" }
            ]
        },

    ]
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-8'>
            {products.map((product) => (
                <>
                    <div key={product._id}
                        className='h-96 p-10 sm:py-10 sm:px-3 lg:p-6'>
                        <img src={product.image[0].url} alt={product.image[0].alt} className='w-full h-full rounded-lg object-cover' />
                        <div className='py-3'>
                            <h2 className='font-semibold text-lg'>{product.name}</h2>
                            <p>$ {product.price}</p>
                        </div>
                    </div>

                </>
            ))}


        </div>
    )
}

export default ProductGrid