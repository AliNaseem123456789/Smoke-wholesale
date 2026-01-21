import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "https://smoke-wholesale-backend-production.up.railway.app/api",
  withCredentials: true,
});

/* ---------- TYPES ---------- */
export interface CartItem {
  product_id: number;
  quantity: number;
  products: {
    id: number;
    title: string;
    brand: string;
    description: string;
    url?: string;
    price?: number; // Added since your UI uses it
  } | null;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

/* ---------- ASYNC THUNKS ---------- */

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const response = await api.get("/cart/");
  return response.data; // Now contains joined product data
});

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }: { productId: number; quantity: number }) => {
    // We send to backend, then refetch or handle returned upserted data
    const response = await api.post("/cart/add", { productId, quantity });
    return response.data;
  },
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async (productId: number) => {
    await api.delete(`/cart/${productId}`);
    return productId;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as CartState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // Since the backend returns an array from upsert, we grab the first item
        const updatedItem = Array.isArray(action.payload)
          ? action.payload[0]
          : action.payload;
        const index = state.items.findIndex(
          (item) => item.product_id === updatedItem.product_id,
        );

        if (index !== -1) {
          // Keep existing product details if the update response is partial
          state.items[index] = { ...state.items[index], ...updatedItem };
        } else {
          // If it's a new item, we may need to refetch to get the joined 'products' info
          // but for now, we push what we have
          state.items.push(updatedItem);
        }
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.product_id !== action.payload,
        );
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
