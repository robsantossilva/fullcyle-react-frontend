import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";
import { GridFilterModel } from "@mui/x-data-grid";

export function CategoryList() {
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");
  const [rowsPerPageOptions] = useState([10, 25, 50, 100]);
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPgeChange(page: number) {

  }

  function handleOnPageSizeChange(perPage: number) {

  }

  function handleFilterChange(filterModel: GridFilterModel) {
    
  }

  async function handleDeleteCategory(id: string) {
    //dispatch(deleteCategory(id));
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }
    if (deleteCategoryStatus.isError) {
      enqueueSnackbar("Category not deleted", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display={"flex"} justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: "1rem" }}
        >
          New Category
        </Button>
      </Box>

      <CategoryTable
        data={data}
        isFetching={isFetching}
        perPage={perPage}
        rowsPerPageOptions={rowsPerPageOptions}
        handleDelete={handleDeleteCategory}
        handleOnPgeChange={handleOnPgeChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
}
