import { supabase } from '@/services/supabase';

export async function getAllLevels(term: string) {
  let res;

  if (isNaN(Number(term))) {
    res = await supabase
      .from('level')
      .select('*, class (*), user:user_id (*)')
      .ilike('name', `%${term}%`)
      .limit(15);
  } else {
    res = await supabase
      .from('level')
      .select('*, class (*)')
      .ilike('id', `%${term}%`)
      .limit(15);
  }

  return res;
}

export async function getLevelByAuthorId(userId: any) {
  const res = await supabase
    .from('level')
    .select('*, class (*)')
    .eq('user_id', userId);

  if (!res.error) res.data?.reverse();

  return res;
}

export async function getLevelsThatUserIsSigned(userId: any) {
  let res;

  res = await supabase
    .from('level_participants')
    .select(
      `
      *,
      level ( * )
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return res;
}

export async function getRecentUsersSignedToAuthorLevels(userId: any) {
  const res = await supabase
    .from('level_participants')
    .select(
      `
      *,
      users:user_id (*),
      level!inner(*)
    `
    )
    .eq('level.user_id', [userId])
    .order('created_at', { ascending: false })
    .limit(10);

  return res;
}

export async function getAllPublicLevels() {
  const res = await supabase
    .from('level')
    .select('*, class (*)')
    .eq('is_public', true)
    .limit(15);

  return res;
}

export async function deleteUserFromLeveById(levelId: string, userId: string) {
  const res = await supabase
    .from('level_participants')
    .delete()
    .eq('level_id', levelId)
    .eq('user_id', userId);

  return res;
}
