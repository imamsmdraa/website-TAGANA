"use client";

import { useState } from "react";
import { beritaBencanaData } from "@/data/beritaBencana";
import { useAlert } from "../../ui/allert/page";
import { Badge } from "../../ui/badge/page";

interface Berita {
  id: number;
  title: string;
  date: string;
  status: "published" | "draft";
  image?: string;
  editedTime?: string;
}

export default function KelolaBeritaPage() {
  const { showAlert } = useAlert();
  const [judulBerita, setJudulBerita] = useState("");
  const [kategori, setKategori] = useState("");
  const [isiBerita, setIsiBerita] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const beritaTerkini: Berita[] = beritaBencanaData.slice(0, 5).map((berita) => ({
    id: berita.id,
    title: berita.title,
    date: berita.date,
    status: "published" as const,
    image: berita.image,
  }));

  const handlePublish = () => {
    // Validasi
    if (!judulBerita || !kategori || !isiBerita) {
      showAlert({
        type: 'warning',
        title: 'Data Belum Lengkap',
        message: 'Mohon lengkapi judul, kategori, dan isi berita sebelum mempublikasikan.',
      });
      return;
    }

    // Logic untuk publish berita
    console.log("Publishing berita:", { judulBerita, kategori, isiBerita, mediaFile });
    
    showAlert({
      type: 'success',
      title: 'Berita Berhasil Dipublikasikan!',
      message: `"${judulBerita}" telah dipublikasikan dan dapat dilihat oleh pengunjung.`,
    });

    // Reset form
    setJudulBerita("");
    setKategori("");
    setIsiBerita("");
    setMediaFile(null);
  };

  const handleSaveDraft = () => {
    // Validasi minimal
    if (!judulBerita) {
      showAlert({
        type: 'error',
        title: 'Gagal Menyimpan Draft',
        message: 'Judul berita harus diisi untuk menyimpan draft.',
      });
      return;
    }

    // Logic untuk save draft
    console.log("Saving draft:", { judulBerita, kategori, isiBerita, mediaFile });
    
    showAlert({
      type: 'info',
      title: 'Draft Tersimpan',
      message: `Draft "${judulBerita}" telah disimpan. Anda dapat melanjutkan nanti.`,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 50 * 1024 * 1024; // 50MB
      
      if (file.size > maxSize) {
        showAlert({
          type: 'error',
          title: 'File Terlalu Besar',
          message: 'Ukuran file maksimal 50MB. Silakan pilih file yang lebih kecil.',
        });
        return;
      }
      
      setMediaFile(file);
      showAlert({
        type: 'success',
        title: 'File Berhasil Diunggah',
        message: `${file.name} siap untuk dipublikasikan.`,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-50">
      {/* Main Content - Form */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
          <div className="max-w-3xl ml-0 lg:ml-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Tulis Berita Baru</h1>
              <button className="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg">
                Simpan Draft
              </button>
            </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Judul Berita */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Berita
              </label>
              <input
                type="text"
                value={judulBerita}
                onChange={(e) => setJudulBerita(e.target.value)}
                placeholder="Masukkan judul berita menarik..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="infrastruktur">Infrastruktur</option>
                <option value="sosial">Sosial</option>
                <option value="kesehatan">Kesehatan</option>
                <option value="pendidikan">Pendidikan</option>
                <option value="ekonomi">Ekonomi</option>
                <option value="bencana">Bencana</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            {/* Isi Berita */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Isi Berita
              </label>
              {/* Toolbar */}
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-t-lg border-b border-blue-200">
                <button
                  type="button"
                  className="p-2 hover:bg-blue-200 rounded transition-colors"
                  title="Bold"
                >
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 12h12M6 6h12M6 18h12" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-blue-200 rounded transition-colors"
                  title="Italic"
                >
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-blue-200 rounded transition-colors"
                  title="Underline"
                >
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10M12 3v12m-4-4l4 4 4-4" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-blue-200 rounded transition-colors"
                  title="Link"
                >
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
              <textarea
                value={isiBerita}
                onChange={(e) => setIsiBerita(e.target.value)}
                placeholder="Tulis detail berita di sini..."
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media (Gambar/Video)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  id="media-upload"
                  accept="image/*,video/*,.jpg,.png,.mp4"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="media-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold text-blue-600">Klik atau seret file</span> ke sini untuk mengunggah
                  </p>
                  <p className="text-sm text-gray-400">Mendukung JPG, PNG, MP4 (Max 50MB)</p>
                  {mediaFile && (
                    <p className="mt-3 text-sm text-green-600 font-medium">
                      File terpilih: {mediaFile.name}
                    </p>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Batal
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Publikasikan Berita</span>
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Sidebar - Stats & Recent - Sticky on Desktop */}
        <div className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 md:p-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm opacity-90 mb-1">Berita diterbitkan bulan ini</p>
                <h2 className="text-4xl font-bold">{beritaTerkini.length}</h2>
              </div>
              <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>

        {/* Berita Terkini */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Berita Terkini</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-3">
            {beritaTerkini.map((berita) => (
              <div
                key={berita.id}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex space-x-3">
                  {berita.image ? (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <img src={berita.image} alt={berita.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                      {berita.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-gray-500">{berita.editedTime || berita.date}</span>
                      <span className="text-gray-300">•</span>
                      <span
                        className={`px-2 py-0.5 rounded-full font-medium ${
                          berita.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {berita.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal/Event Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-xs text-gray-500 uppercase">Okt</p>
              <p className="text-2xl font-bold text-blue-600">18</p>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">
                Penyaluran Bantuan Langsung Tunai
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Rabu, 18 Okt • Dana Desa tahap 3 untuk warga penerima manfaat.
              </p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>09:00 - 14:00</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Kantor Desa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <button className="w-full mt-6 bg-gray-900 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">Simpan Jadwal</span>
        </button>
      </div>
    </div>
  );
}
