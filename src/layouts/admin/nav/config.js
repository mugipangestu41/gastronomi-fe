// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'kecamatan',
    path: '/admin/kecamatan',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Beranda',
    path: '/admin/beranda',
    icon: icon('ic_blog'),
  },
  {
    title: 'Slider Beranda',
    path: '/admin/slider',
    icon: icon('ic_lock'),
  },
  {
    title: 'Berita',
    path: '/admin/berita',
    icon: icon('ic_blog'),
  },
  {
    title: 'Komentar',
    path: '/admin/komentar',
    icon: icon('ic_lock'),
  },

];

export default navConfig;
