import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';

import axios from 'axios'
//
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function AdminDashboardLayout() {
  const [open, setOpen] = useState(false);
  const API_URL = process.env.REACT_APP_API
  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
  const navigate = useNavigate();
  const getToken = async () => {
    try {
      await axios.get(`${API_URL}auth/refreshToken`, {headers})
      .then(({data}) => {
        if(localStorage.getItem("token") !== data?.data[0]){
          localStorage.setItem("token", data?.data[0])
        }
        
      })
      .catch((err) =>
      {
        if(err.response.status === 401){
          localStorage.clear();
          window.location.reload() 
          console.log("auth failed")
        }
       
    
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(localStorage.getItem("token") == null) { 
      navigate("/login")
      window.location.reload()
    }
    getToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
