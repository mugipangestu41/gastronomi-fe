import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Button } from '@mui/material';

//
import Iconify from '../../../components/iconify';
import './navbar.css'
// ----------------------------------------------------------------------


Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  // const { pathname } = useLocation();
  const [beranda, setBeranda] = useState(null)
  const API_URL = process.env.REACT_APP_API

  const getBeranda = async () => {
    try {
      await axios.get(`${API_URL}beranda/allBeranda`)
      .then(({data}) => {
        setBeranda(data?.data[0]?.logo)
        localStorage.setItem("judul", data?.data[0]?.judul)
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

  useEffect(() => {
    getBeranda();
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  const BACKEND_API = process.env.REACT_APP_BE
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  return (
    <div  className='sticky'>
      
    <nav className="navbar" style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(4px)'}}>
    <div className="container">
      <div className="logo">
        {
          beranda !== null ?
          <NavLink to='/'>
            <img role='presentation' src={`${BACKEND_API}${beranda}`} width="15%" alt={beranda}/>
          </NavLink>
          :
          <img src='' alt='logo'/>
        }
      
      {/* <NavLink to="/" style={{color:"black", textDecoration:"none", fontSize:"20px", fontWeight:"bold"}}>{beranda}</NavLink> */}
      </div>
      <div className="menu-icon" onClick={handleShowNavbar} role='presentation'>
      <Iconify icon={'eva:more-vertical-fill'} />
      </div>
     
      <div className={`nav-elements  ${showNavbar && 'active'}`}>

      {
        showNavbar && 'active' ?
        <div style={{position:"inherit", right: "5px", marginRight: "-15px"}}>
           <Button onClick={handleShowNavbar}  style={{color:"black"}}>x</Button>
        </div>
       
        :
        <></>
      } 
     
        <ul style={{marginLeft: "10px"}}>
          
          <li>
            <NavLink style={{fontWeight:'bold'}} onClick={showNavbar && 'active' ? handleShowNavbar : {}} to="/beranda">Beranda</NavLink>
          </li>
          <li>
            <NavLink style={{fontWeight:'bold'}} onClick={showNavbar && 'active' ? handleShowNavbar : {}} to="/pencarian">Pencarian</NavLink>
          </li>
          <li>
            <NavLink style={{fontWeight:'bold'}} onClick={showNavbar && 'active' ? handleShowNavbar : {}} to="/destinasi">Destinasi</NavLink>
          </li>
          <li>
            <NavLink style={{fontWeight:'bold'}} onClick={showNavbar && 'active' ? handleShowNavbar : {}} to="/berita">Berita</NavLink>
          </li>
         
         
         
        </ul>
      </div>

     
    </div>
  </nav>
  </div>

  );
}
