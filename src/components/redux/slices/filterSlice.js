import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: { name: "популярности (DESC)", sortProperty: "rating" },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId =  parseInt(action.payload.categoryId);
      state.currentPage = parseInt(action.payload.currentPage);
      state.sort =  action.payload.sort;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload
    }
  },
});

export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
