'use client';

import { useState } from 'react';
import EditModal from './modals/EditModal';
import DeleteModal from './modals/DeleteModal';
import { useRt } from '@/hooks/useRt.hooks'; 
import { Pencil, Trash2 } from 'lucide-react';

interface RTDB {
  id: string;
  nomor_rt: string;
  nama_ketua: string | null;
  jenis_kelamin_ketua: string | null;
}

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

export function RtTable() {
  const [selectedDusun, setSelectedDusun] = useState<string>('Miri');
  
  const { data: rtData, isLoading, updateRt, deleteRt } = useRt(selectedDusun);

  const [editingItem, setEditingItem] = useState<RTDB | null>(null);
  const [deletingItem, setDeletingItem] = useState<RTDB | null>(null);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const safeData = rtData || [];
  const displayData = showAll ? safeData : safeData.slice(0, ITEMS_PER_PAGE);

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const handleDelete = (item: any) => {
    setDeletingItem(item);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!editingItem) return;

    const payload = {
      nomor_rt: updatedData.rt,
      nama_ketua: updatedData.nama,
      jenis_kelamin_ketua: updatedData.jenisKelamin
    };
    
    const success = await updateRt(editingItem.id, payload);
    if (success) setEditingItem(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    
    const success = await deleteRt(deletingItem.id);
    if (success) setDeletingItem(null);
  };

  const editFields = [
    { name: 'rt', label: 'RT', type: 'text' as const, required: true },
    { name: 'nama', label: 'Nama Kepala RT', type: 'text' as const, required: true },
    { 
      name: 'jenisKelamin', 
      label: 'Jenis Kelamin', 
      type: 'select' as const,
      options: [
        { value: '', label: 'Pilih Jenis Kelamin' },
        { value: 'L', label: 'Laki-laki' },
        { value: 'P', label: 'Perempuan' }
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center py-10 text-gray-500">Memuat data RT...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-md">Data RT per Dusun</h1>
        
        <select
          value={selectedDusun}
          onChange={(e) => {
            setSelectedDusun(e.target.value);
            setShowAll(false);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm cursor-pointer"
        >
          {DUSUN_LIST.map((dusun) => (
            <option key={dusun} value={dusun}>{dusun}</option>
          ))}
        </select>
      </div>

      <div className="border-b border-gray-300" />

      {/* TABLE */}
      <div className="overflow-x-auto">
        <div className="rounded-xl shadow-sm p-4">
          <table className="w-full border-separate border-spacing-1">
            <thead>
              <tr>
                {["No", "RT", "Nama Kepala RT", "Jenis Kelamin", "Aksi"].map((h) => (
                  <th
                    key={h}
                    className="bg-blue-200 shadow-sm rounded-sm px-4 py-3 text-sm font-semibold text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {displayData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="bg-white shadow-sm rounded-sm py-8 text-center text-gray-500">
                    Tidak ada data RT untuk dusun {selectedDusun}
                  </td>
                </tr>
              ) : (
                displayData.map((item, index) => (
                  <tr key={item.id}>
                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {index + 1}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm font-medium">
                      {item.nomor_rt}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {item.nama_ketua || '-'}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3 text-center text-sm">
                      {item.jenis_kelamin_ketua === 'L' ? 'Laki-laki' : item.jenis_kelamin_ketua === 'P' ? 'Perempuan' : '-'}
                    </td>

                    <td className="bg-white shadow-sm rounded-sm py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-blue-100 transition"
                        >
                          <Pencil size={16} className="text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="cursor-pointer p-2 rounded-lg shadow-sm hover:bg-red-100 transition"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Show More/Less Button */}
      {safeData.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showAll ? 'Lihat Lebih Sedikit' : `Lihat Selengkapnya (${safeData.length - ITEMS_PER_PAGE} lainnya)`}
          </button>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Total RT di {selectedDusun}: <span className="font-semibold">{safeData.length}</span>
        {!showAll && safeData.length > 0 && ` | Menampilkan: ${Math.min(ITEMS_PER_PAGE, safeData.length)}`}
      </div>

      {editingItem && (
        <EditModal
          title="Edit Data RT"
          fields={editFields}
          // Mapping Data DB -> Form Modal
          initialData={{
            rt: editingItem.nomor_rt,
            nama: editingItem.nama_ketua || '',
            jenisKelamin: editingItem.jenis_kelamin_ketua || ''
          }}
          onSave={handleSaveEdit}
          onClose={() => setEditingItem(null)}
        />
      )}

      {deletingItem && (
        <DeleteModal
          title="Hapus Data RT"
          message={`Apakah Anda yakin ingin menghapus data RT ${deletingItem.nomor_rt} - ${deletingItem.nama_ketua}?`}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
}