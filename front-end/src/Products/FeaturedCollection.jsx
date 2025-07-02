import React from 'react'
import { Link } from 'react-router-dom';

const FeaturedCollection = ({ products = [], loading, error }) => {
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }
    return (
        <>
            <section>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {products.map((product) => (
                        <div key={product._id}
                            className='h-96 p-10 sm:py-10 sm:px-3 lg:py-10'>
                            <Link to={`/product/${product._id}`}>
                                <img src={product.images[0].url} alt={product.images[0].alt} className='w-full h-full rounded-lg object-cover' />
                                <div className='py-3'>
                                    <h2 className='font-semibold text-lg'>{product.name}</h2>
                                    <p>$ {product.price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}


                </div>
            </section>
        </>
    )
}

export default FeaturedCollection