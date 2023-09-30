import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios'
import { Grid,Container, Typography, Card, Divider, Paper
  // Button 
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AppNews } from '../sections/@dashboard/app';
// ----------------------------------------------------------------------

export default function DetailBeritaPage() {
  // const theme = useTheme();
  const wId = window.location.pathname.split("/", 3)[2]
  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const [berita, setBerita] = useState([])
  const getDetailBerita = async () => {
    try {
      await axios.get(`${API_URL}berita/beritaById?id=${wId}`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
       setBerita(data?.data[0])
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setBerita([])
      }})
    } catch (error) {
      console.log(error)
    }
  }

  const [beritaTerbaru, setBeritaTerbaru] = useState([])

  const getBeritaTerbaru = async () => {
    try {
      await axios.get(`${API_URL}berita/beritaTerbaru`)
      .then(({data}) => {
        setBeritaTerbaru(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 404){
          setBeritaTerbaru([])
        }
    })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBeritaTerbaru()
    getDetailBerita()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Berita</title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h2" sx={{ mb: 5 }}>
          {berita?.judul}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
          <Paper style={berita?.image1 !== undefined ? {backgroundImage: `url(${BACKEND_API}${berita?.image1})`, 
          backgroundSize: "cover", height: "100vh",maxHeight:"300px"} : {}}/>
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            {/* <Card> */}
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            {/* <Typography variant='h3'>{berita?.judul}</Typography> */}
            <Typography variant='overline' style={{fontSize:"15px", color:"gray"}}>
              {new Date(berita?.tanggal_berita).toLocaleString(
          "id-ID",
            {
              timeZone: 'UTC',
              weekday: "long",
              month: "short",
              day: "2-digit",
              year: "numeric",
          
            }
          )}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
             
            <Typography variant='caption'>
              {/* eslint-disable-next-line  */}
              <div  dangerouslySetInnerHTML={{__html: berita?.content}} />
              </Typography>
            </div>
            {/* </Card> */}
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            
            <Card style={{padding:"15px"}}>
              <Typography variant='h6' style={{marginBottom:"15px"}}>Berita Terbaru</Typography>
              {
                beritaTerbaru?.map((data) => (
                  <AppNews key={data?.id} id={data?.id} judul={data?.judul} image1={data?.image1}/>
                ))
              }
              <a style={{color:"black", fontWeight:'bold'}} href='/berita'>Lihat semua berita</a>
              
              </Card>
          
            
          
            
          </Grid>



        
        </Grid>
      </Container>
    </>
  );
}
