import { Helmet } from 'react-helmet-async';
import axios from 'axios';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Divider, Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
// components
// import Iconify from '../components/iconify';
// // sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppOrderTimeline,
//   AppCurrentVisits,
//   AppWebsiteVisits,
//   AppTrafficBySite,
//   AppWidgetSummary,
//   AppCurrentSubject,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DetailKecamatan() {
  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const wKecamatan = window.location.pathname.split('/')[2].includes('%20') ? window.location.pathname.split('/')[2].replaceAll('%20', ' ') : window.location.pathname.split('/')[2]
  const [kecamatan, setKecamatan] = useState([])

  const getDetailKecamatan = async () => {
    try {
      await axios.get(`${API_URL}kecamatan/kecamatanByName?kecamatan_name=${wKecamatan}`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
       setKecamatan(data?.data[0])
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
    getDetailKecamatan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Kecamatan </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kecamatan {kecamatan?.kecamatan}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8} lg={8}>
          <Paper style={kecamatan?.image1 !== undefined ? 
          {backgroundImage: `url(${BACKEND_API}${kecamatan?.image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}
          : {}
          }/>
          </Grid>

          <Grid item xs={12} sm={6} md={12} lg={4}>
          <Paper style={kecamatan?.image2 !== undefined ? 
          {backgroundImage: `url(${BACKEND_API}${kecamatan?.image2})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}
          : {}
          }/>
            
          </Grid>

          <Grid item xs={0} md={0} lg={8} style={{marginTop: "-20px"}}/>
           
          <Grid item xs={12} md={4} lg={4}>
            {/* <Card > */}
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
                
                <Button href={`/kudapan/${kecamatan?.kecamatan}`} variant='contained' color='inherit'>Kudapan</Button>
                <Button href={`/aktivitas/${kecamatan?.kecamatan}`}  style={{marginLeft:"20px"}} variant='contained' color='inherit'>Aktivitas Gastronomi</Button>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            {/* </Card> */}
            
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{kecamatan?.kecamatan}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            {/* eslint-disable-next-line  */}
            <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{__html: kecamatan?.content}} />
            </div>
            </Card>
          </Grid>

          
         
         


        
        </Grid>
      </Container>
    </>
  );
}
