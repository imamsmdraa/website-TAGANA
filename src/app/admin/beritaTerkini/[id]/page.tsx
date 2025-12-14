import { Metadata } from "next";
import BeritaKategoriContent from "./components/BeritaKategoriContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Detail Berita - Admin TAGANA`,
    description: `Halaman detail berita`,
  };
}

interface BeritaKategoriPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BeritaKategoriPage({
  params,
}: BeritaKategoriPageProps) {
  const { id } = await params;

  return <BeritaKategoriContent id={id} />;
}