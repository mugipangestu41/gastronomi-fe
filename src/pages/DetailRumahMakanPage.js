import { Helmet } from 'react-helmet-async';
import axios from 'axios';
/* eslint-disable camelcase */
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// @mui
import {
  Card,
  // Table,
  // Stack,
  Paper,
  // Avatar,
  // Button,
  // Popover,
  // Checkbox,
  Divider,
  // Button,
  // TableRow,
  // MenuItem,
  // TableBody,
  // TableCell,
  Container,
  Typography,
  // IconButton,
  // TableContainer,
  // TablePagination,
  Grid,
} from '@mui/material';
import { AppKudapanTerbaru } from '../sections/@dashboard/app';


// ----------------------------------------------------------------------


export default function DetailRumahMakanPage() {
  // const theme = useTheme();
  const wKecamatan = window.location.pathname.split('/')[3].includes('%20') ? window.location.pathname.split('/')[3].replaceAll('%20', ' ') : window.location.pathname.split('/')[3]
  const kecamatanName = wKecamatan.charAt(0).toUpperCase() + wKecamatan.slice(1);

  const wId = window.location.pathname.split('/')[2]


  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const [detailRumahMakan, setDetailRumahMakan] = useState([])
  const getDetailRumahMakan = async () => {
    try {
      await axios.get(`${API_URL}join/rumahMakanById?id_rumah_makan=${wId}`)
      .then(({data}) => {
       setDetailRumahMakan(data?.data[0])
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setDetailRumahMakan([])
      }})
    } catch (error) {
      console.log(error)
    }
  }

  const [kudapanTerbaru, setKudapanTerbaru] = useState([])

  const getKudapanTerbaru = async () => {
    try {
      await axios.get(`${API_URL}join/allMakananTerbaru`)
      .then(({data}) => {
        setKudapanTerbaru(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 404){
          setKudapanTerbaru([])
        }
    })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetailRumahMakan()
    getKudapanTerbaru()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Rumah Makan </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h2" sx={{ mb: 5 }}>
          {`${kecamatanName}`}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={8} lg={8}>
          <Paper style={detailRumahMakan?.image1 !== undefined ? 
          {backgroundImage: `url(${BACKEND_API}${detailRumahMakan?.image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}
          : {}}/>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper style={ detailRumahMakan?.image2 !== undefined ? 
          {backgroundImage: `url(${BACKEND_API}${detailRumahMakan?.image2})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}
          : {}}/>
            
          </Grid>
          

          <Grid item xs={0} md={0} lg={8} style={{marginTop: "-20px"}}/>
          <Grid item xs={12} md={4} lg={4}>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
                
              <Typography variant='subtitle2'>
                {detailRumahMakan?.alamat}
              </Typography>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{detailRumahMakan?.nama_rumah_makan}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='caption'>
            {/* eslint-disable-next-line  */}
            <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{__html: detailRumahMakan?.content}} />
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
          <Card style={{marginBottom:"15px", padding:"10px"}}>
              <Typography style={{marginBottom:"15px"}} variant='h5'>Kudapan Terbaru</Typography>
              {
                kudapanTerbaru?.map((data) => (
                  <AppKudapanTerbaru key={data?.id_makanan} id={data?.id_makanan} judul={data?.nama_makanan} image1={data?.image1}/>
                ))
              }
              
              <div style={{marginTop:"20px"}}>
              <a style={{color:"black", fontWeight:'bold'}} href='/pencarian'>Lihat semua kudapan</a>
              </div>
          </Card>
            
          </Grid>
         


        
        </Grid>

 
        
         
         


        
   
      </Container>
    </>
  );
}
