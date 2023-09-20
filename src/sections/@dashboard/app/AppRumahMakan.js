// @mui
import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
import { Button, Card, Grid, Paper, Typography } from '@mui/material';
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// components
// import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

// const StyledIcon = styled('div')(({ theme }) => ({
//   margin: 'auto',
//   display: 'flex',
//   borderRadius: '50%',
//   alignItems: 'center',
//   width: theme.spacing(8),
//   height: theme.spacing(8),
//   justifyContent: 'center',
//   marginBottom: theme.spacing(3),
// }));

// ----------------------------------------------------------------------

AppRumahMakan.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
const str = `${window.location.pathname.split("/", 3)[2]}`;
const kecamatanName = str.charAt(0).toUpperCase() + str.slice(1);

export default function AppRumahMakan(
  { 
    // image, title, total, icon, color = 'primary', sx, 
  ...other }
  ) {
  return (
    <Card
      
      style={{maxHeight: "220px"}}
      {...other}
    >
      <Grid container spacing={2}>\
      <Grid item xs={6} sm={6} md={6}>
        <Paper style={{backgroundImage: 'url("http://localhost:3000/assets/balibu.jpg")', 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"220px"}}/>
      </Grid>

      <Grid item xs={5} sm={5} md={5} lg={5} style={{marginTop: "10px", marginBottom: "10px"}}>

        
        <Typography style={{textAlign:"left"}} variant="h4">RM Balibu Lembang</Typography>

        <Typography style={{textAlign:"left"}} variant="subtitle1" sx={{ opacity: 0.72 }}>
          Kecamatan Lembang
        </Typography>
        {/* /uuid-rumah-makan */}
       <Button href={`/rumah-makan/${kecamatanName}/Balibu` }style={{marginTop: "35px", marginLeft:"-10px"}}>Selengkapnya</Button>
      </Grid>
      </Grid>
      
     
    </Card>
  );
}
