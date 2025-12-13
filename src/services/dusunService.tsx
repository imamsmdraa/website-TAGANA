import { supabase } from '@/lib/supabase';

export interface DusunDB {
  id: number;
  nama: string;
  jumlah_penduduk: number; 
  jumlah_kk: number;
  jumlah_laki_laki: number;
  jumlah_perempuan: number;
  jumlah_balita: number;
  jumlah_lansia: number;
  jumlah_ibu_hamil: number;
  jumlah_disabilitas: number;
  jumlah_miskin: number;
}

export const dusunService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data as DusunDB[];
  },

  updateStats: async (id: number, stats: Partial<DusunDB>) => {
    const { data, error } = await supabase
      .from('dusun')
      .update(stats)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};