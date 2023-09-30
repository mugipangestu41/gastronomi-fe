// @mui
import PropTypes from 'prop-types';
import { 
  // alpha, 
  // styled 
} from '@mui/material/styles';
import { Card, Grid, Paper, Typography } from '@mui/material';
import './appNews.css'

// ----------------------------------------------------------------------

AppNews.propTypes = {
  image1: PropTypes.string,
  judul: PropTypes.string,
  id: PropTypes.string,
  content: PropTypes.string
};

const BACKEND_API = process.env.REACT_APP_BE  

export default function AppNews(
  { image1, judul, id, content
  // image, title, total, icon, color = 'primary', sx, 
//   ...other 
}
) {
  return (
    <Card style={{marginBottom:"10px"}}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        {
          
          content !== undefined ?
          <Paper style={{backgroundImage: `url(${BACKEND_API}${image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"220px"}}/>
          :
          <Paper style={{backgroundImage: `url(${BACKEND_API}${image1})`, 
          backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "100vh",maxHeight:"120px"}}/>
        }
    
      </Grid>

      <Grid item xs={12} sm={6} md={6}>

        <div className='padding'>
        {
          content !== undefined ?
        <Typography variant='h6' style={{textAlign:"left"}}>{judul}</Typography>
          :
        <Typography variant='h7' style={{textAlign:"left"}}>{judul}</Typography>

        }
          
        {
          content !== undefined ?
          <>
          {/* eslint-disable-next-line  */}
          <Typography variant='caption'><div dangerouslySetInnerHTML={{__html: content?.substring(0,500)+'...'}} />
          </Typography>
          </>
          :
          <></>
        }

        <div style={{marginTop:"5px"}}>
        <Typography variant='subtitle2'><a style={{color:"black"}} href={`/berita/${id}`}>Selengkapnya</a>
        </Typography>
       </div>
       </div>
      </Grid>
      </Grid>
      </Card>
     
  );
}
