import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//helper function to load cart from local storage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] }
};

//helper function to save cart in local storage
const saveCartInStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

//fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: { userId, guestId },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

//add an item in cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, color, size, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                productId,
                quantity,
                color,
                size,
                guestId,
                userId
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//update the quantity in cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({ productId, quantity, color, size, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            {
                productId,
                quantity,
                color,
                size,
                guestId,
                userId
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, color, size, guestId, userId }, { rejectWithValue }) => {
    try {
        const query = new URLSearchParams({ productId, color, size, guestId, userId }).toString();
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart?${query}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

//merge guest cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, user }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
            {
                guestId, user
            },
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
});

//create slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null
    },

    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart")
        },

        removeItemLocally: (state, action) => {
            const { productId, color, size } = action.payload;
            state.cart.products = state.cart.products.filter(
                (item) => !(item.productId === productId && item.color === color && item.size === size)
            );
            saveCartInStorage(state.cart);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartInStorage(action.payload)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })


            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartInStorage(action.payload)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })


            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartInStorage(action.payload)
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            })


            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;

                // Check if cart was deleted
                if (action.payload?.msg === "Product removed and cart deleted because it became empty") {
                    state.cart = { products: [] }; // reset cart
                    localStorage.removeItem("cart"); // clear localStorage
                } else {
                    // Cart still exists
                    state.cart = action.payload;
                    saveCartInStorage(action.payload);
                }
            })

            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete item";
            })


            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartInStorage(action.payload)
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart";
            })
    }
});

export const { clearCart, removeItemLocally } = cartSlice.actions;
export default cartSlice.reducer;