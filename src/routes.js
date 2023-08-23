import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
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
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
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
