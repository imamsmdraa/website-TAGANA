import { useState, useEffect, useCallback } from 'react';
import { rtService, RTDB } from '@/services/rtService';
import { useAlert } from '@/components/ui/Alert';

export function useRt(selectedDusun: string) {
  const [data, setData] = useState<RTDB[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();

  const fetchRt = useCallback(async () => {
    if (!selectedDusun) return;
    
    try {
      setIsLoading(true);
      const result = await rtService.getByDusun(selectedDusun);
      setData(result);
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Error', message: 'Gagal mengambil data RT' });
    } finally {
      setIsLoading(false);
    }
  }, [selectedDusun, showAlert]);

  useEffect(() => {
    fetchRt();
  }, [fetchRt]);

  const updateRt = async (id: string, payload: any) => {
    try {
      await rtService.update(id, payload);
      await fetchRt(); 
      showAlert({ type: 'success', title: 'Sukses', message: 'Data RT berhasil diperbarui' });
      return true;
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Gagal', message: 'Gagal update data RT' });
      return false;
    }
  };

  const deleteRt = async (id: string) => {
    try {
      await rtService.delete(id);
      await fetchRt(); 
      showAlert({ type: 'success', title: 'Sukses', message: 'Data RT berhasil dihapus' });
      return true;
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Gagal', message: 'Gagal menghapus data RT' });
      return false;
    }
  };

  return { data, isLoading, updateRt, deleteRt };
}