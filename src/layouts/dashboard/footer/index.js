import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box, Grid } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      sx={{
        
        p: 3,
      }}
      component="footer"
    >
      <Container maxWidth="sm">
      <Grid container spacing={1} sx={{textAlign:"center"}}>
        <Grid item xs={12} md={12} lg={12}>

        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href={`${window.location.protocol}`}>
            {localStorage.getItem('judul') !== null ? localStorage.getItem('judul') : ''}
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        </Grid>
          <Grid item xs={12} md={12} lg={12}>
          <Typography variant="body2" color="text.secondary" align="center">
            <a href="https://instagram.com/mugitrash" target="_blank" rel="noreferrer" color="text.secondary"><InstagramIcon/></a>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
          {/* <Typography variant="body2" color="text.secondary" align="center">
            mugipangestu41@gmail.com
          </Typography> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}