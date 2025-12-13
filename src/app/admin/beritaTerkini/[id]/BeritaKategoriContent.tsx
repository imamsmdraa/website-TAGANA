"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/ui/card";
import { Kategori } from "../types";
import { KATEGORI_CONFIG } from "../constants";
import {
  getStatusBadge,
  getKategoriBadge,
  getKategoriTitle,
} from "../utils/helpers";
import { BERITA_DUMMY } from "../data/dummy";

interface BeritaKategoriContentProps {
  kategori: Kategori;
}

export default function BeritaKategoriContent({
  kategori,
}: BeritaKategoriContentProps) {
  const router = useRouter();

  // Filter berita berdasarkan kategori
  const beritaByKategori = BERITA_DUMMY.filter(
    (berita) => berita.kategori === kategori
  );

  // Get kategori info
  const kategoriInfo = KATEGORI_CONFIG[kategori];

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <Card className="w-full h-full">
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Header dengan Kategori Group Badge */}
          <header className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Kembali ke halaman sebelumnya"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                    {getKategoriTitle(kategori)}
                  </h1>
                  <div className="flex items-center gap-2 mt-1 sm:mt-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold capitalize whitespace-nowrap ${
                        kategoriInfo.group === "bencana"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {kategoriInfo.group === "bencana"
                        ? "🚨 Bencana"
                        : "📋 Umum"}
                    </span>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">
                      {beritaByKategori.length} berita
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Wadah Artikel */}
          <section className="space-y-4" aria-label="Daftar artikel berita">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
                Artikel {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
              </h2>
              <span className="text-sm sm:text-base text-gray-500">
                {beritaByKategori.length} artikel
              </span>
            </div>

            {beritaByKategori.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 text-center">
                <p className="text-sm sm:text-base text-gray-500">
                  Belum ada artikel untuk kategori ini
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {beritaByKategori.map((berita) => (
                  <article
                    key={berita.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-200 hover:border-gray-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={berita.image}
                            alt={berita.judul}
                            fill
                            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                            className="object-cover"
                            priority={berita.id <= 3}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2 flex-1">
                            {berita.judul}
                          </h3>
                          <span
                            className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadge(
                              berita.status
                            )}`}
                          >
                            {berita.status}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed">
                          {berita.ringkasan}
                        </p>

                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
                          <time
                            dateTime={berita.tanggal}
                            className="whitespace-nowrap"
                          >
                            {berita.tanggal}
                          </time>
                          <span className="hidden sm:inline">•</span>
                          <span
                            className={`px-2 py-0.5 rounded text-xs capitalize whitespace-nowrap ${getKategoriBadge(
                              berita.kategori
                            )}`}
                          >
                            {berita.kategori}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </Card>
    </main>
  );
}
