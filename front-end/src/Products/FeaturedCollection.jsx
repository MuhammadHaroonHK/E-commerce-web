import React from 'react'

const FeaturedCollection = () => {

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
        {
            _id: 5,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=5", alt: "Jeans" }
            ]
        },
        {
            _id: 6,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=6", alt: "Jeans" }
            ]
        },
        {
            _id: 7,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=7", alt: "Jeans" }
            ]
        },
        {
            _id: 8,
            name: "Jeans",
            price: 99,
            image: [
                { url: "https://picsum.photos/200?random=8", alt: "Jeans" }
            ]
        },

    ]
    return (
        <>
        <section>
        <div className='py-2 px-2 md:px-14 lg:px-16 xl:px-28 mt-6'>
                <h2 className='text-2xl font-bold text-center'>Top Wear for Women's</h2>
                </div>

        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
                <>
                <div key={product._id} 
                className='h-96 p-10 sm:py-10 sm:px-3 lg:py-10'>
                    <img src={product.image[0].url} alt={product.image[0].alt} className='w-full h-full rounded-lg object-cover'/>
                <div className='py-3'>
                    <h2 className='font-semibold text-lg'>{product.name}</h2>
                    <p>$ {product.price}</p>
                </div>
                </div>

                </>
            ))}


        </div>
        </section>
        </>
    )
}

export default FeaturedCollection