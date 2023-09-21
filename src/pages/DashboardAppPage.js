import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Divider, Paper } from '@mui/material';
import ImageViewer from "react-simple-image-viewer";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
// components
import './beranda.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from 'react';
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
  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const [currentImage, setCurrentImage] = useState(0);

  // const [images, setImages] = useState([])
  // eslint-disable-next-line
  let images = []
  
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = async (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const [beranda, setBeranda] = useState([])
  const getBeranda = async () => {
    try {
      await axios.get(`${API_URL}beranda/allBeranda`)
      .then(({data}) => {
        setBeranda(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 404){
          setBeranda([])
        }
    })
    } catch (error) {
      console.log(error)
    }
  }

  const [slider, setSlider] = useState([])

  slider?.map((src) => 
      // console.log(`${BACKEND_API}${src.link}`)
      images.push(`${BACKEND_API}${src.link}`)
    )
  const getSlider = async () => {
    try {
      await axios.get(`${API_URL}slider/allSlider`)
      .then(({data}) => {
        setSlider(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 404){
          setSlider([])
        }
    })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBeranda();
    getSlider();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div style={{backgroundColor: "white"}} >
      <Helmet>
        <title> Gastronita | Beranda </title>
      </Helmet>

      <Container maxWidth="lg">
        <Typography className='text1'>
          {beranda[0]?.judul}.
        </Typography>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={12} >
          <Paper className='paper1' square style={beranda[0]?.image1 !== undefined ? {backgroundImage: `url(${BACKEND_API}${beranda[0]?.image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh", marginTop:"15px"} : {}}/>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{beranda[0]?.judul}</Typography>
            <Typography variant='subtitle1'>{beranda[0]?.sub_judul}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            {/* <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Gastronita adalah sistem informasi gastronomi di Kabupaten Bandung Barat berbasis website. Website ini berisi informasi gastronomi di 16 kecamatan di Kabupaten Bandung Barat. Renita berharap dengan adanya website ini akan bermanfaat bagi wisatawan yang akan mencoba atraksi wisata gastronomi di Kabupaten Bandung Barat dan menambah informasi mengenai segala kompenen yang terdapat di kuliner tersebut.
            </Typography> */}
            {/* eslint-disable-next-line  */}
            <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{__html: beranda[0]?.content}} />
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Card>
            {/* <center><Typography variant='h5' style={{marginBottom:"15px"}}>Gallery Foto</Typography></center> */}
      
            <div className="carousel-wrapper" style={{marginTop:"20px"}}>
              <Carousel 
                autoPlay 
                infiniteLoop
                dynamicHeight
                autoFocus>
                {
                  slider?.map((src, index) => (
                
                    <div key={index} onClick={() => openImageViewer(index)} role='presentation'>
                        <img src={`${BACKEND_API}${src.link}`} alt='img' style={{width: "200px"}}/>
                    </div>
                  
              
                  ))
                }
              </Carousel>
            </div>
           
     
              {isViewerOpen && (
                <>
                <ImageViewer
                  src={images} 
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)"
                  }}
                  closeOnClickOutside={1}
                />
                
                </>
                
              )}
    
            </Card>
          </Grid>
         
         


        
        </Grid>
      </Container>
    </div>
  );
}
