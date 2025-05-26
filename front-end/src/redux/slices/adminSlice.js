import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all users (admin only)
export const fetchUsers = createAsyncThunk("cart/fetchUsers",
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            checkoutData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    }
);

//create user action
export const addUser = createAsyncThunk("cart/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData,
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

//create user action
export const updateUser = createAsyncThunk("cart/updateUser",
    async ({ id, name, role, email }) => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            { name, email, role },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return response.data;
    }
);

//delete user action
export const deleteUser = createAsyncThunk("cart/deleteUser",
    async (id) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
        return id;
    }
);

//create slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //update user
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser=action.payload;
                const userIndex=state.users.findIndex(
                    (user) => user._id === updatedUser._id
                );

                if(userIndex !== -1 ) {
                    state.users[userIndex]=updatedUser
                }
            })
            
            //delete user
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users=state.users.filter((user) => user._id !== action.payload)
            })

            //add user
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload.user); //add new user
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export default adminSlice.reducer;