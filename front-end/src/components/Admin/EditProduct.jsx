import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails, updateProduct } from '../../redux/slices/productSlice';
import axios from 'axios';
const EditProduct = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const{id}=useParams()
  const {selectedProduct, loading, error}=useSelector((state)=>state.products)

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: '',
    images: []
  });

  const [uploading, setUploading]=useState(false) //image uploading

  useEffect(()=>{
    if(id) {
      dispatch(fetchProductDetails(id))
    }
  }, [dispatch, id]);

  useEffect(()=>{
    if(selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData=new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, 
        formData,
      {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      } );
      setProductData((prevData) => ({
        ...prevData,
        images:[...prevData.images, {url:data.url, altText:""}]
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productDetails: productData }));
    navigate("/admin/products")
  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className="w-full px-5 sm:px-10 lg:px-20 py-10">
      <h1 className="font-bold text-2xl">Products Management</h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label htmlFor="name">Name</label><br />
        <input
          type="text"
          placeholder="Name of Product"
          value={productData.name}
          required
          name="name"
          onChange={handleChanges}
          className="border w-full p-2 mb-4 rounded"
        />

        {/* Description */}
        <label htmlFor="description">Description</label><br />
        <textarea
          placeholder="Description of Product"
          rows={4}
          value={productData.description}
          required
          name="description"
          onChange={handleChanges}
          className="border w-full p-2 mb-4 rounded"
        />

        {/* Price */}
        <label htmlFor="price">Price</label><br />
        <input
          type="number"
          placeholder="Price of Product"
          value={productData.price}
          required
          name="price"
          onChange={handleChanges}
          className="border w-full p-2 mb-4 rounded"
        />

        {/* Count In Stock */}
        <label htmlFor="countInStock">Count In Stock</label><br />
        <input
          type="number"
          placeholder="Count of Product"
          value={productData.countInStock}
          required
          name="countInStock"
          onChange={handleChanges}
          className="border w-full p-2 mb-4 rounded"
        />

        {/* SKU */}
        <label htmlFor="sku">SKU</label><br />
        <input
          type="text"
          placeholder="SKU of Product"
          value={productData.sku}
          required
          name="sku"
          onChange={handleChanges}
          className="border w-full p-2 mb-4 rounded"
        />

        {/* Sizes */}
        <label htmlFor="sizes">Sizes</label><br />
        <input
          type="text"
          placeholder="Sizes of Product (comma separated)"
          value={productData.sizes.join(', ')}
          required
          name="sizes"
          onChange={(e) =>
            setProductData({
              ...productData,
              sizes: e.target.value.split(',').map((size) => size.trim())
            })
          }
          className="border w-full p-2 mb-4 rounded"
        />

        {/* Colors */}
        <label htmlFor="colors">Colors</label><br />
        <input
          type="text"
          placeholder="Colors of Product (comma separated)"
          value={productData.colors.join(', ')}
          required
          name="colors"
          onChange={(e) =>
            setProductData({
              ...productData,
              colors: e.target.value.split(',').map((color) => color.trim())
            })
          }
          className="border w-full p-2 mb-4 rounded"
        />

        {/* Image Upload */}
        <label htmlFor="image">Upload Image</label><br />
        <input
          type="file"
          name="image"
          onChange={handleImage}
          className="border w-full p-2 rounded"
        />
        {uploading && <p>Uploading image...</p>}
        <div className="flex gap-4 mt-4 mb-4">
          {productData.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.altText}
              className="w-20 h-20 object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 w-full text-white px-2 py-1 rounded-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
