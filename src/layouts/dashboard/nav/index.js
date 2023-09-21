import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

// @mui
// import { styled, alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
// mock
// import account from '../../../_mock/account';
// hooks
// import useResponsive from '../../../hooks/useResponsive';
// components
// import Logo from '../../../components/logo';
// import Scrollbar from '../../../components/scrollbar';
// import NavSection from '../../../components/nav-section';
//
import Iconify from '../../../components/iconify';
// import navConfig from './config';
import './navbar.css'
// ----------------------------------------------------------------------

// const NAV_WIDTH = 280;

// const StyledAccount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  // const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // const renderContent = (
  //   <Scrollbar
  //     sx={{
  //       height: 1,
  //       '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
  //     }}
  //   >
  //     <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
  //       <Logo />
  //     </Box>

      

  //     <NavSection data={navConfig} />

  //     <Box sx={{ flexGrow: 1 }} />

     
  //   </Scrollbar>
  // );

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  return (
    // <Box
    //   component="nav"
    //   sx={{
    //     flexShrink: { lg: 0 },
    //     width: { lg: NAV_WIDTH },
    //   }}
    // >
    //   {isDesktop ? (
    //     <Drawer
    //       open
    //       variant="permanent"
    //       PaperProps={{
    //         sx: {
    //           width: NAV_WIDTH,
    //           bgcolor: 'background.default',
    //           borderRightStyle: 'dashed',
    //         },
    //       }}
    //     >
    //       {renderContent}
    //       <center style={{marginBottom:"10px"}}><Typography>&copy; Renita</Typography></center>
    //     </Drawer>
    //   ) : (
    //     <Drawer
    //       open={openNav}
    //       onClose={onCloseNav}
    //       ModalProps={{
    //         keepMounted: true,
    //       }}
    //       PaperProps={{
    //         sx: { width: NAV_WIDTH },
    //       }}
    //     >
    //       {renderContent}
    //       <center style={{marginBottom:"10px"}}><Typography>&copy; Renita</Typography></center>
    //     </Drawer>
    //   )}
    // </Box>
    
    <div  className='sticky'>
      
    <nav className="navbar" >
    <div className="container">
      <div className="logo">
      {/* <img src="/favicon/black_invinita.svg" width="15%" alt="logo"/> */}
      <h1>Gastronita</h1>
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
            <NavLink onClick={handleShowNavbar} to="/beranda">Beranda</NavLink>
          </li>
          <li>
            <NavLink onClick={handleShowNavbar} to="/pencarian">Pencarian</NavLink>
          </li>
          <li>
            <NavLink onClick={handleShowNavbar} to="/destinasi">Destinasi</NavLink>
          </li>
         
         
         
        </ul>
      </div>

     
    </div>
  </nav>
  </div>

  );
}
