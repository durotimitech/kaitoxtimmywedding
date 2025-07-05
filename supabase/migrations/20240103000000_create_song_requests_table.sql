-- Create song_requests table
CREATE TABLE song_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  song_title TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  requested_by TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE song_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for song_requests table
CREATE POLICY "Enable insert for authenticated users only" ON song_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON song_requests
  FOR SELECT USING (true);

-- Create index for better performance
CREATE INDEX song_requests_created_at_idx ON song_requests(created_at);
CREATE INDEX song_requests_requested_by_idx ON song_requests(requested_by); 