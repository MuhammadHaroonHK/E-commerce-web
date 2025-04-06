import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const CheckOut = () => {

    const products = [{
        productId: 1,
        name: "T-Shirt",
        price: 15,
        quantity: 1,
        color: "blue",
        size: "M",
        img: "https://picsum.photos/200?random=1"
    },
    {
        productId: 2,
        name: "Jeans",
        price: 10,
        quantity: 1,
        color: "Black",
        size: "M",
        img: "https://picsum.photos/200?random=2"
    },
    ]


    const nevigate = useNavigate()

    const handlePayment = () => {
        nevigate("/conform-order");
    }

    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    });

    const [checked, setChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(shippingAddress)
        setChecked(true);
    }
    return (
        <div className='flex flex-col md:flex-row mx-6 lg:mx-36 my-6'>
            {/* Left Side */}
            <div className='w-full md:w-1/2 px-4 sm:px-8 py-4 border rounded-lg'>
                <h2 className='font-bold text-xl uppercase mb-2'>Checkout</h2>
                <h3 className='font-semibold text-lg mb-2'>Contact Details</h3>
                <form onSubmit={handleSubmit}>
                    <label>Email</label><br />
                    <input type="email"
                        defaultValue="haroonhk059@gmail.com"
                        className='border bg-gray-50 w-full p-1 mb-3' />

                    <h2 className='font-semibold text-lg mb-2'>Delevery</h2>
                    <div className='flex flex-col sm:flex-row w-full gap-8'>
                        <div className='w-full'>
                            <label>First Name</label> <br />
                            <input type="text" className='border p-1 w-full'
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} />

                        </div>
                        <div className='w-full'>
                            <label>Last Name</label> <br />
                            <input type="text" className='border p-1 w-full mb-3'
                                value={shippingAddress.LastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} />

                        </div>
                    </div>

                    <label>Address</label><br />
                    <input type="text"
                        className='border w-full p-1 mb-3'
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} />

                    <div className='flex flex-col sm:flex-row w-full gap-8'>
                        <div className='w-full'>
                            <label>City</label> <br />
                            <input type="text" className='border p-1 w-full'
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />

                        </div>
                        <div className='w-full'>
                            <label>Postal Code</label> <br />
                            <input type="number" className='border p-1 w-full mb-3'
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} />

                        </div>
                    </div>

                    <label>Country</label><br />
                    <input type="text"
                        className='border w-full p-1 mb-3'
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />

                    <label>Phone</label><br />
                    <input type="tel"
                        className='border w-full p-1 mb-3'
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} />

                    {!checked ? (<button type='submit' className='w-full bg-black text-white py-2 rounded-lg'>Continue To Payment</button>)
                        :
                        (<div>
                            <h3 className='text-18 mb-6 mt-3 font-semibold'>Pay with PayPal</h3>
                            <button onClick={handlePayment} className='border items-center w-full py-2 rounded-lg font-bold text-xl shadow-md mb-3 hover:bg-gray-50'><p className='text-blue-700'>Pay<span className='text-yellow-700'>Pal</span></p></button>

                            <button className='w-full bg-black text-white py-2 rounded-lg font-semibold text-lg'>Creadet Card</button>
                        </div>)}
                </form>
            </div>

            {/* Right Side */}
            <div className='w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-lg mt-6 md:mt-0'>
            <div className='border-b p-3'>
                <h2 className='font-bold text-xl'>Order Summary</h2>

            </div>

                {products.map((product, key) => (
                    
                    <div key={key} className='flex items-center justify-between mt-6 p-3 border-b'>

                        {/* Left side */}
                        <div className='flex gap-2'>
                            <img src={product.img} alt={product.name} className='w-16 rounded-lg' />
                            <div>
                                <h2 className='font-semibold'>{product.name}</h2>
                                <p className='text-gray-500 text-sm'>Color: {product.color} | Size: {product.size}</p>
                            </div>
                        </div>

                        {/* Right side (Price) */}
                        <p className='font-semibold'>${product.price.toLocaleString()}</p>

                    </div>
                ))}

                <div className='flex items-center justify-between mt-6 p-3'>
                    <h3 className='text-14'>SubTotal</h3>
                    <p className='font-semibold'>$25</p>
                </div>
                <div className='flex items-center justify-between p-3 border-b'>
                    <h3 className='text-14'>Shipping</h3>
                    <p className='uppercase'>Free</p>
                </div>

                <div className='flex items-center justify-between mt-2 p-3'>
                    <h3 className=' text-14'>Total</h3>
                    <p className='font-semibold'>$25</p>
                </div>
            </div>

        </div>
    )
}

export default CheckOut