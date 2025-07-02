import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../Products/GenderCollection'
import NewArival from '../Products/NewArival'
import BestSeller from '../Products/BestSeller'
import FeaturedCollection from '../Products/FeaturedCollection'
import FeaturesSection from '../Products/FeaturesSection'
import FinalSection from '../Products/FinalSection'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { fetchProductsByFilter } from '../redux/slices/productSlice'

const Home = () => {
  const dispatch=useDispatch();
  const {products, loading, error}=useSelector((state) => state.products);
  const [bestSeller, setBestSeller] = useState(null);
  useEffect(() => {
      //fetch products for specific collection
      dispatch(
        fetchProductsByFilter({
          gender:"Women",
          category:"Bottom 'Wear",
          limit:8,
        })
      );

        //fetch best seller
        const fetchBestSeller=async() => {
          try {
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
            setBestSeller(response.data);
          } catch (error) {
              console.error(error);
              
          }
        };
        fetchBestSeller();
  }, [dispatch])
  return (
    <>
      <Hero />
      <GenderCollection />
      <NewArival />
      <div className='mt-8 text-center'>
        <h2 className='text-3xl font-bold'>Best Seller</h2>
      </div>
      {bestSeller ? (<BestSeller productId={bestSeller._id}/>) : (
        <p className='text-center'>Loading best seller product...</p>
      )}
      <div className='py-2 px-2 md:px-14 lg:px-16 xl:px-28 mt-6'>
        <h2 className='text-2xl font-bold text-center'>Top Wear for Women's</h2>
      </div>
      <FeaturedCollection products={products} loading={loading} error={error} />
      <FeaturesSection />
      <FinalSection />
    </>
  )
}

export default Home