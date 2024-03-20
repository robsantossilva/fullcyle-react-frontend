import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategories, useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";

export function CategoryList() {
  const { data, isFetching, error } = useGetCategoriesQuery();
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: {
        debounceMs: 500,
      },
    },
  };

  // use categories to create rows
  const rows: GridRowsProp = data ? data?.data.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: category.isActive,
    createdAt: new Date(category.createdAt).toLocaleDateString("pt-RB"),
  })) : [];

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: renderNameCell,
    },
    {
      field: "isActive",
      headerName: "Active",
      type: "boolean",
      renderCell: renderIsActiveCell,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "id",
      headerName: "Actions",
      type: "string",
      renderCell: renderActionCell,
      flex: 1,
    },
  ];

  function renderIsActiveCell(rowData: GridRenderCellParams): React.ReactNode {
    return (
      <Typography color={rowData.value ? "primary" : "secondary"}>
        {rowData.value ? "Active" : "Inactive"}
      </Typography>
    );
  }

  function renderActionCell(rowData: GridRenderCellParams): React.ReactNode {
    const { value } = rowData;
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(params: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/categories/edit/${params.id}`}
      >
        <Typography color="primary">{params.value}</Typography>
      </Link>
    );
  }

  async function handleDeleteCategory(id: string) {
    //dispatch(deleteCategory(id));
    await deleteCategory({id});
  }

  useEffect(() => {
    if(deleteCategoryStatus.isSuccess){
      enqueueSnackbar("Category deleted successfully", {variant:"success"});
    }
    if(deleteCategoryStatus.isError){
      enqueueSnackbar("Category not deleted", {variant:"error"});
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

      <Box style={{ height: 600, display: "flex" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          density={"compact"}
          disableColumnFilter={true}
          disableColumnSelector={true}
          disableDensitySelector={true}
          disableSelectionOnClick={true}
          componentsProps={componentProps}
          components={{ Toolbar: GridToolbar }}
          rowsPerPageOptions={[1, 10, 20, 30, 100]}
        />
      </Box>
    </Box>
  );
}
