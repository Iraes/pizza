import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size);

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = state.items.reduce((acc, item) => {
        return (item.price * item.count) + acc;
      }, 0)
    },
    removeItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size);

      if (findItem.count > 1) findItem.count--

      state.totalPrice = state.items.reduce((acc, item) => {
        return (item.price * item.count) + acc;
      }, 0)
    },
    deleteItem(state, action) {
      const findItem = state.items.find(item => item.id === action.payload.id && item.type === action.payload.type && item.size === action.payload.size);
      state.items = state.items.filter((item) => item !== findItem);

      state.totalPrice = state.items.reduce((acc, item) => {
        return (item.price * item.count) + acc;
      }, 0)

    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart

export const { addItem, removeItem, deleteItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
