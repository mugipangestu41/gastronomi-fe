import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
import USERLIST from '../_mock/user';

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function DetailRumahMakanPage() {
  // const theme = useTheme();
  const str = `${window.location.pathname.split("/", 4)[3]}`;
  const kecamatanName = str.charAt(0).toUpperCase() + str.slice(1);

  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const order = 'asc'

  const selected = []

  const orderBy = 'name'

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };



  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

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
          <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/balibu.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}}/>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4}>
          <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/map-balibu.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"300px"}}/>
            
          </Grid>

         

          

          <Grid item xs={0} md={0} lg={8} style={{marginTop: "-20px"}}/>
          <Grid item xs={12} md={4} lg={4}>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
              {/* <Typography variant='h5'>Infografis</Typography> */}
              <center style={{marginTop:"10px"}}>
                
              <Typography variant='subtitle2'>Jl. Raya Tangkuban Parahu No.423A, Cibogo, Kec. Lembang, Kabupaten Bandung Barat, Jawa Barat 40391
              </Typography>
              {/* <img width={"150px"} src="http://localhost:3000/assets/gastro.jpeg" alt='infografis'/> */}
              </center>
              </div>
            
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>{kecamatanName}</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
            <Typography variant='subtitle2' style={{textAlign:"justify"}}>
            Makanan khas tradisional Sunda tersedia di kedai halal dan kasual ini, dengan taman dan taman bermain.
            </Typography>
            </div>
            </Card>
          </Grid>
         
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <div style={{marginLeft:"10px", marginTop:"10px", marginBottom:"10px", marginRight:"10px"}}>
            <Typography variant='h5'>Menu</Typography>
            {/* <Typography variant='subtitle1'>Menjelajah Gastronomi Bandung Barat bersama Renita</Typography> */}
            <Divider variant="fullWidth" style={{ margin: "10px 0"}}/>
           {/* <Card> */}
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        
        <Scrollbar>
         
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, name, 
                    // role, status, company, 
                    avatarUrl, 
                    // isVerified 
                  } = row;
                  // const selectedUser = selected.indexOf(name) !== -1;

                  return (

                  
                    <Grid key={id} container spacing={3} style={{marginBottom:"10px"}}>
                    <Grid item xs={12} sm={12} md={12}>
                      <AppWidgetSummary image={avatarUrl} title={name} total={714000} icon={'ant-design:android-filled'} />
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
          count={USERLIST.length}
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
