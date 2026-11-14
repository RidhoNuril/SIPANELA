import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Beranda from './pages/landing/Beranda.jsx';
import Edukasi from './pages/landing/Edukasi/Edukasi.jsx';
import ArtikelDetail from './pages/landing/Edukasi/ArtikelDetail.jsx';
const Lapor = lazy(() => import('./pages/landing/Lapor/Lapor.jsx'));
const Login = lazy(() => import('./pages/landing/Login.jsx'));
const Register = lazy(() => import('./pages/landing/Register.jsx'));
import Tentang from './pages/landing/Tentang.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
const LaporanMasuk = lazy(() => import('./pages/dashboard/laporan_masuk/LaporanMasuk.jsx'));
const KelolaArtikel = lazy(() => import('./pages/dashboard/kelola_artikel/KelolaArtikel.jsx'));
const FormArtikel = lazy(() => import('./pages/dashboard/kelola_artikel/FormArtikel.jsx'));
const Rekapitulasi = lazy(() => import('./pages/dashboard/rekapitulasi/Rekapitulasi.jsx'));
const KelolaKategori = lazy(() => import('./pages/dashboard/kelola_kategori/KelolaKategori.jsx'));
const FormKategori = lazy(() => import('./pages/dashboard/kelola_kategori/FormKategori.jsx'));
import Profil from './pages/dashboard/Profil.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p role="status" className="p-6 text-sm text-slate-500">Memuat halaman...</p>}>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/edukasi" element={<Edukasi />} />
          <Route path="/edukasi/artikel" element={<ArtikelDetail />} />
          <Route path="/lapor" element={<Lapor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profil" element={<Profil />} />
          <Route path="/dashboard/laporan" element={<LaporanMasuk />} />
          <Route path="/dashboard/rekapitulasi" element={<Rekapitulasi />} />
          <Route path="/dashboard/kategori" element={<KelolaKategori />} />
          <Route path="/dashboard/kategori/tambah" element={<FormKategori />} />
          <Route path="/dashboard/kategori/:id/edit" element={<FormKategori mode="edit" />} />
          <Route path="/dashboard/artikel" element={<KelolaArtikel />} />
          <Route path="/dashboard/artikel/tambah" element={<FormArtikel />} />
          <Route path="/dashboard/artikel/:id/edit" element={<FormArtikel mode="edit" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
