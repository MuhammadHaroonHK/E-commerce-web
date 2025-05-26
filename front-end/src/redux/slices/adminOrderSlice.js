import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all orders (admin only)
export const fetchAllOders = createAsyncThunk("adminOders/fetchAllOders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
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

//update order deleviry status (admin only)
export const updateOrderStatus = createAsyncThunk("adminOders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                { status },
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

//delete order (admin only)
export const deleteOrder = createAsyncThunk("adminOders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

//create slice
const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;

                //calculate total sales
                const totalSales = action.payload.reduce((acc, order) => {
                    return acc + order.totalPrice;
                }, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAllOders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            //update order status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = action.payload;
                const orderIndex = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                );

                if (orderIndex !== -1) {
                    state.users[orderIndex] = updatedOrder
                }
            })

            //delete order
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((order) => order._id !== action.payload)
            })
    }
});

export default adminOrderSlice.reducer;