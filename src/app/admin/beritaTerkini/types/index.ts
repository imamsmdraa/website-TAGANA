// Types untuk Berita Terkini Module
export type Status = "published" | "draft";

// Kategori Bencana
export type KategoriBencana = "banjir" | "longsor" | "kebakaran" | "gempa";

// Kategori Umum
export type KategoriUmum =
  | "umum"
  | "acara"
  | "sosial"
  | "kesehatan"
  | "pendidikan"
  | "ekonomi";

// Semua kategori
export type Kategori = KategoriBencana | KategoriUmum;

export interface BeritaItem {
  id: number;
  image: string;
  judul: string;
  tanggal: string;
  status: Status;
  kategori: Kategori;
  ringkasan: string;
}

export interface FilterState {
  searchQuery: string;
  statusFilter: "all" | Status;
  kategoriFilter: "all" | Kategori;
}
