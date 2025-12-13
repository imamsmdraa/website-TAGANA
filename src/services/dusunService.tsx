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

export interface DusunWithBencana {
  id: number;
  nama: string;
  bencana: {
    id: string;
    jenis_bencana: string;
    level_resiko: 'none' | 'low' | 'medium' | 'high';
    deskripsi: string;
    icon: string;
  }[];
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

  getAllNames: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select('id, nama')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data as { id: number; nama: string }[];
  },

  getAllWithBencana: async () => {
    const { data, error } = await supabase
      .from('dusun')
      .select(`
        id,
        nama,
        bencana (
          id,
          jenis_bencana,
          level_resiko,
          deskripsi,
          icon
        )
      `)
      .order('id', { ascending: true });

    if (error) throw error;
    return data as DusunWithBencana[];
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