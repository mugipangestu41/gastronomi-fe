import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
/* eslint-disable camelcase */
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  // Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';
// components
// import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead2, UserListToolbar } from '../../../sections/@dashboard/user';
// mock
// import USERLIST from '../../../_mock/user';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'rumah_makan', label: 'Nama Rumah Makan', alignRight: false },
  { id: '' },
];

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

export default function AdminRumahMakanPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('rumahMakan');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const [rumahMakan, setRumahMakan] = useState([])

  useEffect(() => {
    localStorage.setItem("rumahMakan", window.location.pathname)
    if(localStorage.getItem("token") == null) { 
      navigate("/login")
      window.location.reload()
    }
    getRumahMakan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const API_URL = process.env.REACT_APP_API
  const [clickedId, setClickedId] = useState()
  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
  const wKecamatan = window.location.pathname.split('/')[3].includes('%20') ? window.location.pathname.split('/')[3].replaceAll('%20', ' ') : window.location.pathname.split('/')[3]
  const wId = window.location.pathname.split('/')[4]
  const getRumahMakan = async () => {
    try {
      await axios.get(`${API_URL}join/allRumahMakanByKecamatan?kecamatan=${wKecamatan}`, {headers})
      .then(({data}) => {
        setRumahMakan(data?.data)
      })
      .catch((err) =>
      {
        if(err.response.status === 401){
          localStorage.clear();
          window.location.reload() 
          console.log("auth failed")
        }
        if(err.response.status === 404){
          setRumahMakan([])
        }
    })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      handleCloseMenu();
      axios.delete(`${API_URL}rumahMakan/deleteRumahMakanById?id=${clickedId}`, {headers})
      .then(() => {
        getRumahMakan();
      })
      .catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setClickedId(id)
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rumahMakan.map((n) => n.rumahMakan);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, rumahMakan) => {
  //   const selectedIndex = selected.indexOf(rumahMakan);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, rumahMakan);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rumahMakan.length) : 0;

  const filteredUsers = applySortFilter(rumahMakan, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> {localStorage.getItem("judul") !== null ? localStorage.getItem("judul") : ''} | Rumah Makan </title>
      </Helmet>

      <Container maxWidth="md">
        {
          localStorage.getItem('editKecamatan') !== null ?
          <Grid item xs={12} sm={12} md={12}>
          <p><a href='/admin'>Kecamatan</a> &#129058;
          &nbsp;<a href={`${localStorage.getItem('editKecamatan')}`} >Edit Kecamatan</a> &#129058;
          &nbsp;<a style={{color:"black"}}>Rumah Makan</a> 
          </p>
          </Grid>
          :
          <></>
        }
       
          <Typography variant="h4" gutterBottom>
            Rumah Makan di Kecamatan {`${wKecamatan}`}
          </Typography>
          <Button style={{marginBottom:"15px"}} href={`/admin/addRumahMakanPage/${wKecamatan}/${wId}`} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Rumah Makan
          </Button>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 300 }}>
              <Table>
                <UserListHead2
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={rumahMakan.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id_rumah_makan, nama_rumah_makan} = row;
                    const selectedUser = selected.indexOf(rumahMakan) !== -1;

                    return (
                      <TableRow hover key={id_rumah_makan} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, rumahMakan)} />
                        </TableCell> */}

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <a style={{marginLeft: "15px"}} href={`/admin/editRumahMakan/${id_rumah_makan}`}>{nama_rumah_makan}</a>
                          </Stack>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => {handleOpenMenu(event, id_rumah_makan)}}>
                            <Iconify icon={'eva:more-vertical-fill'}/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
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
        </Card>
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
        {/* <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
