import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState } from 'react';
import axios from 'axios'

// @mui
import {
  // Card,
  // Table,
  // Stack,
  Paper,
  // Avatar,
  // Button,
  Popover,
  // Checkbox,
  TableRow,
  MenuItem,
  // TableBody,
  TableCell,
  Container,
  Typography,
  // IconButton,
  // TableContainer,
  TablePagination,
  Grid,
  TextField,
} from '@mui/material';
// components
// import Label from '../components/label';
import Iconify from '../components/iconify';
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
// import { UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

/* eslint-disable camelcase */
// ----------------------------------------------------------------------

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

export default function SearchPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const order = "asc"

  const orderBy = "name"

  const filterName = ''

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const API_URL = process.env.REACT_APP_API
  
  const [search, setSearch] = useState([])
  const handleSearch = async (e) => {
    try {
      await axios.get(`${API_URL}join/allMakanan?nama_makanan=${e}`)
      .then(({data}) => {
        setSearch(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 404){
          setSearch([])
          console.log("err")
        }
    })
    } catch (error) {
      console.log(error)
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - search.length) : 0;

  const filteredUsers = applySortFilter(search, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      
      <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 5 }}>
          Pencarian
        </Typography>
        {/* <Card> */}
          {/* <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} /> */}
          <TextField style={{marginBottom: "20px"}} label="Cari makanan..." onChange={(e) => {handleSearch(e.target.value)}}>asdasd</TextField>
      
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
      
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={search.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          
        {/* </Card> */}
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
