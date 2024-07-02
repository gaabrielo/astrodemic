import { supabase } from '@/services/supabase';

export async function getUserById(userId: any) {
  const res = await supabase.from('users').select('*').eq('id', userId);

  return res;
}

export async function editUser(userId: string, cols: any) {
  const res = await supabase
    .from('users')
    .update(cols)
    .eq('id', userId)
    .select();

  return res;
}
