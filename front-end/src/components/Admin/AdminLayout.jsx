import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa6';
import AdminSidebar from './AdminSidebar';
import AdminMainContent from './AdminMainContent';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)

    };


    return (
        <div className='min-h-screen flex flex-col md:flex-row relative'>

            {/* Mobile View */}
            <div className='flex md:hidden p-4 bg-gray-900 text-white z-20'>
                <button onClick={toggleMenu}>
                    <FaBars size={24}/>
                </button>
                <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
            </div>

            {/* OverLay */}
        {menuOpen && (
            <div className='fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden' onClick={toggleMenu}></div>
        )}

        <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>

            {/* Sidebare */}

            <AdminSidebar/>
        </div>
        {/* Main content */}

        <Outlet/>

        </div>
    )
}

export default AdminLayout