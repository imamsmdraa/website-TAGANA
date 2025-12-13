'use client';

import React, { useState } from 'react';
import { useAlert } from '@/components/ui/Alert';
import { useDusun } from '@/hooks/useDusun.hooks'; 
import { rtService } from '@/services/rtService';

const DUSUN_LIST = [
  "Miri", "Jati", "Mojohuro", "Pelemadu", "Sungapan", "Gondosuli",
  "Trukan", "Dogongan", "Ketos", "Ngrancah", "Pengkol", "Sompok", "Wunut"
];

interface AddActionRTProps {
  onClose?: () => void;
}

export default function AddActionRT({ onClose }: AddActionRTProps) {
  const { showAlert } = useAlert();
  const { data: dusunList, isLoading } = useDusun();

  const [rtForm, setRtForm] = useState({
    dusun: '',
    rt: '',
    nama: '',
    jenisKelamin: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRtSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rtForm.dusun || !rtForm.rt || !rtForm.nama) {
      showAlert({ type: 'error', title: 'Gagal', message: 'Lengkapi data wajib!' });
      return;
    }

    setIsSubmitting(true);

    try {
      const targetDusun = dusunList.find(
        (d) => d.nama.toLowerCase() === rtForm.dusun.toLowerCase()
      );

      if (!targetDusun) throw new Error("Dusun tidak ditemukan");

      const payload = {
        dusun_id: targetDusun.id,
        nomor_rt: rtForm.rt,
        nama_ketua: rtForm.nama,
        jenis_kelamin_ketua: rtForm.jenisKelamin || null
      };

      await rtService.create(payload);

      showAlert({
        type: 'success',
        title: 'Berhasil',
        message: `RT ${rtForm.rt} di ${rtForm.dusun} berhasil ditambahkan`
      });

      setRtForm({ dusun: '', rt: '', nama: '', jenisKelamin: '' });
      if (onClose) onClose();

    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Error', message: 'Gagal menyimpan data RT' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Tambah Data RT</h3>
      
      <form onSubmit={handleRtSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dusun
            </label>
            <select
              value={rtForm.dusun}
              onChange={(e) => setRtForm({ ...rtForm, dusun: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              disabled={isLoading}
            >
              <option value="">-- Pilih Dusun --</option>
              {DUSUN_LIST.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Nomor RT */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor RT (Contoh: 001)
            </label>
            <input
              type="text"
              value={rtForm.rt}
              onChange={(e) => setRtForm({ ...rtForm, rt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="001"
            />
          </div>
        </div>

        {/* Nama Ketua RT */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Ketua RT
          </label>
          <input
            type="text"
            value={rtForm.nama}
            onChange={(e) => setRtForm({ ...rtForm, nama: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Nama Lengkap"
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Jenis Kelamin Ketua
          </label>
          <select
            value={rtForm.jenisKelamin}
            onChange={(e) => setRtForm({ ...rtForm, jenisKelamin: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">-- Pilih --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            type="button"
            onClick={() => setRtForm({ dusun: '', rt: '', nama: '', jenisKelamin: '' })}
            className="cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Data RT'}
          </button>
        </div>
      </form>
    </div>
  );
}