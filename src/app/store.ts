import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import categoriesReducer, { categoriesApiSlice } from "../features/categories/categorySlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    categories: categoriesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    //[`${categoriesApiSlice.reducerPath}api`]: categoriesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(categoriesApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
