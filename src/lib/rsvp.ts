import { supabase, isSupabaseConfigured, RSVP } from './supabase';

export interface RSVPData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  attending?: boolean;
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

export async function getSeatingChart(): Promise<{
  [tableNumber: number]: RSVP[];
}> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  const { data: rsvps, error } = await supabase
    .from('rsvps')
    .select('*')
    .not('table', 'is', null)
    .not('seat', 'is', null)
    .order('table', { ascending: true })
    .order('seat', { ascending: true });

  if (error) {
    console.error('Error fetching seating chart:', error);
    throw new Error('Failed to fetch seating chart.');
  }

  // Group RSVPs by table
  const seatingChart: { [tableNumber: number]: RSVP[] } = {};

  rsvps?.forEach(rsvp => {
    if (rsvp.table) {
      if (!seatingChart[rsvp.table]) {
        seatingChart[rsvp.table] = [];
      }
      seatingChart[rsvp.table].push(rsvp);
    }
  });

  return seatingChart;
}

export async function updateRSVPSeating(
  rsvpId: number,
  table: number | null,
  seat: number | null
): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  const { error } = await supabase
    .from('rsvps')
    .update({ table, seat })
    .eq('id', rsvpId);

  if (error) {
    console.error('Error updating RSVP seating:', error);
    throw new Error('Failed to update RSVP seating.');
  }
}
