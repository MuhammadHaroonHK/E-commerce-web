import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByFilter = createAsyncThunk("products/fetchByFilter",
    async ({
        collection,
        size,
        color,
        gender,
        sortBy,
        search,
        category,
        material,
        brand,
    }) => {
        const query = new URLSearchParams();
        if (collection) query.append("collection", collection);
        if (size) query.append("size", size);
        if (color) query.append("color", color);
        if (gender) query.append("gender", gender);
        if (sortBy) query.append("sortBy", sortBy);
        if (search) query.append("search", search);
        if (category) query.append("category", category);
        if (material) query.append("material", material);
        if (brand) query.append("brand", brand);

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`);
        return response.data;
    }
);

//to fetch single product details
export const fetchProductDetails = createAsyncThunk("products/fetchProductDetails",
    async (id) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        return response.data;
    }
);

//to update product
export const updateProduct = createAsyncThunk("products/updateProduct",
    async ({ id, productDetails }) => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productDetails,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
);

//to fetch similar products
export const fetchSimilarProduct = createAsyncThunk("products/fetchSimilarProduct",
    async ({ id }) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`);
        return response.data;
    }
);

//create Slice
const productsSlice = createSlice({
    name: "products",
    initialState: {
        produts: [],
        selectedProducts: null, //store the details of single product
        similar: [],
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            sortBy: "",
            material: "",
            collection: "",
            search: "",
        },
    },

    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                sortBy: "",
                material: "",
                collection: "",
                search: "",
            }
        }
    },

    extraReducers:(builder) =>{
        builder
        //handel fetching product with filter
        .addCase(fetchProductsByFilter.pending, (state) => {
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductsByFilter.fulfilled, (state,action) => {
            state.loading=false;
            state.produts=Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(fetchProductsByFilter.rejected, (state, action) => {
            state.loading=false;
            state.error=action.error.message;
        })

        //handle single product details
        .addCase(fetchProductDetails.pending, (state) => {
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchProductDetails.fulfilled, (state,action) => {
            state.loading=false;
            state.selectedProducts=action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
            state.loading=false;
            state.error=action.error.message;
        })

        //handle updated products
        .addCase(updateProduct.pending, (state) => {
            state.loading=true;
            state.error=null;
        })
        .addCase(updateProduct.fulfilled, (state,action) => {
            state.loading=false;
            const updatedProduct=action.payload;
            const index=state.produts.findIndex((product) => product._id === updateProduct._id);

            if(index !== -1) {
                state.produts[index]= updatedProduct;
            }
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.loading=false;
            state.error=action.error.message;
        })

        //similar products
        .addCase(fetchSimilarProduct.pending, (state) => {
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchSimilarProduct.fulfilled, (state,action) => {
            state.loading=false;
            state.produts=action.payload;
        })
        .addCase(fetchSimilarProduct.rejected, (state, action) => {
            state.loading=false;
            state.error=action.error.message;
        })
    }
});

export const {setFilters, clearFilters}=productsSlice.actions;
export default productsSlice.reducer;