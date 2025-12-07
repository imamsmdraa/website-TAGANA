"use client";

import { useState } from "react";

interface BencanaData {
  id: number;
  jenisBencana: string;
  frekuensi: string;
  tingkatRisiko: "Tinggi" | "Sedang" | "Rendah";
  statusPrioritas: "Paling Tinggi" | "Biasa";
}

interface Dusun {
  id: number;
  nama: string;
  riskLevel: "high" | "medium" | "low";
}

export default function DataDusunPage() {
  const [selectedDusun, setSelectedDusun] = useState<string>("Dusun Krajan Timur");
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state
  const [jenisBencana, setJenisBencana] = useState("");
  const [frekuensi, setFrekuensi] = useState("");
  const [tingkatRisiko, setTingkatRisiko] = useState("");
  const [isPalingDominan, setIsPalingDominan] = useState(false);

  const dusunList: Dusun[] = [
    { id: 1, nama: "Dusun Krajan Timur", riskLevel: "high" },
    { id: 2, nama: "Dusun Sanggrahan", riskLevel: "medium" },
    { id: 3, nama: "Dusun Gatak", riskLevel: "high" },
    { id: 4, nama: "Dusun Jetis", riskLevel: "low" },
    { id: 5, nama: "Dusun Kebonrejo", riskLevel: "medium" },
  ];

  const [bencanaData, setBencanaData] = useState<BencanaData[]>([
    {
      id: 1,
      jenisBencana: "Tanah Longsor",
      frekuensi: "Sering (Musim Hujan)",
      tingkatRisiko: "Tinggi",
      statusPrioritas: "Paling Tinggi",
    },
    {
      id: 2,
      jenisBencana: "Angin Puting Beliung",
      frekuensi: "Jarang",
      tingkatRisiko: "Sedang",
      statusPrioritas: "Biasa",
    },
    {
      id: 3,
      jenisBencana: "Kekeringan",
      frekuensi: "Musiman (Kemarau)",
      tingkatRisiko: "Sedang",
      statusPrioritas: "Biasa",
    },
  ]);

  const handleAddBencana = () => {
    if (jenisBencana && frekuensi && tingkatRisiko) {
      const newBencana: BencanaData = {
        id: bencanaData.length + 1,
        jenisBencana,
        frekuensi,
        tingkatRisiko: tingkatRisiko as "Tinggi" | "Sedang" | "Rendah",
        statusPrioritas: isPalingDominan ? "Paling Tinggi" : "Biasa",
      };
      setBencanaData([...bencanaData, newBencana]);
      
      // Reset form
      setJenisBencana("");
      setFrekuensi("");
      setTingkatRisiko("");
      setIsPalingDominan(false);
    }
  };

  const handleDelete = (id: number) => {
    setBencanaData(bencanaData.filter(item => item.id !== id));
  };

  const getRisikoColor = (risiko: string) => {
    switch (risiko) {
      case "Tinggi":
        return "text-red-600 bg-red-50";
      case "Sedang":
        return "text-yellow-600 bg-yellow-50";
      case "Rendah":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getPrioritasColor = (prioritas: string) => {
    if (prioritas === "Paling Tinggi") {
      return "text-red-700 bg-red-100 border-red-300";
    }
    return "text-gray-600 bg-gray-100 border-gray-300";
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Data Wilayah & Bencana</h1>
        
        {/* Pilih Wilayah Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-blue-900 mb-2 sm:mb-3">
            Pilih Wilayah Dusun
          </label>
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="w-full">
              <select
                value={selectedDusun}
                onChange={(e) => setSelectedDusun(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {dusunList.map((dusun) => (
                  <option key={dusun.id} value={dusun.nama}>
                    {dusun.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-white border border-blue-400 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Tambah Dusun</span>
              </button>
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Tampilkan Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Manajemen Risiko Bencana */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              Manajemen Risiko Bencana: {selectedDusun}
            </h2>
            <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 self-start sm:self-auto">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Status Saat Ini</span>
            </button>
          </div>

          {/* Input Form */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              Tambahkan jenis bencana yang berpotensi terjadi di wilayah ini serta atur frekuensi kejadiannya.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Jenis Bencana
                </label>
                <select
                  value={jenisBencana}
                  onChange={(e) => setJenisBencana(e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Pilih jenis bencana...</option>
                  <option value="Tanah Longsor">Tanah Longsor</option>
                  <option value="Banjir">Banjir</option>
                  <option value="Angin Puting Beliung">Angin Puting Beliung</option>
                  <option value="Kekeringan">Kekeringan</option>
                  <option value="Kebakaran">Kebakaran</option>
                  <option value="Gempa Bumi">Gempa Bumi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Frekuensi Kejadian
                </label>
                <select
                  value={frekuensi}
                  onChange={(e) => setFrekuensi(e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seberapa sering...</option>
                  <option value="Sangat Sering">Sangat Sering</option>
                  <option value="Sering (Musim Hujan)">Sering (Musim Hujan)</option>
                  <option value="Kadang-kadang">Kadang-kadang</option>
                  <option value="Jarang">Jarang</option>
                  <option value="Musiman (Kemarau)">Musiman (Kemarau)</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tingkat Dampak / Risiko
                </label>
                <select
                  value={tingkatRisiko}
                  onChange={(e) => setTingkatRisiko(e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Pilih tingkat risiko...</option>
                  <option value="Tinggi">Tinggi</option>
                  <option value="Sedang">Sedang</option>
                  <option value="Rendah">Rendah</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-start sm:items-center">
                <input
                  type="checkbox"
                  id="dominan"
                  checked={isPalingDominan}
                  onChange={(e) => setIsPalingDominan(e.target.checked)}
                  className="w-4 h-4 mt-0.5 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                />
                <label htmlFor="dominan" className="ml-2 text-xs sm:text-sm text-gray-700">
                  Tandai sebagai bencana paling dominan/tertinggi
                </label>
              </div>
              <button
                onClick={handleAddBencana}
                className="w-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Tambahkan Data Bencana</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">Riwayat & Potensi Bencana Terdaftar</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100">
                  <th className="px-3 xl:px-4 py-3 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Jenis Bencana
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Frekuensi
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Tingkat Risiko
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Status Prioritas
                  </th>
                  <th className="px-3 xl:px-4 py-3 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bencanaData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 xl:px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-3 xl:px-4 py-3 text-sm font-medium text-gray-900">{item.jenisBencana}</td>
                    <td className="px-3 xl:px-4 py-3 text-sm text-gray-600">{item.frekuensi}</td>
                    <td className="px-3 xl:px-4 py-3">
                      <span className={`inline-block px-2 xl:px-3 py-1 rounded-full text-xs font-semibold ${getRisikoColor(item.tingkatRisiko)}`}>
                        {item.tingkatRisiko}
                      </span>
                    </td>
                    <td className="px-3 xl:px-4 py-3">
                      <span className={`inline-block px-2 xl:px-3 py-1 rounded-full text-xs font-medium border ${getPrioritasColor(item.statusPrioritas)}`}>
                        {item.statusPrioritas === "Paling Tinggi" ? "⚠ Paling Tinggi" : "Biasa"}
                      </span>
                    </td>
                    <td className="px-3 xl:px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <svg className="w-4 xl:w-5 h-4 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <svg className="w-4 xl:w-5 h-4 xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-200">
            {bencanaData.map((item, index) => (
              <div key={item.id} className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                      <span className="text-xs font-bold text-gray-500 flex-shrink-0">#{index + 1}</span>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 truncate">{item.jenisBencana}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{item.frekuensi}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${getRisikoColor(item.tingkatRisiko)}`}>
                        {item.tingkatRisiko}
                      </span>
                      <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${getPrioritasColor(item.statusPrioritas)}`}>
                        {item.statusPrioritas === "Paling Tinggi" ? "⚠ Tinggi" : "Biasa"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 flex-shrink-0">
                    <button className="text-blue-600 hover:text-blue-700 p-1.5 sm:p-2 hover:bg-blue-50 rounded transition-colors">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700 p-1.5 sm:p-2 hover:bg-red-50 rounded transition-colors"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {bencanaData.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>Belum ada data bencana yang terdaftar</p>
              <p className="text-sm mt-1">Tambahkan data bencana menggunakan form di atas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
