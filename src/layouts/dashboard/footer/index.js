import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        
        p: 3,
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href={`${window.location.protocol}`}>
            {localStorage.getItem('judul') !== null ? localStorage.getItem('judul') : ''}
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}