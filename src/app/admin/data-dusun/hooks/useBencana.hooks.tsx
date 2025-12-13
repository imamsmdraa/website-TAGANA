// src/hooks/useBencana.ts
import { useState, useEffect, useCallback } from 'react';
import { bencanaService, BencanaDB } from '@/services/bencanaService';
import { useAlert } from '@/components/ui/Alert';

export function useBencana(dusunId: number | null) {
  const [data, setData] = useState<BencanaDB[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  const fetchBencana = useCallback(async () => {
    if (!dusunId) return;
    try {
      setIsLoading(true);
      const result = await bencanaService.getByDusunId(dusunId);
      setData(result);
    } catch (error) {
      console.error(error);
      showAlert({ type: 'error', title: 'Error', message: 'Gagal mengambil data bencana' });
    } finally {
      setIsLoading(false);
    }
  }, [dusunId, showAlert]);

  useEffect(() => {
    fetchBencana();
  }, [fetchBencana]);

  return { data, isLoading, fetchBencana };
}