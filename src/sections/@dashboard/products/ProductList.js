import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  kecamatan: PropTypes.array
};

export default function ProductList({ kecamatan, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {kecamatan.map((kec) => (
        <Grid key={kec.id} item xs={6} sm={6} md={3}>
          <ShopProductCard kecamatans={kec} />
          
        </Grid>
      ))}
    </Grid>
  );
}
