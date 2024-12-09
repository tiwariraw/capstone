import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../utils/data";

export interface CartState {
  products: ProductType[];
  selectedItems: number;
  totalPrice: number;
  tax: number;
  taxRate: number;
  grandTotal: number;
}

const initialState: CartState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
		 
	},
    clearCart: (state, action: PayloadAction<ProductType>) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
