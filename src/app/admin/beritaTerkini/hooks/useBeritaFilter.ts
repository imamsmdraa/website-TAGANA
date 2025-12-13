"use client";

import { useState, useMemo } from "react";
import { BeritaItem, Status, Kategori } from "../types";

export function useBeritaFilter(beritaList: BeritaItem[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [kategoriFilter, setKategoriFilter] = useState<"all" | Kategori>("all");

  const filteredBerita = useMemo(() => {
    return beritaList.filter((berita) => {
      // Filter berdasarkan search query
      const matchesSearch = berita.judul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter berdasarkan status
      const matchesStatus =
        statusFilter === "all" || berita.status === statusFilter;

      // Filter berdasarkan kategori
      const matchesKategori =
        kategoriFilter === "all" || berita.kategori === kategoriFilter;

      return matchesSearch && matchesStatus && matchesKategori;
    });
  }, [beritaList, searchQuery, statusFilter, kategoriFilter]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    kategoriFilter,
    setKategoriFilter,
    filteredBerita,
  };
}
