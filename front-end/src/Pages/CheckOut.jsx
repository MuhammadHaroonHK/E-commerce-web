import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CheckOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);
    const [checked, setChecked] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart && cart.products.length > 0) {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    },
                    body: JSON.stringify({
                        checkoutItems: cart.products,
                        shippingAddress,
                        paymentMethod: 'MockPayment',
                        totalPrice: cart.totalPrice
                    })
                });

                const data = await res.json();

                if (res.ok && data._id) {
                    setCheckoutId(data._id);
                    setChecked(true);
                } else {
                    alert('Failed to create checkout session.');
                }
            } catch (error) {
                console.error('Checkout error:', error);
                alert('An error occurred during checkout.');
            }
        }
    };

    const handleMockPayment = async () => {
        if (!checkoutId) return;

        try {
            // Step 1: Mark as paid
            const paymentRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
                body: JSON.stringify({
                    paymentStatus: 'paid',
                    paymentDetails: {
                        paymentId: 'mock123',
                        paymentMethod: 'MockPayment',
                    },
                }),
            });

            const paymentData = await paymentRes.json();

            if (!paymentRes.ok) {
                alert(paymentData.msg || 'Payment failed');
                return;
            }

            // Step 2: Finalize and create order
            const finalizeRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });

            const finalizeData = await finalizeRes.json();

            if (!finalizeRes.ok) {
                alert(finalizeData.msg || 'Finalize failed');
                return;
            }

            // ✅ Store last order in localStorage for confirmation page
            const orderSummary = {
                orderId: finalizeData._id || checkoutId,
                date: new Date().toISOString(),
                products: cart.products,
                paymentMethod: 'MockPayment',
                address: `${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}, ${shippingAddress.phone}`
            };

            localStorage.setItem('lastOrder', JSON.stringify(orderSummary));
            localStorage.removeItem('cart');

            alert('Order placed successfully!');
            navigate('/conform-order');

        } catch (err) {
            console.error('Finalize Error:', err);
            alert('Something went wrong during finalization.');
        }
    };


    return (
        <div className='flex flex-col md:flex-row mx-6 lg:mx-36 my-6'>
            {/* Left Side */}
            <div className='w-full md:w-1/2 px-4 sm:px-8 py-4 border rounded-lg'>
                <h2 className='font-bold text-xl uppercase mb-2'>Checkout</h2>
                <h3 className='font-semibold text-lg mb-2'>Contact Details</h3>
                <form onSubmit={handleSubmit}>
                    <label>Email</label><br />
                    <input
                        type='email'
                        required
                        defaultValue={user?.email || ''}
                        className='border bg-gray-50 w-full p-1 mb-3'
                    />

                    <h2 className='font-semibold text-lg mb-2'>Delivery</h2>
                    <div className='flex flex-col sm:flex-row w-full gap-8'>
                        <div className='w-full'>
                            <label>First Name</label><br />
                            <input
                                type='text'
                                className='border p-1 w-full'
                                value={shippingAddress.firstName}
                                required
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                                }
                            />
                        </div>
                        <div className='w-full'>
                            <label>Last Name</label><br />
                            <input
                                type='text'
                                className='border p-1 w-full mb-3'
                                value={shippingAddress.lastName}
                                required
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <label>Address</label><br />
                    <input
                        type='text'
                        className='border w-full p-1 mb-3'
                        value={shippingAddress.address}
                        required
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                    />

                    <div className='flex flex-col sm:flex-row w-full gap-8'>
                        <div className='w-full'>
                            <label>City</label><br />
                            <input
                                type='text'
                                className='border p-1 w-full'
                                value={shippingAddress.city}
                                required
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                                }
                            />
                        </div>
                        <div className='w-full'>
                            <label>Postal Code</label><br />
                            <input
                                type='number'
                                className='border p-1 w-full mb-3'
                                value={shippingAddress.postalCode}
                                required
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <label>Country</label><br />
                    <input
                        type='text'
                        className='border w-full p-1 mb-3'
                        value={shippingAddress.country}
                        required
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, country: e.target.value })
                        }
                    />

                    <label>Phone</label><br />
                    <input
                        type='tel'
                        className='border w-full p-1 mb-3'
                        value={shippingAddress.phone}
                        required
                        onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, phone: e.target.value })
                        }
                    />

                    {!checked ? (
                        <button type='submit' className='w-full bg-black text-white py-2 rounded-lg'>
                            Continue To Payment
                        </button>
                    ) : (
                        <div>
                            <h3 className='text-18 mb-6 mt-3 font-semibold'>Mock Payment</h3>
                            <button
                                type='button'
                                onClick={handleMockPayment}
                                className='border items-center w-full py-2 rounded-lg font-bold text-xl shadow-md mb-3 hover:bg-gray-50'
                            >
                                Pay with Mock Gateway
                            </button>
                        </div>
                    )}
                </form>
            </div>

            {/* Right Side */}
            <div className='w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-lg mt-6 md:mt-0'>
                <div className='border-b p-3'>
                    <h2 className='font-bold text-xl'>Order Summary</h2>
                </div>

                {cart?.products?.map((product, key) => (
                    <div key={key} className='flex items-center justify-between mt-6 p-3 border-b'>
                        <div className='flex gap-2'>
                            <img src={product.image} alt={product.name} className='w-16 rounded-lg' />
                            <div>
                                <h2 className='font-semibold'>{product.name}</h2>
                                <p className='text-gray-500 text-sm'>
                                    Color: {product.color} | Size: {product.size}
                                </p>
                            </div>
                        </div>
                        <p className='font-semibold'>${product.price.toLocaleString()}</p>
                    </div>
                ))}

                <div className='flex items-center justify-between mt-6 p-3'>
                    <h3 className='text-14'>SubTotal</h3>
                    <p className='font-semibold'>${cart?.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex items-center justify-between p-3 border-b'>
                    <h3 className='text-14'>Shipping</h3>
                    <p className='uppercase'>Free</p>
                </div>
                <div className='flex items-center justify-between mt-2 p-3'>
                    <h3 className='text-14'>Total</h3>
                    <p className='font-semibold'>${cart?.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
