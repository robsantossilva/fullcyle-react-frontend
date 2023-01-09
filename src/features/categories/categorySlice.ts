import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Category {
  id: string;
  name: string;
  is_active: boolean;
  description: null | string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export const initialState: Category[] = [
  {
    id: "1",
    name: "Category 1",
    is_active: true,
    description: "Category One Description",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "2",
    name: "Category 2",
    is_active: true,
    description: "Category Two Description",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "3",
    name: "Category 3",
    is_active: true,
    description: "Category Three Description",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "4",
    name: "Category 4",
    is_active: false,
    description: "Category Four Description",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    createCategory(state, action) {},
    updateCategory(state, action) {},
    deleteCategory(state, action) {},
  },
});

// Selectors
export const selectCategories = (state: RootState): Category[] =>
  state.categories;
// Select category by id
export const selectCategoryById = (state: RootState, id: string): Category => {
  const category: Category = {
    id: "",
    name: "",
    is_active: false,
    description: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  };

  return state.categories.find((category) => category.id === id) || category;
};

export default categoriesSlice.reducer;
