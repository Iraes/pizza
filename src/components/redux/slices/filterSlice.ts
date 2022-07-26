import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IFilterSliceState, Sort} from "../@types";



const initialState: IFilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: { name: "популярности (DESC)", sortProperty: "rating" },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId =  Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.sort =  action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    }
  },
});

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
