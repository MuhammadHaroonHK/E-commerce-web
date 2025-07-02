import React, { useEffect, useState } from 'react'
import { toast, Toaster } from "sonner";
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProduct } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';

const BestSeller = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
    const { user, guestId } = useSelector((state) => state.auth);
    const productFetchId = productId || id;

    const [mainImage, setMainImage] = useState("https://picsum.photos/200?random=1");
    const [selectColor, setSelectColor] = useState("");
    const [selectSize, setSelectSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProduct({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantity = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleCartBtn = () => {
        if (!selectColor || !selectSize) {
            toast.error("Please select size and color...", {
                duration: 2000,
            });
            return;
        }

        setIsBtnDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectSize,
                color: selectColor,
                guestId,
                userId: user?._id,
            })
        ).then(() => {
            toast.success("Product added to cart!", {
                duration: 1000
            });
        }).finally(() => {
            setIsBtnDisabled(false);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {selectedProduct && (
                <div className='mx-auto p-2 sm:p-4 md:p-4 lg:p-8 flex xl:flex-row lg:flex-row md:flex-row sm:flex-row vsm:flex-col justify-center gap-4'>
                    {/* Left Side */}
                    <div className='flex flex-col-reverse sm:flex-row gap-4'>
                        {/* Small images */}
                        <div className='flex flex-row sm:flex-col gap-4'>
                            {selectedProduct.images?.map((image, index) => (
                                <div key={image.url}>
                                    <img
                                        src={image.url}
                                        alt={image.alt}
                                        onClick={() => setMainImage(image.url)}
                                        className={`min-w-16 h-16 object-cover rounded-lg cursor-pointer ${mainImage === image.url ? "border-black border-[2px]" : ""}`} />
                                </div>
                            ))}
                        </div>

                        {/* Main image */}
                        <div className='w-[250px] h-full md:w-[300px] sm:w-[260px] vsm:w-full'>
                            <img
                                src={mainImage}
                                alt={selectedProduct.images?.[0]?.alt}
                                className='w-full h-full rounded-lg object-cover' />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className='bg-gray-50 w-full md:w-1/3'>
                        <div>
                            <h2 className='text-2xl font-bold text-black'>
                                {selectedProduct.name}
                            </h2>
                            <p className='text-gray-500 line-through'>$ {selectedProduct.price}</p>
                            <p className='text-green-700 font-bold'>$ {selectedProduct.discountPrice}</p>

                            <p>{selectedProduct.description}</p>

                            {/* Color */}
                            <div className='py-2'>
                                <p className='text-lg'>Colors: </p>
                                <div className='flex gap-2'>
                                    {selectedProduct.colors?.map((color) => (
                                        <button key={color} onClick={() => setSelectColor(color)}>
                                            <div className={`w-6 h-6 rounded-full border ${selectColor === color ? "border-4 border-black" : ""}`} style={{ backgroundColor: color.toLowerCase(), filter: "brightness(0.7)" }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size */}
                            <div className='py-2'>
                                <p className='text-lg'>Sizes: </p>
                                <div className='flex gap-2'>
                                    {selectedProduct.sizes?.map((size) => (
                                        <button key={size} onClick={() => setSelectSize(size)}>
                                            <div className={`w-6 h-6 rounded-sm border ${selectSize === size ? "bg-black text-white" : ""}`}>{size}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className='py-2'>
                                <p className='text-lg'>Quantity: </p>
                                <div className='flex gap-2 items-center'>
                                    <button onClick={() => handleQuantity("minus")} className='text-lg border px-2'>-</button>
                                    <p>{quantity}</p>
                                    <button onClick={() => handleQuantity("plus")} className='text-lg border px-2'>+</button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <div className='py-2'>
                                <button
                                    onClick={handleCartBtn}
                                    disabled={isBtnDisabled}
                                    className={`text-center font-bold bg-black text-white w-full p-2 rounded-md ${isBtnDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>
                                    {isBtnDisabled ? "Adding..." : "Add To Cart"}
                                </button>
                            </div>

                            {/* Characteristics */}
                            <div className='bg-gray-200 py-2'>
                                <h2 className='text-lg'>characteristics: </h2>
                                <table className='w-full text-left'>
                                    <tbody>
                                        <tr>
                                            <th className='py-1'>Material</th>
                                            <th className='py-1'>Brand</th>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>{selectedProduct.material}</td>
                                            <td className='py-1'>{selectedProduct.brand}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* You may know */}
            <div className='py-16 px-2 md:px-14 lg:px-16 xl:px-52'>
                <h2 className='text-2xl font-bold text-center'>You May Also Know</h2>
                <ProductGrid products={similarProducts} loading={loading} error={error} />
            </div>
        </>
    )
}

export default BestSeller;
