import React from 'react'

const BestSeller = () => {

    const productDetails = [
        {
            name: "Jeans",
            discription: "Good quality jeans, no compromise on quality.",
            oldPrice: 99,
            currentPrice: 89,
            quantity: 1,
            material:"Leader",
            brand:"Addida",
            colors: ["red", "black", "blue"],
            sizes: ["S", "M", "L", "XL"],
            images: {
                url: "https://picsum.photos/200?random=1",
                alt: "Jeans"
            }
        },
    ];


    return (
        <>
            <div className='text-center'>
                <div className='mt-8'>
                    <h2 className='text-3xl font-bold'>Best Seller</h2>
                </div>
            </div>

            {/* container */}
            <div className='mx-auto p-2 sm:p-4 md:p-4 lg:p-8 flex xl:flex-row lg:flex-row md:flex-row sm:flex-row vsm:flex-col justify-center gap-4'>

                {/* left side */}
                <div className='flex flex-col-reverse sm:flex-row gap-4'>

                    {/* small two images */}
                    <div className='flex flex-row sm:flex-col gap-4'>
                        {productDetails.map((product) => (
                            <>
                            <div>
                                <img src={product.images.url} alt={product.images.alt} className='min-w-16 h-16 object-cover rounded-lg' />
                                
                            </div>
                            <div>
                                <img src={product.images.url} alt={product.images.alt} className='min-w-16 h-16 object-cover rounded-lg' />
                            </div>
                            </>
                        ))}

                    </div>

                    {/* large image */}
                    <div className='w-[280px] h-[280px] md:w-[300px] md:h-[300px] vsm:w-full'>
                        {productDetails.map((product) => (

                            <img src={product.images.url} alt={product.images.alt} className='w-full h-full rounded-lg object-cover' />
                        ))}
                    </div>
                </div>


                {/* Right side */}
                <div className='bg-gray-50 w-full md:w-1/3'>
                    {productDetails.map((product) => (
                        <div>
                            <h2 className='text-2xl font-bold text-black'>
                                {product.name}
                            </h2>
                            <p className='line-through text-gray-700'>$ {product.oldPrice}</p>
                            <p className=''>$ {product.currentPrice}</p>
                            <p>{product.discription}</p>
                            {/* color */}

                            <div className='py-2'>
                                <p className='text-lg'>Colors: </p>
                                <div className='flex gap-2'>
                                    {product.colors.map((color) => (
                                        <button>
                                            <div className='w-6 h-6 rounded-full border' style={{ backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.7)" }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* size */}
                            <div className='py-2'>
                                <p className='text-lg'>Sizes: </p>
                                <div className='flex gap-2'>
                                    {product.sizes.map((size) => (
                                        
                                            <button>
                                                <div className='w-6 h-6 rounded-sm border'>{size}</div>
                                            </button>
                                    ))}
                                </div>
                            </div>

                            {/* quantity */}
                            <div className='py-2'>
                                <p className='text-lg'>Quantity: </p>
                                <div className='flex gap-2 items-center'>
                                    <button className='text-lg border px-2'>-</button>
                                    <p>{product.quantity}</p>
                                    <button className='text-lg border px-2'>+</button>

                                </div>

                            </div>

                                    {/* cart button */}

                                    <div className='py-2'>
                                        <button className='text-center font-bold bg-black text-white w-full p-2 rounded-md'>Add To Cart</button>
                                    </div>

                                    {/* characteristics */}
                                    <div className='bg-gray-200 py-2'>
                                        <h2 className='text-lg'>characteristics: </h2>
                                        <table className='w-full text-left'>
                                            <tbody>
                                                <tr>
                                                    <th className='py-1'>Material</th>
                                                    <th className='py-1'>Brand</th>
                                                </tr>
                                                <tr>

                                                <td className='py-1'>{product.material}</td>
                                                <td className='py-1'>{product.brand}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default BestSeller