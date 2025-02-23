import React, { useState } from 'react';
import { CiUser, CiShoppingCart, CiSearch } from "react-icons/ci";
import { MdMenu, MdOutlineClose } from "react-icons/md";
import Search from './Search';
import CartDrawer from '../../Pages/CartDrawer.jsx';
import Header from './Header.jsx';

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
                <Header/>
                <div className='flex justify-between items-center w-full px-6 md:px-24 py-4 absolute top-7 bg-white shadow-sm'>
                    <h1 className='text-2xl font-bold'>Rabbit</h1>
                    <div className={`md:flex gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${menuOpen ? 'block' : 'hidden'}`}>
                        <a href="#" className='block py-2 hover:underline'>MAN</a>
                        <a href="#" className='block py-2 hover:underline'>WOMAN</a>
                        <a href="#" className='block py-2 hover:underline'>TOP WEAR</a>
                        <a href="#" className='block py-2 hover:underline'>BOTTOM WEAR</a>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <a href="#" className='text-black text-xl hover:text-yellow-600'><CiUser /></a>
                        <button onClick={cartHandle} className='text-black text-xl hover:text-yellow-600 relative top-2'><CiShoppingCart />
                            <div className='w-4 h-4 bg-red-800 relative -top-5 left-2 rounded-full flex justify-center items-center'>
                                <p className='text-[12px] text-white'>4</p>
                            </div>
                        </button>
                        <button onClick={searchHandle} className='text-black text-xl hover:text-yellow-600'><CiSearch /></button>
                        <button onClick={toggleMenu} className='md:hidden text-2xl'>
                            {menuOpen ? <MdOutlineClose /> : <MdMenu />}
                        </button>
                    </div>
                </div>
                {isOpen && <Search closeSearch={() => setIsOpen(false)} />}

            {isShowCart ? <CartDrawer closeCart={() => setIsShowCart(false)} /> : <></>}

            </nav>
        </>
    );
};

export default Navbar;