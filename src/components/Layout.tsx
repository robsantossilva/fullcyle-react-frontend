import { Box, Container } from "@mui/material";
import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: 4,
          marginBottom: 4,
          color: "white",
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
