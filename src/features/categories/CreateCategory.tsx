import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import CategoryForm from "./components/CategoryForm";
import { Category } from "./categorySlice";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e);
  }

  function handleToggle(e: React.ChangeEvent<HTMLInputElement>): void {
    console.log(e);
    setCategory({...category, is_active: !category.is_active});
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    console.log(e);
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
            onSubmit={onSubmit}
          />
        </Box>
      </Paper>
    </Box>
  );
}
