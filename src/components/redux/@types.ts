type CartItemType = {
  id: number;
  imageUrl: string;
  type: string;
  title: string;
  price: number;
  size: number;
  count: number;
}

interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

type FetchPizzasArgs = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: number;
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
type SortPropertyType = "rating" | "-rating" | "price" | "-price" | "title" |"-title" ;

type Sort = {
  name: string;
  sortProperty: SortPropertyType;
}

export type {
  CartItemType,
  FetchPizzasArgs,
  SortPropertyType,
  Sort,
  IFilterSliceState
}