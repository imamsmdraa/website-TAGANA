import { BeritaItem } from "../types";

/**
 * Dummy data untuk berita
 * TODO: Replace dengan fetch dari Supabase/API
 */
export const BERITA_DUMMY: BeritaItem[] = [
  {
    id: 1,
    image: "/ketos.png",
    judul: "Banjir Melanda Dusun A, Warga Mengungsi",
    tanggal: "12 Mar 2025",
    status: "published",
    kategori: "banjir",
    ringkasan:
      "Hujan deras selama 3 hari menyebabkan banjir setinggi 1 meter di Dusun A.",
  },
  {
    id: 2,
    image: "/ketos.png",
    judul: "Tanah Longsor di Dusun B, Akses Jalan Terputus",
    tanggal: "11 Mar 2025",
    status: "published",
    kategori: "longsor",
    ringkasan:
      "Longsor material sebanyak 50 meter kubik menutup akses jalan utama.",
  },
  {
    id: 3,
    image: "/ketos.png",
    judul: "Kebakaran Hutan di Area Lereng Gunung",
    tanggal: "10 Mar 2025",
    status: "draft",
    kategori: "kebakaran",
    ringkasan:
      "Api membakar area seluas 2 hektar di lereng gunung bagian selatan.",
  },
  {
    id: 4,
    image: "/ketos.png",
    judul: "Banjir Bandang Merusak Jembatan Penghubung",
    tanggal: "09 Mar 2025",
    status: "published",
    kategori: "banjir",
    ringkasan:
      "Banjir bandang menerjang dan merusak jembatan utama penghubung antar dusun.",
  },
  {
    id: 5,
    image: "/ketos.png",
    judul: "Gempa 5.2 SR Guncang Wilayah Yogyakarta",
    tanggal: "08 Mar 2025",
    status: "published",
    kategori: "gempa",
    ringkasan:
      "Gempa berkekuatan 5.2 SR terjadi pada pukul 14.30 WIB dengan kedalaman 10 km.",
  },
  // Kategori Umum
  {
    id: 6,
    image: "/ketos.png",
    judul: "Pelatihan Tanggap Bencana untuk Warga",
    tanggal: "07 Mar 2025",
    status: "published",
    kategori: "umum",
    ringkasan:
      "TAGANA mengadakan pelatihan kesiapsiagaan bencana untuk seluruh warga desa. Peserta belajar teknik penyelamatan darurat.",
  },

  // Kategori Acara
  {
    id: 7,
    image: "/ketos.png",
    judul: "Festival Budaya Dusun Akan Digelar Pekan Depan",
    tanggal: "15 Mar 2025",
    status: "published",
    kategori: "acara",
    ringkasan:
      "Festival budaya tahunan akan diselenggarakan dengan berbagai pertunjukan seni tradisional dan modern.",
  },

  // Kategori Sosial
  {
    id: 8,
    image: "/ketos.png",
    judul: "Program Bantuan Sosial untuk Keluarga Kurang Mampu",
    tanggal: "14 Mar 2025",
    status: "published",
    kategori: "sosial",
    ringkasan:
      "Pemerintah desa meluncurkan program bantuan sosial bulanan untuk 150 keluarga kurang mampu di wilayah Sriharjo.",
  },

  // Kategori Kesehatan
  {
    id: 9,
    image: "/ketos.png",
    judul: "Vaksinasi Gratis di Puskesmas Sriharjo Minggu Depan",
    tanggal: "13 Mar 2025",
    status: "published",
    kategori: "kesehatan",
    ringkasan:
      "Puskesmas Sriharjo menyediakan vaksinasi gratis untuk semua usia. Program dilakukan setiap hari kerja mulai jam 08.00 WIB.",
  },

  // Kategori Pendidikan
  {
    id: 10,
    image: "/ketos.png",
    judul: "Beasiswa Penuh untuk Siswa Berprestasi Dusun Sriharjo",
    tanggal: "12 Mar 2025",
    status: "published",
    kategori: "pendidikan",
    ringkasan:
      "Yayasan pendidikan memberikan beasiswa penuh kepada 10 siswa berprestasi dari keluarga kurang mampu di desa.",
  },

  // Kategori Ekonomi
  {
    id: 11,
    image: "/ketos.png",
    judul: "UMKM Lokal Mendapat Pelatihan Bisnis Gratis",
    tanggal: "11 Mar 2025",
    status: "published",
    kategori: "ekonomi",
    ringkasan:
      "Dinas Koperasi dan UMKM mengadakan pelatihan manajemen bisnis untuk 50 pengusaha kecil menengah di Sriharjo.",
  },
];

/**
 * Get berita by kategori
 */
export const getBeritaByKategori = (kategori: string): BeritaItem[] => {
  return BERITA_DUMMY.filter((berita) => berita.kategori === kategori);
};

/**
 * Get berita by id
 */
export const getBeritaById = (id: number): BeritaItem | undefined => {
  return BERITA_DUMMY.find((berita) => berita.id === id);
};
