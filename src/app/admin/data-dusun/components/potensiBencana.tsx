'use client';

import { useState, useEffect } from "react";
import { Pencil, Trash2, AlertCircle } from "lucide-react";
import { dusunService, DusunWithBencana } from "@/services/dusunService";
import { bencanaService } from "@/services/bencanaService";
import ModalsEdit from "./ModalsEdit";
import ModalsDelete from "./ModalsDelate";
import { useAlert } from "@/components/ui/Alert";

type Risiko = "none" | "low" | "medium" | "high";

export default function PotensiBencana() {
  const { showAlert } = useAlert();
  
  const [bencanaData, setBencanaData] = useState<DusunWithBencana[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    data: any | null; 
    dusunNama: string;
  }>({ isOpen: false, data: null, dusunNama: '' });

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await dusunService.getAllWithBencana();
      setBencanaData(data || []);
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Error', message: 'Gagal mengambil data bencana' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const risikoStyle = (severity: string): string => {
    if (severity === "high") return "bg-red-100 text-red-600";
    if (severity === "medium") return "bg-yellow-100 text-yellow-700";
    if (severity === "low") return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  const risikoLabel = (severity: string): string => {
    if (severity === "high") return "Tinggi";
    if (severity === "medium") return "Sedang";
    if (severity === "low") return "Rendah";
    return "Aman";
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await bencanaService.delete(deleteModal.id);
      showAlert({ type: 'success', title: 'Sukses', message: 'Data bencana dihapus' });
      fetchData(); // Refresh Tabel
      setDeleteModal({ isOpen: false, id: null });
    } catch (error) {
      showAlert({ type: 'error', title: 'Gagal', message: 'Gagal menghapus data' });
    }
  };

  const handleSaveEdit = async (updatedItem: any) => {
    try {
      const payload = {
        jenis_bencana: updatedItem.type,
        level_resiko: updatedItem.severity,
        deskripsi: updatedItem.description,
      };

      await bencanaService.update(updatedItem.id, payload);
      showAlert({ type: 'success', title: 'Sukses', message: 'Data berhasil diperbarui' });
      fetchData(); 
      setEditModal({ isOpen: false, data: null, dusunNama: '' });
    } catch (error) {
      showAlert({ type: 'error', title: 'Gagal', message: 'Gagal update data' });
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Memuat data potensi bencana...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="font-semibold text-md">
        Riwayat & Potensi Bencana - Semua Dusun
      </h1>

      <div className="border-b border-gray-300" />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "Dusun", "Jenis Bencana", "Tingkat Risiko", "Keterangan", "Aksi"].map((h) => (
                  <th
                    key={h}
                    className="bg-blue-200 shadow-sm rounded-sm px-6 py-3 text-sm font-semibold text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {bencanaData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Belum ada data bencana. Silakan input di form Manajemen Risiko.
                  </td>
                </tr>
              ) : (
                bencanaData.map((dusun, dusunIdx) => {
                  const disasters = dusun.bencana.length > 0 ? dusun.bencana : [null];
                  return disasters.map((disaster, disasterIdx) => (
                    <tr key={`${dusun.id}-${disasterIdx}`}>
                      {disasterIdx === 0 && (
                        <>
                          <td
                            rowSpan={disasters.length}
                            className="bg-white shadow-sm rounded-sm py-3 text-center text-sm align-top pt-4"
                          >
                            {dusunIdx + 1}
                          </td>
                          <td
                            rowSpan={disasters.length}
                            className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium align-top pt-4"
                          >
                            {dusun.nama}
                          </td>
                        </>
                      )}

                      {/* Kolom Data Bencana */}
                      {disaster ? (
                        <>
                          <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                            {disaster.jenis_bencana}
                          </td>

                          <td className="bg-white shadow-sm rounded-sm py-3 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${risikoStyle(
                                disaster.level_resiko
                              )}`}
                            >
                              {risikoLabel(disaster.level_resiko)}
                            </span>
                          </td>

                          <td className="bg-white shadow-sm rounded-sm py-3 text-left px-4 text-sm">
                            {disaster.deskripsi}
                          </td>

                          <td className="bg-white shadow-sm rounded-sm py-3">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => setEditModal({
                                  isOpen: true,
                                  dusunNama: dusun.nama,
                                  data: {
                                    id: disaster.id,
                                    type: disaster.jenis_bencana,
                                    severity: disaster.level_resiko,
                                    description: disaster.deskripsi
                                  }
                                })}
                                className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                              >
                                <Pencil size={16} className="text-blue-500" />
                              </button>
                              <button
                                onClick={() => setDeleteModal({ isOpen: true, id: disaster.id })}
                                className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-red-100 transition"
                              >
                                <Trash2 size={16} className="text-red-500" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td colSpan={3} className="bg-white shadow-sm rounded-sm py-3 text-center text-sm text-gray-400 italic">
                            Tidak ada potensi bencana tercatat
                          </td>
                          <td className="bg-white shadow-sm rounded-sm py-3 text-center">
                            <div className="flex justify-center">
                                <AlertCircle size={16} className="text-green-500" />
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ));
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        Total Wilayah Terpantau:{" "}
        <span className="font-semibold">{bencanaData.length}</span>
      </div>

      {/* Modals */}
      {editModal.isOpen && editModal.data && (
        <ModalsEdit
          disaster={editModal.data}
          dusunName={editModal.dusunNama}
          onClose={() => setEditModal({ isOpen: false, data: null, dusunNama: '' })}
          onSave={handleSaveEdit}
        />
      )}

      {deleteModal.isOpen && (
        <ModalsDelete
          onClose={() => setDeleteModal({ isOpen: false, id: null })}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}