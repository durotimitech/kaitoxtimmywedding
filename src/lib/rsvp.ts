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

export async function updateAttendanceStatus(
  credentials: {
    first_name: string;
    last_name: string;
    email: string;
  },
  attending: boolean
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  try {
    // Get all RSVPs to check against
    const { data: rsvps, error: fetchError } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching RSVPs:', fetchError);
      throw new Error('Failed to fetch RSVPs.');
    }

    if (!rsvps || rsvps.length === 0) {
      return { success: false, error: 'No RSVP found.' };
    }

    // Normalize input credentials
    const normalizedInput = {
      first_name: credentials.first_name.trim().toLowerCase(),
      last_name: credentials.last_name.trim().toLowerCase(),
      email: credentials.email.trim().toLowerCase(),
    };

    // Find matching RSVP using 2/3 logic
    let matchedRsvp = null;

    for (const rsvp of rsvps) {
      // Skip records with missing required fields
      if (!rsvp.first_name || !rsvp.last_name || !rsvp.email) {
        continue;
      }

      const normalizedRsvp = {
        first_name: rsvp.first_name.trim().toLowerCase(),
        last_name: rsvp.last_name.trim().toLowerCase(),
        email: rsvp.email.trim().toLowerCase(),
      };

      let matches = 0;

      // Count matches
      if (normalizedInput.first_name === normalizedRsvp.first_name) matches++;
      if (normalizedInput.last_name === normalizedRsvp.last_name) matches++;
      if (normalizedInput.email === normalizedRsvp.email) matches++;

      // If 2 or more fields match, we found the RSVP
      if (matches >= 2) {
        matchedRsvp = rsvp;
        break;
      }
    }

    if (!matchedRsvp) {
      return { success: false, error: 'No matching RSVP found.' };
    }

    // Update the attending status
    const { error: updateError } = await supabase
      .from('rsvps')
      .update({ attending })
      .eq('id', matchedRsvp.id);

    if (updateError) {
      console.error('Error updating attendance:', updateError);
      throw new Error('Failed to update attendance status.');
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating attendance status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong.',
    };
  }
}
