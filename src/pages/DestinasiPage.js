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
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Destinasi</title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content="Gastronomi Kuliner Bandung Barat" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

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
