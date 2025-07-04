import { supabase, isSupabaseConfigured } from './supabase';

export interface AuthCredentials {
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthUser {
  first_name: string;
  last_name: string;
  email: string;
  authenticated_at: string;
}

const AUTH_STORAGE_KEY = 'wedding_auth_user';

export class AuthService {
  // Check if user is already authenticated from localStorage
  static getAuthenticatedUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;

      const user: AuthUser = JSON.parse(stored);
      // Verify the stored data is valid
      if (
        user.first_name &&
        user.last_name &&
        user.email &&
        user.authenticated_at
      ) {
        return user;
      }

      // Clear invalid data
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    } catch (error) {
      console.error('Error reading auth data:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  }

  // Store authenticated user in localStorage
  static setAuthenticatedUser(user: AuthUser): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  }

  // Clear authentication
  static clearAuthentication(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  // Verify credentials against RSVP table with 2/3 matching logic
  static async verifyCredentials(
    credentials: AuthCredentials
  ): Promise<{ success: boolean; user?: AuthUser }> {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured.');
    }

    try {
      // Get all RSVPs to check against
      const { data: rsvps, error } = await supabase
        .from('rsvps')
        .select('first_name, last_name, email')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching RSVPs:', error);
        throw new Error('Failed to verify credentials.');
      }

      if (!rsvps || rsvps.length === 0) {
        return { success: false };
      }

      // Validate input credentials
      if (
        !credentials.first_name ||
        !credentials.last_name ||
        !credentials.email
      ) {
        return { success: false };
      }

      // Normalize input credentials
      const normalizedInput = {
        first_name: credentials.first_name.trim().toLowerCase(),
        last_name: credentials.last_name.trim().toLowerCase(),
        email: credentials.email.trim().toLowerCase(),
      };

      // Check each RSVP record for 2/3 match
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

        // If 2 or more fields match, authentication succeeds
        if (matches >= 2) {
          const authenticatedUser: AuthUser = {
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            email: credentials.email,
            authenticated_at: new Date().toISOString(),
          };

          this.setAuthenticatedUser(authenticatedUser);
          return { success: true, user: authenticatedUser };
        }
      }

      // No match found
      return { success: false };
    } catch (error) {
      console.error('Error verifying credentials:', error);
      throw error;
    }
  }
}
