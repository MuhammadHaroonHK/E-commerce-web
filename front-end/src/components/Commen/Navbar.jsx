import React, { useState } from 'react';
import { CiUser, CiShoppingCart, CiSearch } from "react-icons/ci";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import Search from './Search';
import CartDrawer from '../Layout/CartDrawer.jsx';
import Header from './Header.jsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isShowCart, setIsShowCart] = useState(false);

    const searchHandle = () => {
        setIsOpen(!isOpen)

    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)

    };

    const cartHandle = () => {
        setIsShowCart(!isShowCart)
    };

    return (
        <>
            <nav>
                <Header />

                {/* container */}
                <div className='flex justify-between items-center w-full px-6 md:px-24 py-4 relative bg-white z-20 shadow-sm'>

                    {/* Left Side */}
                    <Link to={"/"} className='text-2xl font-bold cursor-pointer'>Rabbit</Link>

                    {/* Center */}
                    <div className={`md:flex gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${menuOpen ? 'block' : 'hidden'}`}>
                        <Link to="/collection" className='block py-2 hover:underline'>MAN</Link>
                        <a href="#" className='block py-2 hover:underline'>WOMAN</a>
                        <a href="#" className='block py-2 hover:underline'>TOP WEAR</a>
                        <a href="#" className='block py-2 hover:underline'>BOTTOM WEAR</a>
                    </div>

                    {/* Right Side */}
                    <div className='flex gap-4 items-center'>
                        <Link to={"/admin"} className='text-white bg-black rounded-lg px-2 py-1'>Admin</Link>
                        <Link to="/profile" className='text-black text-xl hover:text-yellow-600'><CiUser />
                        </Link>

                        {/* Cart icon */}
                        <button onClick={cartHandle} className='text-black text-xl hover:text-yellow-600 relative top-2'><CiShoppingCart />
                            <div className='w-4 h-4 bg-red-800 relative -top-5 left-2 rounded-full flex justify-center items-center'>
                                <p className='text-[12px] text-white'>4</p>
                            </div>
                        </button>

                        {/* Search icon */}
                        <button onClick={searchHandle} className='text-black text-xl hover:text-yellow-600'><CiSearch /></button>
                        <button onClick={toggleMenu} className='md:hidden text-2xl'>
                            {menuOpen ? <MdOutlineClose /> : <MdMenu />}
                        </button>
                    </div>
                </div>

                {/* open and close logic */}
                {isOpen && <Search closeSearch={() => setIsOpen(false)} />}

                {isShowCart ? <CartDrawer closeCart={() => setIsShowCart(false)} /> : <></>}

            </nav>
        </>
    );
};

export default Navbar;