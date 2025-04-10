import React, { useEffect, useState } from 'react'
import { toast, Toaster } from "sonner";
import ProductGrid from './ProductGrid';

const BestSeller = () => {

    const productDetails = [
        {
            name: "Jeans",
            discription: "Good quality jeans, no compromise on quality.",
            oldPrice: 99,
            currentPrice: 89,
            quantity: 1,
            material: "Leader",
            brand: "Addida",
            colors: ["red", "black", "blue"],
            sizes: ["S", "M", "L", "XL"],
            images: [{
                url: "https://picsum.photos/200?random=1",
                alt: "Jeans"
            },
            {
                url: "https://picsum.photos/200?random=2",
                alt: "Jeans"
            },
            ]
        },
    ];

    const [mainImage, setMainImage] = useState("https://picsum.photos/200?random=1");

    const [selectColor, setSelectColor] = useState("");
    const [selectSize, setSelectSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const handleQuantity = (action) => {
        if (action == "plus") setQuantity((prev) => prev + 1);
        if (action == "minus" && quantity > 1) setQuantity((prev) => prev - 1)
    }

    const handleCartBtn = () => {
        if (!selectColor || !selectSize) {
            toast.error("Please select size and color...", {
                duration: 2000,
            })
            return;
        }

        setIsBtnDisabled(true);

        setTimeout(() => {
            toast.success("Product added succefully...", {
                duration: 2000,
            })
            setIsBtnDisabled(false);
        }, 500)
    }

    useEffect(() => {
        if (productDetails?.images?.length > 0) {
            setMainImage(productDetails.images[0].url)
        }
    }, [productDetails])


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

                    {productDetails.map((product, index) => (
                        <>
                            <div key={index} className='flex flex-row sm:flex-col gap-4'>
                                {product.images.map((image, index) => (

                                    <div key={index}>
                                        <img key={index}
                                            src={image.url} alt={image.alt}
                                            onClick={() => setMainImage(image.url)}
                                            className={`min-w-16 h-16 object-cover rounded-lg cursor-pointer ${mainImage === image.url ? "border-black border-[2px]" : ""}`} />
                                    </div>
                                ))}

                            </div>

                        </>
                    ))}



                    {/* large image */}
                    <div className='w-[250px] h-full md:w-[300px] sm:w-[260px] vsm:w-full'>
                        {productDetails.map((product, index) => (

                            <img key={index} src={mainImage} alt={product.images[0]?.alt} className='w-full h-full rounded-lg object-cover' />
                        ))}
                    </div>
                </div>


                {/* Right side */}
                <div className='bg-gray-50 w-full md:w-1/3'>
                    {productDetails.map((product, index) => (
                        <div key={index}>
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
                                    {product.colors.map((color, index) => (
                                        <button key={index} onClick={() => setSelectColor(color)}>
                                            <div className={`w-6 h-6 rounded-full border ${selectColor === color ? "border-4 border-black" : ""}`} style={{ backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.7)" }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* size */}
                            <div className='py-2'>
                                <p className='text-lg'>Sizes: </p>
                                <div className='flex gap-2'>
                                    {product.sizes.map((size, index) => (

                                        <button key={index} onClick={() => setSelectSize(size)}>
                                            <div className={`w-6 h-6 rounded-sm border ${selectSize === size ? "bg-black text-white" : ""}`}>{size}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* quantity */}
                            <div className='py-2'>
                                <p className='text-lg'>Quantity: </p>
                                <div className='flex gap-2 items-center'>
                                    <button onClick={() => handleQuantity("minus")}
                                        className='text-lg border px-2'>-</button>
                                    <p>{quantity}</p>
                                    <button onClick={() => handleQuantity("plus")}
                                        className='text-lg border px-2'>+</button>

                                </div>

                            </div>

                            {/* cart button */}

                            <div className='py-2'>
                                <button onClick={handleCartBtn}
                                    disabled={isBtnDisabled}
                                    className={`text-center font-bold bg-black text-white w-full p-2 rounded-md ${isBtnDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>
                                    {isBtnDisabled ? "Adding..." : "Add To Cart"}</button>
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


            {/* You may know */}

            <div className='py-16 px-2 md:px-14 lg:px-16 xl:px-52'>
                <h2 className='text-2xl font-bold text-center'>You May Also Know</h2>
                <ProductGrid />
            </div>
        </>
    )
}

export default BestSeller