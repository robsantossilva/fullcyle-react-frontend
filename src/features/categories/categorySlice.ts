import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CategoryParams, Result, Results } from "../../types/Category";

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
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      // find index on state of category to update
      const index = state.findIndex((c) => c.id === action.payload.id);
      // update category on state
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      // find index on state of category to delete
      const index = state.findIndex((c) => c.id === action.payload.id);
      state.splice(index, 1);
    },
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

export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;

// API Slice //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const endpointUrl = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.perPage) query.append("per_page", params.perPage.toString());
  if (params.search) query.append("search", params.search.toString());
  if (params.isActive) query.append("is_active", params.isActive.toString());
  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = {page, perPage, search, isActive: true};
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

const deleteCategoryMutation = (category: Category) => ({
  url: `${endpointUrl}/${category.id}`,
  method: "DELETE",
});

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query:  getCategories,
      providesTags: ["categories"],
    }),
    deleteCategory: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
  categoriesApiSlice;
