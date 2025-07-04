import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

//fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchAdminProducts", async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    );
    return response.data;
});

//to create new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productDetails) => {
    const response = await axios.post(`${API_URL}/api/admin/products`,
        productDetails,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    );
    return response.data;
});

//update product
export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({ id, productData }) => {
    const response = await axios.put(`${API_URL}/api/admin/products/${id}`,
        productData,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    );
    return response.data;
});

//delete product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id) => {
    const response = await axios.delete(`${API_URL}/api/products/${id}`,
        {
            headers: {
                Authorization: USER_TOKEN
            }
        }
    );
    return id;
});

//create slice
const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload)
            })

            //update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );

                if (userIndex !== -1) {
                    state.products[index] = action.payload;
                }
            })

            //delete user
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload)
            })
    }
});

export default adminProductSlice.reducer;