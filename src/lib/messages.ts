import { supabase, Message, isSupabaseConfigured } from './supabase';

// Fetch all messages ordered by creation date (newest first)
export async function getMessages(): Promise<Message[]> {
  // If Supabase is not configured, return mock data
  if (!isSupabaseConfigured()) {
    console.warn(
      'Supabase not configured. Using mock data. Please set up your Supabase credentials in .env.local'
    );
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data || [];
}

// Add a new message
export async function addMessage(message: string): Promise<Message> {
  // If Supabase is not configured, simulate adding to mock data
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured. Message not saved to database.');
    const newMessage: Message = {
      id: Date.now(), // Use timestamp as ID for mock
      message,
      created_at: new Date().toISOString(),
    };
    return newMessage;
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ message }])
    .select()
    .single();

  if (error) {
    console.error('Error adding message:', error);
    throw error;
  }

  return data;
}
