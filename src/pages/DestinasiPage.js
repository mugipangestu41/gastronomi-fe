import axios from 'axios';
import { useState, useEffect } from 'react';
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
// import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------

export default function DestinasiPage() {
  // const BACKEND_API = process.env.REACT_APP_BE
  const API_URL = process.env.REACT_APP_API
  const [kecamatan, setKecamatan] = useState([])
  const getAllKecamatan = async () => {
    try {
      await axios.get(`${API_URL}kecamatan/allKecamatan`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
        setKecamatan(data?.data)
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setKecamatan([])
      }})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllKecamatan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Helmet>
        <title> Dashboard: Kecamatan | Minimal UI </title>
      </Helmet>

{
  console.log(kecamatan)
}
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kecamatan
        </Typography>

        <ProductList kecamatan={kecamatan} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}
