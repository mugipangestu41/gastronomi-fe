import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
/* eslint-disable camelcase */
import axios from 'axios';
// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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

import {
  AppNews,
} from '../sections/@dashboard/app';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListToolbar } from '../sections/@dashboard/user';

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
    return filter(array, (_user) => _user.judul.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function BeritaPage() {
  const API_URL = process.env.REACT_APP_API
  const [berita, setBerita] = useState([])
  const getAllBerita = async () => {
    try {
      await axios.get(`${API_URL}berita/allBerita`)
      .then(({data}) => {
        // setDetailKecamatan(data?.data[0])
        setBerita(data?.data)
      })
      .catch((err) =>
      {if(err.response.status === 404){
        setBerita([])
      }})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBerita()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const theme = useTheme();

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - berita.length) : 0;

  const filteredUsers = applySortFilter(berita, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Berita </title>
      </Helmet>

      <Container maxWidth="md">
      
        <Typography variant="h4" sx={{ mb: 5 }}>
          Berita
        </Typography>


 
        {/* <Card> */}
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
        
          <Scrollbar>
              
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, judul, image1, content
                      // role, status, company, 
                      // avatarUrl, 
                      // isVerified 
                    } = row;
                    // const selectedUser = selected.indexOf(name) !== -1;

                    return (

                    
                      <Grid key={id} container spacing={3} style={{marginBottom:"10px"}}>
                      <Grid item xs={12} sm={12} md={12}>
                        <AppNews judul={judul} id={id} image1={image1} content={content}/>
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
            count={berita.length}
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
