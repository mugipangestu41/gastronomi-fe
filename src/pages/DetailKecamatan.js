import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Divider, Paper, Button } from '@mui/material';
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
  // const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h4" sx={{ mb: 5 }}>
          Kecamatan Lembang
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
          <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/lembang.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}}/>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
          <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/map-lembang.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}}/>
            
          </Grid>

         

          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Lembang</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Lémbang (Sunda: ᮜᮦᮙ᮪ᮘᮀ) adalah sebuah kecamatan di Kabupaten Bandung Barat, Jawa Barat, Indonesia. Kecamatan ini berjarak sekitar 22 Kilometer dari ibu kota kabupaten Bandung Barat ke arah timur laut melalui Cisarua. Pusat pemerintahannya berada di Desa Lembang. Kecamatan Lembang merupakan kecamatan paling timur dan terkenal sebagai tujuan wisata di Jawa Barat.</Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card style={{height:"160px"}}>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
                
                <Button href="kudapan/lembang" style={{marginTop:"50px"}} variant='contained' color='inherit'>Kudapan</Button>
                <Button href="rumah-makan/lembang" style={{marginLeft:"10px", marginTop:"50px"}} variant='contained' color='inherit'>Rumah Makan</Button>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            </Card>
            
          </Grid>
         
         


        
        </Grid>
      </Container>
    </>
  );
}
