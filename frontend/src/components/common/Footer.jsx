export default function Footer() {
  return (
    <footer className="w-full bg-[#0B3C65] py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs md:flex-row">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="font-bold tracking-wider">SIPANELA</span>
          </div>
          <p className="text-gray-300">
            © 2025 Layanan Pelaporan Masyarakat Terenkripsi. Dilindungi Undang-Undang Kerahasiaan Saksi &amp; Pelapor.
          </p>
        </div>

        <nav className="flex items-center gap-6 font-medium text-gray-300" aria-label="Tautan informasi">
          <a href="#protokol" className="transition-colors hover:text-white">Protokol Anonimitas</a>
          <a href="#penghapusan" className="transition-colors hover:text-white">Penghapusan Metadata</a>
          <a href="#kerahasiaan" className="transition-colors hover:text-white">Kerahasiaan Data</a>
        </nav>
      </div>
    </footer>
  );
}
