import { supabase, isSupabaseConfigured, RSVP } from './supabase';

export interface RSVPData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export async function addRSVP(data: RSVPData): Promise<RSVP> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  const { data: rsvp, error } = await supabase
    .from('rsvps')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error adding RSVP:', error);
    throw new Error('Failed to submit RSVP. Please try again.');
  }

  return rsvp;
}

export async function getRSVPs(): Promise<RSVP[]> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  const { data: rsvps, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching RSVPs:', error);
    throw new Error('Failed to fetch RSVPs.');
  }

  return rsvps || [];
}

export async function checkEmailExists(email: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  const { data, error } = await supabase
    .from('rsvps')
    .select('email')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking email:', error);
    return false;
  }

  return !!data;
}
