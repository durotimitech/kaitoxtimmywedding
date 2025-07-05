import { supabase } from './supabase';

export interface SongRequest {
  id: string;
  song_title: string;
  artist_name: string;
  requested_by: string;
  created_at: string;
}

export interface SongRequestData {
  song_title: string;
  artist_name: string;
  requested_by: string;
}

/**
 * Add a new song request
 */
export async function addSongRequest(
  songData: SongRequestData
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('song_requests').insert([
      {
        song_title: songData.song_title.trim(),
        artist_name: songData.artist_name.trim(),
        requested_by: songData.requested_by.trim(),
      },
    ]);

    if (error) {
      console.error('Error adding song request:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error adding song request:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Get all song requests
 */
export async function getSongRequests(): Promise<{
  success: boolean;
  data?: SongRequest[];
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('song_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching song requests:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching song requests:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Check if a song has already been requested by title and artist
 */
export async function checkSongExists(
  songTitle: string,
  artistName: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('song_requests')
      .select('id')
      .eq('song_title', songTitle.trim())
      .eq('artist_name', artistName.trim())
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.error('Error checking song exists:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Unexpected error checking song exists:', error);
    return false;
  }
}
