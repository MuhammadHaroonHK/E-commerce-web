import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//to fetch user orders
export const fetchUserOrder = createAsyncThunk("order/fetchUserOrder",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/my-orders`,
                checkoutData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);


//to fetch user orders
export const fetchUserDetails = createAsyncThunk("order/fetchUserDetails",
    async (fetchUserDetails, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/my-orders/${orderId}`,
                fetchUserDetails,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

//create slice
const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch user orders
            .addCase(fetchUserOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            //fetch order details
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export default orderSlice.reducer;