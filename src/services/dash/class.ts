import { supabase } from '@/services/supabase';

export async function createClass(data: any) {
  return await supabase.from('class').insert([data]).select();
}

export async function createClassChallenges(challenges: any) {
  return await supabase.from('class_challenge').insert(challenges).select();
}
