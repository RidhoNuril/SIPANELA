# SIPANELA

SIPANELA adalah aplikasi web untuk pelaporan dan pemantauan penanganan kasus terkait narkoba di lingkungan kampus Politeknik Negeri Lampung. Sistem menyediakan halaman publik untuk informasi dan pengiriman laporan, serta dashboard untuk melihat dan mengelola data pelaporan.

> **Status proyek:** frontend saat ini merupakan prototipe. Data halaman dashboard masih berupa data contoh di sisi klien, dan belum terhubung ke API atau database. Perubahan data yang hanya disimpan dalam React state akan hilang saat halaman dimuat ulang.

## Fitur

### Halaman publik

- Beranda, informasi tentang SIPANELA, dan halaman login.
- Halaman edukasi serta detail artikel.
- Formulir pelaporan bertahap yang mencakup detail kejadian, lokasi, dan konfirmasi.
- Pemilihan lokasi melalui peta pada antarmuka, pengambilan lokasi perangkat melalui Geolocation API browser, serta unggah bukti JPG, PNG, atau MP4 hingga 25 MB.

### Dashboard

- Ringkasan laporan dengan pilihan periode mingguan, bulanan, dan tahunan.
- Daftar laporan masuk, filter kategori, pencarian, serta overlay alur verifikasi, investigasi, dan penyelesaian.
- Halaman rekapitulasi dengan filter periode dan daftar arsip contoh.
- Pengelolaan artikel dan kategori melalui halaman daftar dan formulir.

## Teknologi

- React 19 dan JavaScript (ES modules).
- Vite 8 sebagai development server dan bundler.
- React Router 7 untuk navigasi sisi klien.
- Tailwind CSS 4 melalui plugin Vite.
- TanStack React Table untuk tabel data dan pagination.
- Axios untuk komunikasi HTTP melalui satu instance konfigurasi.
- Lucide React untuk ikon antarmuka.
- Poppins sebagai font antarmuka lokal.
- Oxlint untuk linting.

## Persyaratan

- Node.js dan npm yang kompatibel dengan versi Vite pada `package.json`.
- Browser modern untuk menjalankan aplikasi. Fitur lokasi perangkat memerlukan izin pengguna dan dukungan Geolocation API.

## Menjalankan proyek

Pasang dependensi:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Vite akan menampilkan alamat lokal di terminal (biasanya `http://localhost:5173`).

## Perintah yang tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan development server dengan hot module replacement. |
| `npm run build` | Membuat build produksi ke direktori `dist/`. |
| `npm run preview` | Menjalankan preview lokal dari build produksi. Jalankan `npm run build` terlebih dahulu. |
| `npm run lint` | Memeriksa source menggunakan Oxlint. |

## Struktur proyek

```text
src/
├── App.jsx                       # Definisi rute aplikasi
├── main.jsx                      # Bootstrap React dan stylesheet
├── index.css                     # Tailwind, font Poppins, dan gaya global
├── App.css                       # Gaya aplikasi
├── api/axiosConfig.js            # Axios instance dan interceptor
├── services/                     # Data mock dan pemanggilan endpoint per domain
├── assets/                       # Gambar dan font lokal
├── components/common/            # Navbar, footer, layout dashboard, dan tabel bersama
└── pages/
    ├── landing/                  # Beranda, edukasi, login, tentang, dan formulir laporan
    └── dashboard/                # Ringkasan, laporan, rekapitulasi, artikel, dan kategori
```

Konfigurasi Vite berada di `vite.config.js`; dependensi dan script npm berada di `package.json`.

## Konfigurasi API

Base URL API dibaca dari `VITE_API_URL` atau `REACT_APP_API_URL`. Jika keduanya tidak diatur, aplikasi menggunakan `http://localhost:3000/api`.

Contoh file `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

Pemanggilan HTTP menggunakan instance di `src/api/axiosConfig.js`. Instance tersebut mengirim token Bearer dari `localStorage` (`token` atau `accessToken`) dan menghapus token serta memancarkan event `auth:unauthorized` saat menerima respons 401.

Data contoh dan fungsi pemanggilan dikelompokkan di `src/services/`. Setiap service domain memiliki `USE_MOCK = true`; mode mock mengembalikan data yang sama seperti sebelumnya dengan jeda 500 ms, sementara komponen tetap merender data awal agar tidak menampilkan loading baru. Saat endpoint backend siap, ubah flag `USE_MOCK` pada service yang digunakan menjadi `false` dan sesuaikan path endpoint jika kontrak backend berbeda.

## Rute aplikasi

| URL | Halaman |
| --- | --- |
| `/` | Beranda |
| `/edukasi` | Daftar edukasi |
| `/edukasi/artikel` | Detail artikel |
| `/lapor` | Formulir pelaporan |
| `/login` | Login |
| `/tentang` | Informasi tentang SIPANELA |
| `/dashboard` | Ringkasan dashboard |
| `/dashboard/laporan` | Laporan masuk dan proses penanganan |
| `/dashboard/rekapitulasi` | Rekapitulasi laporan |
| `/dashboard/kategori` | Daftar kategori |
| `/dashboard/kategori/tambah` | Formulir tambah kategori |
| `/dashboard/kategori/:id/edit` | Formulir edit kategori |
| `/dashboard/artikel` | Daftar artikel |
| `/dashboard/artikel/tambah` | Formulir tambah artikel |
| `/dashboard/artikel/:id/edit` | Formulir edit artikel |

## Catatan pengembangan

- Navigasi menggunakan `BrowserRouter`. Deployment perlu mengarahkan fallback URL aplikasi ke `index.html` agar rute selain `/` dapat dibuka langsung.
- Dashboard, daftar laporan, edukasi, organisasi, profil, artikel, dan kategori menggunakan data contoh dari lapisan service.
- Formulir dan perubahan status laporan belum mengirim data ke layanan backend; hubungkan ke API dan penyimpanan persisten sebelum digunakan untuk pelaporan operasional.
- Belum ada script test otomatis di `package.json`.
