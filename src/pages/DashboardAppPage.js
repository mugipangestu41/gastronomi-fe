import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Divider, Paper } from '@mui/material';
// components
import './beranda.css'
// import Iconify from '../components/iconify';
// sections
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

export default function DashboardAppPage() {
  // const theme = useTheme();

  return (
    <div style={{backgroundColor: "white"}} >
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography className='text1'>
          Gastronita.
        </Typography>

        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={12} >
          <Paper className='paper1' square style={{backgroundImage: 'url("http://localhost:3000/assets/moreheader.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", marginTop:"15px"}}/>
          </Grid>

         

          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Gastronita</Typography>
            <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Gastronita adalah sistem informasi gastronomi di Kabupaten Bandung Barat berbasis website. Website ini berisi informasi gastronomi di 16 kecamatan di Kabupaten Bandung Barat. Renita berharap dengan adanya website ini akan bermanfaat bagi wisatawan yang akan mencoba atraksi wisata gastronomi di Kabupaten Bandung Barat dan menambah informasi mengenai segala kompenen yang terdapat di kuliner tersebut.
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card style={{height:"200px", backgroundSize:"cover",backgroundImage:'url("http://localhost:3000/assets/gastro.jpeg")'}}>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
              <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/>
              </center>
              </div>
            </Card>
            
          </Grid>
         
         


        
        </Grid>
      </Container>
    </div>
  );
}
