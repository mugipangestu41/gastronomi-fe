import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { filter } from 'lodash';

/* eslint-disable camelcase */
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
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
  TableRow,
  // MenuItem,
  // TableBody,
  TableCell,
  Container,
  Typography,
  // IconButton,
  // TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';
import { AppKudapanTerbaru, AppWidgetSummary } from '../sections/@dashboard/app';
import { UserListToolbar } from '../sections/@dashboard/user';
import Scrollbar from '../components/scrollbar';



// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.nama_makanan.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DetailRumahMakanPage() {
  const [filterName, setFilterName] = useState('');
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const order = "asc"

  const orderBy = "name"

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState([])
  const filteredUsers = applySortFilter(search, getComparator(order, orderBy), filterName);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - search.length) : 0;

  const isNotFound = !filteredUsers.length && !!filterName;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
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

  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
  const getMenuMakanan = async () => {
    try {
      await axios.get(`${API_URL}join/allMenuByIdRumahMakan?id_rumah_makan=${wId}`, {headers})
      .then(({data}) => {
        setSearch(data?.data)
        console.log(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 401){
          localStorage.clear();
          window.location.reload() 
          console.log("auth failed")
        }
        if(err.response.status === 404){
          setSearch([])
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
    getMenuMakanan()
    getDetailRumahMakan()
    getKudapanTerbaru()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Detail Rumah Makan </title>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={detailRumahMakan?.content?.slice(0,500)} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
                {
                  detailRumahMakan.alamat?.split(' | ').length === 3 ?
                  <Grid container spacing={1}>
                  <Grid item xs={1} md={1} lg={1}>
                    <div style={{textAlign:"right"}}>
                      <PlaceOutlinedIcon/>
                    </div>
                  
                  </Grid>

                  <Grid item xs={11} md={11} lg={11}>
                    <a style={{textAlign:"left", display:"flex"}} target='_blank' rel="noreferrer" href={detailRumahMakan?.alamat?.split((' | '))[1]} >{detailRumahMakan?.alamat?.split((' | '))[0]}</a>
                  </Grid>

                  <Grid item xs={1} md={1} lg={1}>
                    <div style={{textAlign:"right"}}>
                      <WhatsAppIcon/>
                    </div>
                  </Grid>

                  <Grid item xs={11} md={11} lg={11}>
                    <p style={{textAlign:"left", display:"flex"}}> { detailRumahMakan?.alamat?.split((' | '))[2]}</p>
                  </Grid>
                  </Grid>
                  :
                detailRumahMakan?.alamat

                }
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
            {/* <Typography variant='caption'> */}
            {/* eslint-disable-next-line  */}
            <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{__html: detailRumahMakan?.content}} />
            {/* </Typography> */}
            </div>
            </Card>
            <Card style={{marginTop:"10px"}}>
            <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
      <Typography variant="h4">
          Menu
        </Typography>
        {/* <Card> */}
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />
      
          <Scrollbar>
        
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id_makanan, nama_makanan, image1, kecamatan
                      
                    } = row;
                    // const selectedUser = selected.indexOf(name) !== -1;

                    return (

                    
                      <Grid key={id_makanan} container spacing={2} style={{marginBottom:"10px"}}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <AppWidgetSummary id={id_makanan} kecamatan={kecamatan} image={image1} makanan={nama_makanan} icon={'ant-design:android-filled'} />
                      </Grid>
                      </Grid>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}

                {isNotFound && (
                
                  <Paper
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h6" paragraph>
                      Not found
                    </Typography>

                    <Typography variant="body2">
                      No results found for &nbsp;
                      <strong>&quot;{filterName}&quot;</strong>.
                      <br /> Try checking for typos or using complete words.
                    </Typography>
                  </Paper>
               
                )}
          </Scrollbar>
          {
            search?.length !== 0 ?
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={search.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            :
            <></>
          }
          
          
        {/* </Card> */}
        </div>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
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
      
    </>
  );
}
