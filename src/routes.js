import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import AdminDashboardLayout from './layouts/admin';
//
import BlogPage from './pages/BlogPage';
// import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
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
import BeritaAdmin from './layouts/admin/pages/beritaPage';
import AddSliderPage from './layouts/admin/pages/addSliderPage';
import AdminKudapan from './layouts/admin/pages/AdminkudapanPage';
import EditKudapanPage from './layouts/admin/pages/EditKudapanPage';
import AddKudapanPage from './layouts/admin/pages/addKudapanPage';
import AdminRumahMakanPage from './layouts/admin/pages/AdminRumahMakanPage';
import AddRumahMakanPage from './layouts/admin/pages/addRumahMakanPage';
import EditRumahMakanPage from './layouts/admin/pages/EditRumahMakanPage';
import AdminMenuMakananPage from './layouts/admin/pages/AdminMenuMakananPage';
import AddMenuMakananPage from './layouts/admin/pages/addMenuMakananPage';
import EditMenuMakananPage from './layouts/admin/pages/EditMenuMakananPage';
import DestinasiPage from './pages/DestinasiPage';
import SearchPage from './pages/SearchPage';
import BeritaPage from './pages/BeritaPage';
import DetailBeritaPage from './pages/DetailBeritaPage';
import AddBeritaPage from './layouts/admin/pages/AddBeritaPage';
import EditBeritaPage from './layouts/admin/pages/EditBeritaPage';
import KomentarPage from './layouts/admin/pages/komentarPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/beranda" />, index: true },
        { path: 'beranda', element: <DashboardAppPage /> },
        { path: 'pencarian', element: <SearchPage /> },
        { path: 'destinasi', element: <DestinasiPage /> },
        { path: 'berita', element: <BeritaPage /> },
        { path: 'berita/:slug', element: <DetailBeritaPage /> },
        { path: 'detail-kecamatan/:slug', element: <DetailKecamatan /> },
        { path: 'kudapan/:slug', element: <KudapanPage /> },
        { path: 'aktivitas/:slug', element: <RumahMakanPage /> },
        { path: 'aktivitas/:slug/:slug', element: <DetailRumahMakanPage /> },
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
        { path: 'addBeritaPage', element: <AddBeritaPage /> },
        { path: 'kecamatan', element: <KecamatanPage /> },
        { path: 'editKecamatan/:slug/:slug', element: <EditKecamatanPage /> },
        { path: 'editBeritaPage/:slug/:slug', element: <EditBeritaPage />},
        { path: 'beranda', element: <EditBerandaPage />},
        { path: 'slider', element: <SliderPage />},
        { path: 'komentar', element: <KomentarPage />},
        { path: 'berita', element: <BeritaAdmin />},
        { path: 'addSliderPage', element: <AddSliderPage />},
        { path: 'kudapan/:slug/:slug', element: <AdminKudapan /> },
        { path: 'aktivitas/:slug/:slug', element: <AdminRumahMakanPage /> },
        { path: 'menuMakanan/:slug/:slug', element: <AdminMenuMakananPage /> },
        { path: 'editKudapan/:slug', element: <EditKudapanPage /> },
        { path: 'editAktivitas/:slug', element: <EditRumahMakanPage /> },
        { path: 'editMenuMakanan/:slug', element: <EditMenuMakananPage /> },
        { path: 'addKudapanPage/:slug/:slug', element:< AddKudapanPage/> },
        { path: 'addRumahMakanPage/:slug/:slug', element:< AddRumahMakanPage/> },
        { path: 'addMenuMakananPage/:slug/:slug', element:< AddMenuMakananPage/> },
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
