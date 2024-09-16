import { supabase } from '@/services/supabase';

export async function createLevel() {
  const res = await supabase
    .from('level')
    .insert({ updated_at: new Date() })
    .select();
  return res;
}

export async function getLevels() {
  const res = await supabase.from('level').select(`
    *,
    class (*)
  `);
  return res;
}

export async function getLevel(id: number) {
  const res = await supabase
    .from('level')
    .select(
      `
    *,
    class ( *, class_challenge (*) ),
    level_participants ( *, users (*) )
    level_cover ( * )
  `
    )
    .eq('id', id)
    .order('id', { referencedTable: 'class', ascending: true });
  return res;
}

export async function getUsers(term: string) {
  const res = await supabase
    .from('users')
    .select('*')
    .ilike('email', `%${term}%`)
    .limit(5);

  return res;
}

export async function addUsersToLevel(obj: any) {
  const { data, error } = await supabase
    .from('level_participants')
    .insert(obj)
    .select();

  return data;
}

export async function updateLevel(cols: any, levelId: number) {
  const res = await supabase
    .from('level')
    .update(cols)
    .eq('id', levelId)
    .select();

  return res;
}
