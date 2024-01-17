import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Card, Divider } from '@mui/material';
import ImageViewer from "react-simple-image-viewer";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
// components
import './beranda.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from 'react';
import { AppKudapanTerbaru, AppNews } from '../sections/@dashboard/app';

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
    getBeranda();
    getSlider();
    getBeritaTerbaru();
    getKudapanTerbaru();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
   
    <div style={{backgroundColor: "white"}} >
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Beranda </title>
      </Helmet>

      <Container maxWidth="lg">
        <Typography className='text1'>
          {beranda[0]?.judul}.
        </Typography>
        <Grid container spacing={2} >
          {/* <Grid item xs={8} sm={8} md={8} >
          <Paper className='paper1' square style={beranda[0]?.image1 !== undefined ? {backgroundImage: `url(${BACKEND_API}${beranda[0]?.image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "350px", marginTop:"15px"} : {}}/>
          </Grid> */}

          <Grid item xs={12} sm={12} md={12}>
          {/* <Card> */}
            {/* <center><Typography variant='h5' style={{marginBottom:"15px"}}>Gallery Foto</Typography></center> */}
      
            <div className="carousel-wrapper">
              <Carousel 
                autoPlay 
                infiniteLoop
                dynamicHeight
                fullWidth
                autoFocus
                showThumbs={0}
                showStatus={0}
                >
                {
                  slider?.map((src, index) => (
                
                    <div key={index} onClick={() => openImageViewer(index)} role='presentation'>
                        <img src={`${BACKEND_API}${src.link}`} alt='img' className='sliderHeight'/>
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
    
            {/* </Card> */}
          </Grid>

          <Grid item xs={12} md={8} lg={8}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{beranda[0]?.judul}</Typography>
            <Typography variant='subtitle1'>{beranda[0]?.sub_judul}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            {/* eslint-disable-next-line  */}
            <Typography component={'div'} variant='body2'><div dangerouslySetInnerHTML={{__html: beranda[0]?.content}} />
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
          <Card style={{marginBottom:"15px", padding:"10px"}}>
              <Typography style={{marginBottom:"15px"}} variant='h5'>Berita Terbaru</Typography>
              {
                beritaTerbaru?.map((data) => (
                  <AppNews key={data?.id} id={data?.id} judul={data?.judul} image1={data?.image1}/>
                ))
              }
              
              <div style={{marginTop:"20px"}}>
              <a style={{color:"black", fontWeight:'bold'}} href='/berita'>Lihat semua berita</a>
              </div>
          </Card>

          <Card style={{marginBottom:"15px", padding:"10px"}}>
              <Typography style={{marginBottom:"15px"}} variant='h5'>Kudapan dan Menu Terbaru</Typography>
              {
                kudapanTerbaru?.map((data) => (
                  <AppKudapanTerbaru key={data?.id_makanan} id={data?.id_makanan} judul={data?.nama_makanan} image1={data?.image1}/>
                ))
              }
              
              <div style={{marginTop:"20px"}}>
              <a style={{color:"black", fontWeight:'bold'}} href='/pencarian'>Lihat semua</a>
              </div>
          </Card>
            
          </Grid>
         
         


        
        </Grid>
      </Container>
    </div>
  );
}
