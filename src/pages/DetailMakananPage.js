import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios'
import { Grid, Container, Typography, Card, Divider, Paper, 
  // Button 
} from '@mui/material';
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

export default function DetailMakananPage() {
  // const theme = useTheme();
  const wId = window.location.pathname.split("/", 3)[2]
  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const [makanan, setMakanan] = useState([])
  const getDetailMakanan = async () => {
    try {
      await axios.get(`${API_URL}join/makananById?id_makanan=${wId}`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
       setMakanan(data?.data[0])
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setMakanan([])
      }})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDetailMakanan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h4" sx={{ mb: 5 }}>
          {makanan?.nama_makanan}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={8}>
          <Paper style={makanan?.image1 !== undefined ? {backgroundImage: `url(${BACKEND_API}${makanan?.image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"} : {}}/>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper style={makanan?.image2 !== undefined ? {backgroundImage: `url(${BACKEND_API}${makanan?.image2})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"} : {}}/>
            
          </Grid>

         
          <Grid item xs={0} md={0} lg={8} style={{marginTop: "-20px"}}/>
          

          <Grid item xs={12} md={4} lg={4}>
            {/* <Card> */}
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
                
               <Typography variant='subtitle2'>
               {/* Ketan Bakar Lembang, Jl. Raya Lembang No.76, Jayagiri, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391 */}
               {
                makanan?.nama_rumah_makan === null ?
                makanan?.alamat_makanan
                :
                `${makanan?.nama_rumah_makan} | ${makanan?.alamat_rumah_makan}`
                
               }
               </Typography>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            {/* </Card> */}
            
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{makanan?.nama_makanan}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
             {/* eslint-disable-next-line  */}
            <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{__html: makanan?.content}} />
            </div>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Memasak</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan cara memasak
            </Typography>
            </div>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Bahan Baku</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan bahan baku
            </Typography>
            </div>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Mencicipi</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan cara mencicipi
            </Typography>
            </div>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Menghidangkan</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan cara menghidangkan
            </Typography>
            </div>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Pengalaman Unik</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan pengalaman unik
            </Typography>
            </div>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={4} lg={4}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Etika dan Etiket</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Penjelasan etika dan etiket
            </Typography>
            </div>
            </Card>
          </Grid>
          */}
         


        
        </Grid>
      </Container>
    </>
  );
}
