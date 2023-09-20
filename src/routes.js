import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import AdminDashboardLayout from './layouts/admin';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DetailKecamatan from './pages/DetailKecamatan';
import KudapanPage from './pages/KudapanPage';
import RumahMakanPage from './pages/RumahMakanPage';
import DetailRumahMakanPage from './pages/DetailRumahMakanPage';
import DetailMakananPage from './pages/DetailMakananPage';
import LoginPage from './pages/LoginPage';
import AddKecamatanPage from './layouts/admin/pages/AddKecamatanPage';
import KecamatanPage from './layouts/admin/pages/KecamatanPage';
import EditKecamatanPage from './layouts/admin/pages/EditKecamatanPage';
import EditBerandaPage from './layouts/admin/pages/EditBerandaPage';
import SliderPage from './layouts/admin/pages/sliderPage';
import AddSliderPage from './layouts/admin/pages/addSliderPage';
import AdminKudapan from './layouts/admin/pages/AdminkudapanPage';
import EditKudapanPage from './layouts/admin/pages/EditKudapanPage';
import AddKudapanPage from './layouts/admin/pages/addKudapanPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/beranda" />, index: true },
        { path: 'beranda', element: <DashboardAppPage /> },
        { path: 'pencarian', element: <UserPage /> },
        { path: 'destinasi', element: <ProductsPage /> },
        { path: 'detail-kecamatan', element: <DetailKecamatan /> },
        { path: 'kudapan/:slug', element: <KudapanPage /> },
        { path: 'rumah-makan/:slug', element: <RumahMakanPage /> },
        { path: 'rumah-makan/:slug/:slug', element: <DetailRumahMakanPage /> },
        { path: 'detail/:slug', element: <DetailMakananPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminDashboardLayout />,
      children: [
        { element: <Navigate to="/admin/kecamatan" />, index: true },
        { path: 'addKecamatanPage', element: <AddKecamatanPage /> },
        { path: 'kecamatan', element: <KecamatanPage /> },
        { path: 'editKecamatan/:slug/:slug', element: <EditKecamatanPage /> },
        { path: 'beranda', element: <EditBerandaPage />},
        { path: 'slider', element: <SliderPage />},
        { path: 'addSliderPage', element: <AddSliderPage />},
        { path: 'kudapan/:slug/:slug', element: <AdminKudapan /> },
        { path: 'editKudapan/:slug', element: <EditKudapanPage /> },
        { path: 'addKudapanPage/:slug/:slug', element:< AddKudapanPage/> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
