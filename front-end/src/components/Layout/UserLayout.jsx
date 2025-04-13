import React from 'react'
import Navbar from '../Commen/Navbar'
import Footer from '../Commen/Footer'
import Home from '../../Pages/Home'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default UserLayout