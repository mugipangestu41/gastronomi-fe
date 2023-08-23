// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'beranda',
    path: '/beranda',
    // icon: icon('ic_user'),
  },
  {
    title: 'pencarian',
    path: '/pencarian',
    icon: icon('ic_disabled'),
  },
  {
    title: 'destinasi',
    path: '/destinasi',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
