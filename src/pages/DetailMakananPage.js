import { Helmet } from 'react-helmet-async';
import { Rating } from 'react-simple-star-rating'
// import { faker } from '@faker-js/faker';
// @mui
// import { useTheme } from '@mui/material/styles';
import axios from 'axios'
import { Grid, Button,Container, Typography, Card, Divider, Paper, TextField, TextareaAutosize, Box, 
  // Button 
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function DetailMakananPage() {
  // const theme = useTheme();
  const wId = window.location.pathname.split("/", 3)[2]
  const API_URL = process.env.REACT_APP_API
  const BACKEND_API = process.env.REACT_APP_BE
  const [makanan, setMakanan] = useState([])
  const [namas, setNama] = useState('')
  const [komentars, setKomentar] = useState('')
  const navigate = useNavigate();
  const [errorSubmit, setErrorSubmit] = useState('')
  const handleSubmit = async () => {

    if(komentars === '' || namas === '' || ratings === 0){
      setErrorSubmit('Mohon isi semua kolom')
    } else{
      try {
        await axios.post(`${API_URL}komentar/createOneKomentar`,
        {
          rating: ratings,
          nama: namas,
          komentar: komentars,
          id_makanan: wId
  
        })
        .then(() => {
          setErrorSubmit("Berhasil menambahkan komentar")
          navigate(`/detail/${wId}`);
          getAverage()
          getKomentar()
          setRating(0)
          setKomentar('')
          setNama('')
          document.getElementById('komentar').reset()
        })
        .catch((e) => {
          window.alert(e.response.data.messages)
          // console.log("error", err.response.data)
        })
    } catch (err) {
      console.log(err);
    }
    }
  };

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


  const [detailKomentar, setDetailKomentar] = useState([])
  const getKomentar = async () => {
    try {
      await axios.get(`${API_URL}komentar/komentarByIdMakanan?id=${wId}`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
       setDetailKomentar(data?.data)
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setDetailKomentar([])
      }})
    } catch (error) {
      console.log(error)
    }
  }

  const [average, setAverage] = useState([])
  const getAverage = async () => {
    try {
      await axios.get(`${API_URL}komentar/averageKomentarByIdMakanan?id=${wId}`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
       setAverage(data?.data[0])
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setAverage([])
      }})
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getDetailMakanan()
    getKomentar()
    getAverage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [ratings, setRating] = useState(0)

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)

    // other logic
  }
  // Optinal callback functions
  // const onPointerEnter = () => console.log('Enter')
  // const onPointerLeave = () => console.log('Leave')
  // const onPointerMove = (value, index) => console.log(value, index)

  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Makanan</title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h2" sx={{ mb: 5 }}>
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
                <> <a href={`/aktivitas/${makanan?.id_rumah_makan}/${makanan?.nama_rumah_makan}`}>{makanan?.nama_rumah_makan}</a> | {makanan?.alamat_rumah_makan}
                </>
               }
               </Typography>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            {/* </Card> */}
            
          </Grid>

          <Grid item xs={12} md={12} lg={8}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{makanan?.nama_makanan}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
             <Typography variant='caption'>
              {/* eslint-disable-next-line  */}
            <div dangerouslySetInnerHTML={{__html: makanan?.content}} />
            </Typography>
            </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <form id='komentar'>
            <Card >
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h6'>Komentar</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            {
              errorSubmit !== '' ?
              <center><Typography style={{color:"green"}} variant='caption'>{errorSubmit}</Typography></center>
              :
              <></>
            }
            <center><div>
              <Rating
              size={25}
                onClick={handleRating}
                // onPointerEnter={onPointerEnter}
                // onPointerLeave={onPointerLeave}
                // onPointerMove={onPointerMove}
                /* Available Props */
              />
              </div>
              </center>
            <Grid item xs={12} md={12} lg={12}> 
            <center>
            <TextField onChange={(e) => setNama(e.target.value)} size="small" id="nama" autoComplete='off' label="Nama"/>
            </center>
            </Grid>
            <div>
              <center>
            <TextareaAutosize onChange={(e) => setKomentar(e.target.value)} style={{marginTop:"10px", width:"225px"}} placeholder="Tulis komentar..." minRows={8} variant="outlined"/>
             </center>
             {/* eslint-disable-next-line  */}
             </div>
             <center>
             <Button variant='contained' onClick={handleSubmit}>Submit Komentar</Button>
             </center>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            </div>
            </Card>
            </form>
            <Card style={{marginTop:"15px", overflow:'auto'}} >
            <Box
              sx={{ height: 400} }
            >
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='body1'>Rating: &nbsp;
           {average?.average?.toString().substring(0,3)}/ 5
              </Typography> 
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography style={{marginBottom:"15px"}} variant='body2'>Komentar: </Typography>
            
            {
              detailKomentar?.map((data) => (
              <Card key={data?.id} style={{padding: "15px", marginBottom:"15px"}}>
            
              <Typography style={{textAlign: "right", fontSize:'12px', color:'gray'}}>
              {new Date(data?.created_at).toLocaleString(
              "id-ID",
                {
                  timeZone: 'UTC',
                  weekday: "long",
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                }
              )}

              </Typography>
              <Typography variant='subtitle1'>{data?.nama}</Typography>
              <Typography variant='subtitle2'>{data?.rating} / 5</Typography>
              <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
              <Typography variant='caption'>{data?.komentar}</Typography>
            
              </Card>
              ))
            }
            
          
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            </div>
            </Box>
            </Card>
            
          </Grid>

          {/* <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Rating: &nbsp;
            3.2 / 5
              </Typography> 
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography style={{marginBottom:"15px"}} variant='h5'>Komentar: </Typography>

            <Card style={{padding: "15px"}}>
            <Typography fontWeight={'bold'}>Nama: Mugi Pangestu</Typography>
            <Typography fontWeight={'bold'}>Rating: 3.2 / 5</Typography>
            <Typography>Kurang enak guys...</Typography>
              </Card>
          
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            </div>
            </Card>
          </Grid> */}

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
