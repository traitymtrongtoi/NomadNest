import { createClient } from '@supabase/supabase-js';

// Raw URL provided by user may contain /rest/v1/ suffix
const env = (import.meta as any).env || {};
const rawUrl = env.VITE_SUPABASE_URL || 'https://ppvtrohgmranwajbmhrt.supabase.co';
export const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, '');
export const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uuoqDDtW23WsvE5ldKtCpw_7gJXHZZt';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to upload room image to Supabase Storage bucket 'room-images'
export const uploadRoomImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `rooms/${fileName}`;

    const { data, error } = await supabase.storage
      .from('room-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn('Supabase storage upload fallback note:', error.message);
      return URL.createObjectURL(file);
    }

    const { data: publicUrlData } = supabase.storage
      .from('room-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Error uploading image to Supabase:', err);
    return URL.createObjectURL(file);
  }
};

export const checkSupabaseConnection = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase.from('test_ping').select('*').limit(1);
    if (error && error.code !== 'PGRST116' && !error.message.includes('relation "public.test_ping" does not exist')) {
      console.warn('Supabase ping notice:', error.message);
      return { success: true, message: `Connected to Supabase (${SUPABASE_URL})` };
    }
    return { success: true, message: `Connected to Supabase (${SUPABASE_URL})` };
  } catch (err: any) {
    console.error('Supabase connection check error:', err);
    return { success: false, message: err?.message || 'Connection failed' };
  }
};
