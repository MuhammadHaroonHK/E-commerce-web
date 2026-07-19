import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";

const initialProduct = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  countInStock: "",
  sku: "",
  catagory: "",
  brand: "",
  sizes: [],
  colors: [],
  collections: "",
  material: "",
  gender: "Unisex",
  images: [],
  isFeatured: false,
  isPublished: true,
  tage: "",
  weight: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(initialProduct);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const changeField = ({ target: { name, value, type, checked } }) => {
    setProductData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const changeList = (name, value) => {
    setProductData((current) => ({
      ...current,
      [name]: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    }));
  };

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
      );
      setProductData((current) => ({
        ...current,
        images: [
          ...current.images,
          { url: data.imageUrl, altText: current.name },
        ],
      }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Image upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const removeImage = (imageIndex) => {
    setProductData((current) => ({
      ...current,
      images: current.images.filter((_, index) => index !== imageIndex),
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!productData.images.length) {
      toast.error("Upload at least one product image");
      return;
    }
    const payload = {
      ...productData,
      price: Number(productData.price),
      discountPrice: productData.discountPrice
        ? Number(productData.discountPrice)
        : undefined,
      countInStock: Number(productData.countInStock),
      weight: productData.weight ? Number(productData.weight) : undefined,
      tage: productData.tage
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    try {
      setSubmitting(true);
      await dispatch(createProduct(payload)).unwrap();
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.msg || error?.message || "Could not add the product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full px-5 py-10 sm:px-10 lg:px-20">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <form onSubmit={submit} className="mt-6 max-w-3xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            name="name"
            value={productData.name}
            onChange={changeField}
            required
          />
          <Field
            label="SKU"
            name="sku"
            value={productData.sku}
            onChange={changeField}
            required
          />
          <Field
            label="Price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={productData.price}
            onChange={changeField}
            required
          />
          <Field
            label="Discount price"
            name="discountPrice"
            type="number"
            min="0"
            step="0.01"
            value={productData.discountPrice}
            onChange={changeField}
          />
          <Field
            label="Stock quantity"
            name="countInStock"
            type="number"
            min="0"
            value={productData.countInStock}
            onChange={changeField}
            required
          />
          <Field
            label="Category"
            name="catagory"
            value={productData.catagory}
            onChange={changeField}
            required
          />
          <Field
            label="Brand"
            name="brand"
            value={productData.brand}
            onChange={changeField}
          />
          <Field
            label="Collection"
            name="collections"
            value={productData.collections}
            onChange={changeField}
            required
          />
          <Field
            label="Sizes"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(event) => changeList("sizes", event.target.value)}
            placeholder="S, M, L"
            required
          />
          <Field
            label="Colors"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(event) => changeList("colors", event.target.value)}
            placeholder="Black, White"
            required
          />
          <Field
            label="Material"
            name="material"
            value={productData.material}
            onChange={changeField}
          />
          <Field
            label="Tags"
            name="tage"
            value={productData.tage}
            onChange={changeField}
            placeholder="summer, casual"
          />
          <Field
            label="Weight (kg)"
            name="weight"
            type="number"
            min="0"
            step="0.01"
            value={productData.weight}
            onChange={changeField}
          />
          <label className="flex flex-col gap-1 text-sm font-medium">
            Gender
            <select
              name="gender"
              value={productData.gender}
              onChange={changeField}
              className="rounded border p-2 font-normal"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Description
          <textarea
            name="description"
            rows="4"
            value={productData.description}
            onChange={changeField}
            required
            className="rounded border p-2 font-normal"
          />
        </label>
        <div>
          <label className="text-sm font-medium">Product images</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
            className="mt-1 block w-full rounded border p-2"
          />
          {uploading && (
            <p className="mt-1 text-sm text-gray-500">Uploading image…</p>
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            {productData.images.map((image, index) => (
              <div key={image.url} className="relative">
                <img
                  src={image.url}
                  alt={image.altText}
                  className="h-20 w-20 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={changeField}
            />{" "}
            Published
          </label>
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={changeField}
            />{" "}
            Featured
          </label>
        </div>
        <button
          type="submit"
          disabled={uploading || submitting}
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {submitting ? "Adding product…" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Field = ({ label, ...props }) => (
  <label className="flex flex-col gap-1 text-sm font-medium">
    {label}
    <input {...props} className="rounded border p-2 font-normal" />
  </label>
);

export default AddProduct;
