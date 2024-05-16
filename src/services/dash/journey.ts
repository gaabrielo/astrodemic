import { supabase } from '@/services/supabase';

export async function createLevel() {
  const res = await supabase
    .from('level')
    .insert({ updated_at: new Date() })
    .select();
  return res;
}

export async function getLevels() {
  const res = await supabase.from('level').select();
  return res;
}

export async function getLevel(id: number) {
  const res = await supabase.from('level').select().eq('id', id);
  return res;
}
