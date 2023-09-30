// @mui
import PropTypes from 'prop-types';
import { 
  // alpha, 
  // styled 
} from '@mui/material/styles';
import { Card, Grid, Paper, Typography } from '@mui/material';
import './appNews.css'

// ----------------------------------------------------------------------

AppKudapanTerbaru.propTypes = {
  image1: PropTypes.string,
  judul: PropTypes.string,
  id: PropTypes.string
};

const BACKEND_API = process.env.REACT_APP_BE  

export default function AppKudapanTerbaru(
  { image1, judul, id,
  // image, title, total, icon, color = 'primary', sx, 
//   ...other 
}
) {
  return (
    <Card style={{marginBottom:"10px"}}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper style={{backgroundImage: `url(${BACKEND_API}${image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"120px"}}/>
      </Grid>

      <Grid item xs={12} sm={6} md={8}>

        <div className='padding'>
        <Typography style={{textAlign:"left"}}>{judul}</Typography>
        <div style={{marginTop:"5px"}}>
        <Typography variant='subtitle2'><a style={{color:"black"}} href={`/detail/${id}`}>Selengkapnya</a>
       </Typography>
       </div>
       </div>
      </Grid>
      </Grid>
      </Card>
     
  );
}
