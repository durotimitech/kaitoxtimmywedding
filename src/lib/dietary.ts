import { supabase, isSupabaseConfigured } from './supabase';

export interface DietaryData {
  restrictions: string[];
  additional_notes?: string;
}

export interface DietaryRestrictions {
  id: number;
  rsvp_id: number;
  restrictions: string[];
  additional_notes: string | null;
  created_at: string;
  updated_at: string;
}

export const COMMON_DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut Allergy',
  'Shellfish Allergy',
  'Kosher',
  'Halal',
  'No Pork',
  'No Beef',
  'Low Sodium',
  'Diabetic Friendly',
];

export async function saveDietaryRestrictions(
  credentials: {
    first_name: string;
    last_name: string;
    email: string;
  },
  dietaryData: DietaryData
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

    // Check if dietary restrictions already exist for this RSVP
    const { data: existingDietary, error: checkError } = await supabase
      .from('dietary_restrictions')
      .select('id')
      .eq('rsvp_id', matchedRsvp.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error(
        'Error checking existing dietary restrictions:',
        checkError
      );
      throw new Error('Failed to check existing dietary restrictions.');
    }

    // Prepare the data
    const dataToSave = {
      rsvp_id: matchedRsvp.id,
      restrictions: dietaryData.restrictions || [],
      additional_notes: dietaryData.additional_notes || null,
    };

    if (existingDietary) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('dietary_restrictions')
        .update(dataToSave)
        .eq('id', existingDietary.id);

      if (updateError) {
        console.error('Error updating dietary restrictions:', updateError);
        throw new Error('Failed to update dietary restrictions.');
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabase
        .from('dietary_restrictions')
        .insert([dataToSave]);

      if (insertError) {
        console.error('Error inserting dietary restrictions:', insertError);
        throw new Error('Failed to save dietary restrictions.');
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving dietary restrictions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Something went wrong.',
    };
  }
}

export async function getDietaryRestrictions(
  rsvpId: number
): Promise<DietaryRestrictions | null> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      'Supabase is not configured. Please check your environment variables.'
    );
  }

  const { data, error } = await supabase
    .from('dietary_restrictions')
    .select('*')
    .eq('rsvp_id', rsvpId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No record found
      return null;
    }
    console.error('Error fetching dietary restrictions:', error);
    throw new Error('Failed to fetch dietary restrictions.');
  }

  return data;
}
