import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import CategoryForm from "./components/CategoryForm";
import { Category, createCategory } from "./categorySlice";
import { useAppDispatch } from "../../app/hooks";
import { useSnackbar } from "notistack";

export function CategoryCreate() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [category, setCategory] = useState<Category>({
    id: "",
    name: "",
    is_active: false,
    description: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
  });
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    console.log(name, value);
    setCategory({ ...category, [name]: value });
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, checked } = e.target;
    console.log(name, checked);
    setCategory({ ...category, [name]: checked });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(createCategory(category));
    enqueueSnackbar("Category created successfully", {variant: "success"});
    console.log(category);
  }

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>

          <CategoryForm
            category={category}
            handleChange={handleChange}
            handleToggle={handleToggle}
            isDisabled={isDisabled}
            isLoading={false}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Paper>
    </Box>
  );
}
