import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import { FetchPizzasArgs, Status } from "../@types";

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzas",
  async ({category, order, sortBy, search, currentPage}) => {
    const {data} = await axios.get<Array<Pizza>>(
      `https://62dab45ed1d97b9e0c44be34.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

type Pizza = {
  id: number;
  imageUrl: string;
  types: Array<number>;
  title: string;
  price: number;
  sizes: number[];
  category: number;
  rating: number;
};


interface IPizzaSliceState {
  items: Pizza[],
  status: Status;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  }
});


export const selectPizzaData = (state: RootState) => state.pizza
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
