import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import axios from 'axios';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// @mui
import {
  // Card,
  // Table,
  // Stack,
  Paper,
  // Avatar,
  // Button,
  // Popover,
  // Checkbox,
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
  // AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
  AppRumahMakan,
} from '../sections/@dashboard/app';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListToolbar } from '../sections/@dashboard/user';
// mock


// const TABLE_HEAD = [
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'company', label: 'Company', alignRight: false },
//   { id: 'role', label: 'Role', alignRight: false },
//   { id: 'isVerified', label: 'Verified', alignRight: false },
//   { id: 'status', label: 'Status', alignRight: false },
//   { id: '' },
// ];

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


export default function RumahMakanPage() {
  // const theme = useTheme();
  const wKecamatan = window.location.pathname.split('/')[2].includes('%20') ? window.location.pathname.split('/')[2].replaceAll('%20', ' ') : window.location.pathname.split('/')[2]
  const rumahMakanId = wKecamatan.charAt(0).toUpperCase() + wKecamatan.slice(1);

  // const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const order = 'asc'

  const selected = []

  const orderBy = 'name'

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
/* eslint-disable camelcase */
  const API_URL = process.env.REACT_APP_API
  const [rumahMakan, setRumahMakan] = useState([])
  const getAllRumahMakanByKecamatan = async () => {
    try {
      await axios.get(`${API_URL}join/allRumahMakanByKecamatan?kecamatan=${wKecamatan}`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
        setRumahMakan(data?.data)
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setRumahMakan([])
      }})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllRumahMakanByKecamatan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rumahMakan.length) : 0;

  const filteredUsers = applySortFilter(rumahMakan, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Rumah Makan </title>
      </Helmet>

      <Container maxWidth="md">
     
        <Typography variant="h4" sx={{ mb: 5 }}>
          Rumah Makan di Kecamatan {`${rumahMakanId}`}
        </Typography>

 
        {/* <Card> */}
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        
          <Scrollbar>
            {/* <TableContainer sx={{ minWidth: 400 }}> */}
              {/* <Table> */}
                {/* <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                /> */}
                {/* <TableBody> */}
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id_rumah_makan, nama_rumah_makan, kecamatan, image1
                      // role, status, company, 
                      // avatarUrl, 
                      // isVerified 
                    } = row;
                    // const selectedUser = selected.indexOf(name) !== -1;

                    return (

                    
                      <Grid key={id_rumah_makan} container spacing={3} style={{marginBottom:"10px"}}>
                      <Grid item xs={12} sm={12} md={12}>
                        <AppRumahMakan id={id_rumah_makan} kecamatan={kecamatan} image={image1} rumahMakan={nama_rumah_makan} icon={'ant-design:android-filled'} />
                      </Grid>
                      </Grid>
                     
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                {/* </TableBody> */}

                {isNotFound && (
                  // <TableBody>
                    // <TableRow>
                      // <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
              {/* </Table> */}
            {/* </TableContainer> */}
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rumahMakan.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          
        {/* </Card> */}
         
         


        
   
      </Container>
    </>
  );
}
