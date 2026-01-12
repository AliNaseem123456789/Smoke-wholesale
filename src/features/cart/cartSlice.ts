import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set this so cookies are sent with every request
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* ---------- ASYNC THUNKS ---------- */

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const response = await api.get("/cart");
  return response.data;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }: { productId: number; quantity: number }) => {
    const response = await api.post("/cart/add", { productId, quantity });
    return response.data; // Returns the added/updated item
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId: number) => {
    await api.delete(`/cart/${productId}`);
    return productId;
  }
);

/* ---------- THE SLICE ---------- */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [] as any[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Redux received payload:", action.payload);
        state.items = action.payload;
      })
      // Add Item
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.product_id === action.payload.product_id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // Update existing
        } else {
          state.items.push(action.payload); // Add new
        }
      })
      // Remove Item
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product_id !== action.payload
        );
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
