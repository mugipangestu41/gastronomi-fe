// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'kecamatan',
    path: '/admin/kecamatan',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Beranda',
    path: '/admin/beranda',
    icon: icon('ic_user'),
  },
  {
    title: 'Slider Beranda',
    path: '/admin/slider',
    icon: icon('ic_user'),
  },

];

export default navConfig;
