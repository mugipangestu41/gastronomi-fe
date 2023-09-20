import { Helmet } from 'react-helmet-async';
// import { useState } from 'react';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { 
  // ProductSort, 
  ProductList, 
  // ProductCartWidget, ProductFilterSidebar
 } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  return (
    <>
      <Helmet>
        <title> Dashboard: Kecamatan | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kecamatan
        </Typography>

        <ProductList products={PRODUCTS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
