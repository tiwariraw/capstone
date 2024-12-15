import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../utils/data";

export interface CartProduct extends ProductType {
  quantity: number;
}

export interface CartState {
  products: CartProduct[];
  totalNoOfItems: number;
  totalPrice: number;
  tax: number;
  taxRate: number;
  grandTotal: number;
}

export interface UpdateQuantityPayloadType {
  type: string;
  id: string;
}

export interface RemovePayload {
  id: string;
}

const getInitialCartState = (): CartState => {
  const storedCart = localStorage.getItem("cartState");
  return storedCart
    ? JSON.parse(storedCart)
    : {
        products: [],
        totalNoOfItems: 0,
        totalPrice: 0,
        tax: 0,
        taxRate: 0.05,
        grandTotal: 0,
      };
};

const initialState: CartState = getInitialCartState();

export const setTotalNoOfItems = (state: CartState): number => {
  return state.products.reduce((total, product) => total + product.quantity, 0);
};

export const setTotalPrice = (state: CartState): number => {
  return state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );
};

export const setTax = (state: CartState): number => {
  return setTotalPrice(state) * state.taxRate;
};

export const setGrandTotal = (state: CartState): number => { 
  return setTotalPrice(state) + setTax(state);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const isExist = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 } as CartProduct);
      } else {
        isExist.quantity += 1;
      }

      state.totalNoOfItems = setTotalNoOfItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<UpdateQuantityPayloadType>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.id);

      if (product) {
        if (action.payload.type === "increment") {
          product.quantity += 1;
        } else if (action.payload.type === "decrement") {
          if (product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      }

      state.totalNoOfItems = setTotalNoOfItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    removeFromCart: (state, action: PayloadAction<RemovePayload>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );

      state.totalNoOfItems = setTotalNoOfItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);
    },
    clearCart: (state) => {
      state.products = [];
      state.totalNoOfItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
