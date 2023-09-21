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
  sx: PropTypes.object,
  id: PropTypes.string,
  rumahMakan: PropTypes.string,
  kecamatan: PropTypes.string
};

const BACKEND_API = process.env.REACT_APP_BE

export default function AppRumahMakan(
  { id, image, rumahMakan, kecamatan,
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
        <Paper style={{backgroundImage: `url(${BACKEND_API}${image})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"220px"}}/>
      </Grid>

      <Grid item xs={5} sm={5} md={5} lg={5} style={{marginTop: "10px", marginBottom: "10px"}}>

        
        <Typography style={{textAlign:"left"}} variant="h4">{rumahMakan}</Typography>

        <Typography style={{textAlign:"left"}} variant="subtitle1" sx={{ opacity: 0.72 }}>
          Kecamatan {kecamatan}
        </Typography>
        {/* /uuid-rumah-makan */}
       <Button href={`/rumah-makan/${id}/${rumahMakan}` }style={{marginTop: "35px", marginLeft:"-10px"}}>Selengkapnya</Button>
      </Grid>
      </Grid>
      
     
    </Card>
  );
}
