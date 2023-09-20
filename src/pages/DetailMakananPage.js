import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Divider, Paper, 
  // Button 
} from '@mui/material';
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

export default function DetailMakananPage() {
  // const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ketan Bakar
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={8}>
          <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/ketan-bakar.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}}/>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/map-lembang.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}}/>
            
          </Grid>

         
          <Grid item xs={0} md={0} lg={8} style={{marginTop: "-20px"}}/>
          

          <Grid item xs={12} md={4} lg={4}>
            {/* <Card> */}
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
                
               <Typography variant='subtitle2'>
               Ketan Bakar Lembang, Jl. Raya Lembang No.76, Jayagiri, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391
               </Typography>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            {/* </Card> */}
            
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Ketan Bakar</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan filosopi, sejarah, tradisi, dan sosial
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Memasak</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan cara memasak
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Bahan Baku</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan bahan baku
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Mencicipi</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan cara mencicipi
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Menghidangkan</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan cara menghidangkan
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Pengalaman Unik</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan pengalaman unik
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Etika dan Etiket</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan etika dan etiket
            </Typography>
            </div>
            </Card>
          </Grid>
         
         


        
        </Grid>
      </Container>
    </>
  );
}
