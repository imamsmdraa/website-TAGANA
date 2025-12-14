"use client";

import { ReactNode } from "react";

interface BeritaContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wadah (container) untuk artikel berita
 * Digunakan sebagai wrapper untuk menampilkan konten berita
 */
export default function BeritaContainer({
  children,
  className = "",
}: BeritaContainerProps) {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
}
