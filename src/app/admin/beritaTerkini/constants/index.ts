import { Kategori } from "../types";

// Kategori Configuration
export const KATEGORI_CONFIG: Record<
  Kategori,
  {
    title: string;
    badge: string;
    activeBadge: string;
    group: "bencana" | "umum";
  }
> = {
  // Kategori Bencana
  banjir: {
    title: "Berita Banjir",
    badge: "bg-blue-100 text-blue-700 border-blue-300",
    activeBadge: "bg-blue-600 text-white",
    group: "bencana",
  },
  longsor: {
    title: "Berita Tanah Longsor",
    badge: "bg-orange-100 text-orange-700 border-orange-300",
    activeBadge: "bg-orange-600 text-white",
    group: "bencana",
  },
  kebakaran: {
    title: "Berita Kebakaran",
    badge: "bg-red-100 text-red-700 border-red-300",
    activeBadge: "bg-red-600 text-white",
    group: "bencana",
  },
  gempa: {
    title: "Berita Gempa",
    badge: "bg-purple-100 text-purple-700 border-purple-300",
    activeBadge: "bg-purple-600 text-white",
    group: "bencana",
  },
  // Kategori Umum
  umum: {
    title: "Berita Umum",
    badge: "bg-gray-100 text-gray-700 border-gray-300",
    activeBadge: "bg-gray-600 text-white",
    group: "umum",
  },
  acara: {
    title: "Berita Acara",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-300",
    activeBadge: "bg-yellow-600 text-white",
    group: "umum",
  },
  sosial: {
    title: "Berita Sosial",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-300",
    activeBadge: "bg-indigo-600 text-white",
    group: "umum",
  },
  kesehatan: {
    title: "Berita Kesehatan",
    badge: "bg-green-100 text-green-700 border-green-300",
    activeBadge: "bg-green-600 text-white",
    group: "umum",
  },
  pendidikan: {
    title: "Berita Pendidikan",
    badge: "bg-cyan-100 text-cyan-700 border-cyan-300",
    activeBadge: "bg-cyan-600 text-white",
    group: "umum",
  },
  ekonomi: {
    title: "Berita Ekonomi",
    badge: "bg-teal-100 text-teal-700 border-teal-300",
    activeBadge: "bg-teal-600 text-white",
    group: "umum",
  },
};

// Status Badge Colors
export const STATUS_BADGE = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-200 text-gray-700",
} as const;

// List of all categories
export const KATEGORI_LIST: Kategori[] = [
  "banjir",
  "longsor",
  "kebakaran",
  "gempa",
  "umum",
  "acara",
  "sosial",
  "kesehatan",
  "pendidikan",
  "ekonomi",
];

// Kategori Bencana untuk filter khusus
export const KATEGORI_BENCANA: Kategori[] = [
  "banjir",
  "longsor",
  "kebakaran",
  "gempa",
];

// Kategori Umum untuk filter khusus
export const KATEGORI_UMUM: Kategori[] = [
  "umum",
  "acara",
  "sosial",
  "kesehatan",
  "pendidikan",
  "ekonomi",
];
