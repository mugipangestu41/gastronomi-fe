import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography, Card, Divider, Paper } from '@mui/material';
import ImageViewer from "react-simple-image-viewer";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios'
// components
import './beranda.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from 'react';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
// import { AppKudapanTerbaru } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const theme = useTheme();
  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const [currentImage, setCurrentImage] = useState(0);

  const handleCardClick = (id) => {
    // Navigate to a specific page or perform an action when the card is clicked
    window.location.href = `${id}`;
  };
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

  // const [beritaTerbaru, setBeritaTerbaru] = useState([])

  // const getBeritaTerbaru = async () => {
  //   try {
  //     await axios.get(`${API_URL}berita/beritaTerbaru`)
  //     .then(({data}) => {
  //       setBeritaTerbaru(data?.data)
  //     })
  //     .catch((err) =>
  //     {
  //       if(err.response.status === 404){
  //         setBeritaTerbaru([])
  //       }
  //   })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const [kudapanTerbaru, setKudapanTerbaru] = useState([])

  const getKudapanTerbaru = async () => {
    try {
      await axios.get(`${API_URL}join/allKudapan`)
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
    // getBeritaTerbaru();
    getKudapanTerbaru();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
   
    <div style={{backgroundColor: "white"}} >
      <Helmet>
      <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Beranda </title>
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content="Gastronomi Kuliner Bandung Barat" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
            {/* <Card> */}
              <div style={{marginTop:"10px", marginBottom:"10px"}}>
            <Typography variant='h5'>{beranda[0]?.judul}</Typography>
            <Typography variant='subtitle1'>{beranda[0]?.sub_judul}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            {/* eslint-disable-next-line  */}
            <Typography component={'div'} variant='body2'><div dangerouslySetInnerHTML={{__html: beranda[0]?.content}} />
            </Typography>
            </div>
            {/* </Card> */}
          </Grid>

          <Grid item xs={12} md={8} lg={4} style={{textAlign: "center"}}>
            <Card style={{padding: 32}}>
              <FoodBankOutlinedIcon style={{fontSize: 40}}/>
              <Typography style={{marginLeft:40, marginRight:40, marginTop: 20, marginBottom: 20  }}>
             {/* eslint-disable-next-line  */}
              <div dangerouslySetInnerHTML={{__html: beranda[0]?.rightContent}} />
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={12} sx={{padding:2, marginBottom:"20px", marginTop:"20px"}}>
            <Paper>
            <Grid container spacing={2}  >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Paper>
                <h1>Tentang</h1>
                <h1>{beranda[0]?.kabupatenkota}</h1>
                <div style={{marginTop: 16, marginBottom: 16}}>
                  {/* eslint-disable-next-line  */}
              <div style={{marginLeft: 15}} dangerouslySetInnerHTML={{__html: beranda[0]?.leftAbout}} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Paper sx={{textAlign:"center"}}>
              <img src={`${BACKEND_API}${beranda[0]?.image2}`} alt='map'/>
              </Paper>
              <h5 style={{textAlign:"center", marginTop: 16}}>Peta {beranda[0]?.kabupatenkota}</h5>
            </Grid>
            </Grid>
            </Paper>  
          </Grid>

          {/* <Grid container spacing={2}> */}
          {/* Outer Grid */}
          <Grid item xs={12} md={12} lg={12} sx={{textAlign:"center"}}>
            <Paper style={{ 
              padding: 16,
              backgroundImage: 'url(assets/bg-content.jpg)',
              backgroundSize: 'cover',
        
             }}>
              {/* Inner Grid */}
              <Grid container spacing={2} >
                <Grid item xs={12} md={12} lg={3}>
                  <Paper style={{ textAlign: 'center', padding: 8, backgroundColor: 'rgba(255, 255, 255, 0)', color: 'white' }}>
                    <Typography style={{fontSize:"50px", fontWeight:"bold"}}>{beranda[0]?.rumahMakan?.toLocaleString('id-ID')}</Typography>
                    <Typography >Rumah Makan</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                  <Paper style={{ textAlign: 'center', padding: 8, backgroundColor: 'rgba(255, 255, 255, 0)', color: 'white' }}>
                    <Typography style={{fontSize:"50px", fontWeight:"bold"}}>{beranda[0]?.umkm?.toLocaleString('id-ID')}</Typography>
                    <Typography>UMKM Kuliner</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                  <Paper style={{ textAlign: 'center', padding: 8, backgroundColor: 'rgba(255, 255, 255, 0)', color: 'white' }}>
                    <Typography style={{fontSize:"50px", fontWeight:"bold"}}>{beranda[0]?.resort?.toLocaleString('id-ID')}</Typography>
                    <Typography>Resort</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                  <Paper style={{ textAlign: 'center', padding: 8, backgroundColor: 'rgba(255, 255, 255, 0)', color: 'white' }}>
                    <Typography style={{fontSize:"50px", fontWeight:"bold"}}>{beranda[0]?.hotel?.toLocaleString('id-ID')}</Typography>
                    <Typography>Hotel</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>


          <Grid item xs={12} md={12} lg={12}>

          <Card style={{marginBottom:"15px", padding:20}}>
          <h1 style={{textAlign: 'center', marginBottom: '20px'}}>Makanan Khas</h1>
            <Grid container spacing={2} style={{textAlign:'center'}}>

            {
                kudapanTerbaru?.map((data, i) => (
                  
                  <Grid item xs={12} sm={3} md={3} lg={3} key={i}>
                    <Card className='kudapan' style={{
                      backgroundImage: `url(${BACKEND_API}${data?.image1})`,
                      backgroundSize: 'cover',
                      // height: '500px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCardClick(`/detail/${data?.id}`)}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        // backdropFilter: 'blur(1px)',
                      }}>
                        <Paper style={{backgroundColor: 'rgba(0, 0, 0, 0.0)'}}>
                        <div style={{display:'block'}}><RestaurantOutlinedIcon style={{color:"white", fontSize:40, fontWeight:'bold'}}/> </div>

                        <h2 style={{ color: 'white', padding:15 }}>{data?.nama_makanan}</h2>
                        </Paper>
                      </div>
                    </Card>
                  </Grid>

                ))
              }
              
              
            </Grid>
          </Card>
          </Grid>
          

          {/* <Grid item xs={12} md={12} lg={12}>
          <Card style={{marginBottom:"15px", padding:"20px", borderRadius: '15px', marginTop:10}}>
              <Typography style={{marginBottom:"15px", textAlign:"center"}} variant='h5'>Berita Terbaru</Typography>
              <Grid container spacing={2} style={{textAlign:'center'}}>
              {
                beritaTerbaru?.map((data, i) => (
                  
                  <Grid item xs={12} md={12} lg={4} key={i}>
                    <Card className='berita' style={{
                      backgroundImage: `url(${BACKEND_API}${data?.image1})`,
                      backgroundSize: 'cover',
                      // height: '200px',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleCardClick(`/berita/${data?.id}`)}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(1px)',
                      }}>
                        <h2 style={{ color: 'white', padding:15 }}>{data?.judul?.slice(0,50)}...</h2>
                      </div>
                    </Card>
                  </Grid>

                ))
              }
             </Grid>
              
              <div style={{marginTop:"20px", textAlign:"center"}}>
              <a style={{color:"black", fontWeight:'bold', textAlign:"center"}} href='/berita'>Lihat semua berita</a>
              </div>
          </Card>
            
          </Grid> */}
         
          <Grid item xs={12} md={12} lg={12}>
            <Paper style={{padding:20}}>
              <h1 style={{textAlign: 'center'}}>Dukungan</h1>
              <div className='dukungan'>
                <Paper className='paper-mobile' style={{maxWidth: 200}}>
                <div style={{textAlign: 'center', alignItems:'center', justifyContent: 'center', display:'flex'}}>
                  <img height={100} src='https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg' alt='dukungan'/>
                </div>
                <div style={{marginTop:'10px'}}>
                  <Typography style={{textAlign:'center'}}>Universitas Pendidikan Indonesia</Typography>
                </div>
                </Paper>


                <Paper className='paper-mobile' style={{maxWidth: 200}}>
                <div style={{textAlign: 'center', alignItems:'center', justifyContent: 'center', display:'flex'}}>
                  <img height={100} src='https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg' alt='dukungan'/>
                </div>
                <div style={{marginTop:'10px'}}>
                  <Typography style={{textAlign:'center'}}>Universitas Pendidikan Indonesia</Typography>
                </div>
                </Paper>


                <Paper className='paper-mobile' style={{maxWidth: 200}}>
                <div style={{textAlign: 'center', alignItems:'center', justifyContent: 'center', display:'flex'}}>
                  <img height={100} src='https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg' alt='dukungan'/>
                </div>
                <div style={{marginTop:'10px'}}>
                  <Typography style={{textAlign:'center'}}>Universitas Pendidikan Indonesia</Typography>
                </div>
                </Paper>

                <Paper className='paper-mobile' style={{maxWidth: 200}}>
                <div style={{textAlign: 'center', alignItems:'center', justifyContent: 'center', display:'flex'}}>
                  <img height={100} src='https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg' alt='dukungan'/>
                </div>
                <div style={{marginTop:'10px'}}>
                  <Typography style={{textAlign:'center'}}>Universitas Pendidikan Indonesia</Typography>
                </div>
                </Paper>

                <Paper className='paper-mobile' style={{maxWidth: 200}}>
                <div style={{textAlign: 'center', alignItems:'center', justifyContent: 'center', display:'flex'}}>
                  <img height={100} src='https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg' alt='dukungan'/>
                </div>
                <div style={{marginTop:'10px'}}>
                  <Typography style={{textAlign:'center'}}>Universitas Pendidikan Indonesia</Typography>
                </div>
                </Paper>
                
              </div>
            </Paper>
          </Grid>
         


        
        </Grid>
      </Container>
    </div>
  );
}
