import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
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
// components
// import Label from '../components/label';
// import Iconify from '../components/iconify';
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListToolbar } from '../sections/@dashboard/user';
// mock

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


  const [allMenu, setAllMenu] = useState([])
  const getAllMenuByIdRumahMakan = async () => {
    try {
      await axios.get(`${API_URL}join/allMenuByIdRumahMakan?id_rumah_makan=${wId}`)
      .then(({data}) => {
       setAllMenu(data?.data)
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setAllMenu([])
      }})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllMenuByIdRumahMakan()
    getDetailRumahMakan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const order = 'asc'

  const selected = []

  const orderBy = 'name'

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allMenu.length) : 0;

  const filteredUsers = applySortFilter(allMenu, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="lg">
     
        <Typography variant="h4" sx={{ mb: 5 }}>
          Rumah Makan {`${kecamatanName}`}
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

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{detailRumahMakan?.nama_rumah_makan}</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            {/* eslint-disable-next-line  */}
            <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{__html: detailRumahMakan?.content}} />
            </div>
            </Card>
          </Grid>
         
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Menu</Typography>
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
           {/* <Card> */}
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        
        <Scrollbar>
         
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id_makanan, nama_makanan, kecamatan, image1
                  } = row;
                  // const selectedUser = selected.indexOf(name) !== -1;

                  return (

                  
                    <Grid key={id_makanan} container spacing={3} style={{marginBottom:"10px"}}>
                    <Grid item xs={12} sm={12} md={12}>
                      <AppWidgetSummary kecamatan={kecamatan} image={image1} id={id_makanan} makanan={nama_makanan}  icon={'ant-design:android-filled'} />
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={allMenu.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        
      {/* </Card> */}

            </div>
            </Card>
          </Grid>


        
        </Grid>

 
        
         
         


        
   
      </Container>
    </>
  );
}
