import { supabase } from '@/lib/supabase';

export interface BencanaDB {
  id: string;
  dusun_id: number;
  jenis_bencana: string;
  level_resiko: 'none' | 'low' | 'medium' | 'high';
  deskripsi: string;
  icon: string;
}

export const bencanaService = {
  getByDusunId: async (dusunId: number) => {
    const { data, error } = await supabase
      .from('bencana')
      .select('*')
      .eq('dusun_id', dusunId);
    
    if (error) throw error;
    return data as BencanaDB[];
  },

  create: async (payload: Omit<BencanaDB, 'id'>) => {
    const { data, error } = await supabase
      .from('bencana')
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('bencana')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  update: async (id: string, payload: any) => {
    const { data, error } = await supabase
      .from('bencana')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};