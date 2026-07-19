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
        <p className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-gray-700">
          Fields marked <span className="font-semibold text-red-600">*</span> are required. Fields with <span className="font-semibold text-gray-500">(optional)</span> can be left empty.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            name="name"
            value={productData.name}
            onChange={changeField}
            placeholder="e.g. Slim-Fit Cotton Shirt"
            required
          />
          <Field
            label="SKU"
            name="sku"
            value={productData.sku}
            onChange={changeField}
            placeholder="e.g. SFC-SHIRT-001"
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
            placeholder="e.g. 34.99"
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
            placeholder="e.g. 29.99"
            helperText="Leave empty when there is no sale price."
            optional
          />
          <Field
            label="Stock quantity"
            name="countInStock"
            type="number"
            min="0"
            value={productData.countInStock}
            onChange={changeField}
            placeholder="e.g. 50"
            required
          />
          <Field
            label="Category"
            name="catagory"
            value={productData.catagory}
            onChange={changeField}
            placeholder="e.g. Top Wear"
            required
          />
          <Field
            label="Brand"
            name="brand"
            value={productData.brand}
            onChange={changeField}
            placeholder="e.g. Urban Chic"
            optional
          />
          <Field
            label="Collection"
            name="collections"
            value={productData.collections}
            onChange={changeField}
            placeholder="e.g. Summer Essentials"
            required
          />
          <Field
            label="Sizes"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(event) => changeList("sizes", event.target.value)}
            placeholder="e.g. S, M, L, XL"
            helperText="Separate each size with a comma."
            required
          />
          <Field
            label="Colors"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(event) => changeList("colors", event.target.value)}
            placeholder="e.g. Black, White, Navy"
            helperText="Separate each color with a comma."
            required
          />
          <Field
            label="Material"
            name="material"
            value={productData.material}
            onChange={changeField}
            placeholder="e.g. 100% Cotton"
            optional
          />
          <Field
            label="Tags"
            name="tage"
            value={productData.tage}
            onChange={changeField}
            placeholder="e.g. summer, casual, office"
            helperText="Separate each tag with a comma."
            optional
          />
          <Field
            label="Weight (kg)"
            name="weight"
            type="number"
            min="0"
            step="0.01"
            value={productData.weight}
            onChange={changeField}
            placeholder="e.g. 0.35"
            optional
          />
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-800">
            <span className="flex items-center gap-2">
              Gender <span className="text-xs font-normal text-gray-500">(optional)</span>
            </span>
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
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-800">
          <span className="flex items-center gap-2">
            Description <span className="text-red-600">*</span>
          </span>
          <textarea
            name="description"
            rows="4"
            value={productData.description}
            onChange={changeField}
            required
            placeholder="Describe the fit, fabric, key features, and ideal use of this product."
            className="rounded border p-2 font-normal"
          />
        </label>
        <div>
          <label className="text-sm font-medium text-gray-800">
            <span className="flex items-center gap-2">
              Product images <span className="text-red-600">*</span>
            </span>
          </label>
          <p className="mt-1 text-xs text-gray-500">Upload at least one clear product image. You can add more than one image.</p>
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
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={changeField}
            />
            Published <span className="text-xs text-gray-500">(optional)</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={changeField}
            />
            Featured <span className="text-xs text-gray-500">(optional)</span>
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
const Field = ({ label, helperText, required, optional, ...props }) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-gray-800">
    <span className="flex items-center gap-1">
      {label}
      {required && <span className="text-red-600">*</span>}
      {optional && <span className="text-xs font-normal text-gray-500">(optional)</span>}
    </span>
    <input {...props} required={required} className="rounded border p-2 font-normal placeholder:text-gray-400" />
    {helperText && <span className="text-xs font-normal text-gray-500">{helperText}</span>}
  </label>
);

export default AddProduct;