-- Create the rsvps table
CREATE TABLE IF NOT EXISTS rsvps (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert rsvps
CREATE POLICY "Anyone can insert rsvps" ON rsvps
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to read rsvps (optional - remove if you want to keep them private)
CREATE POLICY "Anyone can view rsvps" ON rsvps
  FOR SELECT USING (true);

-- Create an index on created_at for better performance when ordering by date
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at DESC);

-- Create an index on email for better performance when checking for duplicates
CREATE INDEX IF NOT EXISTS rsvps_email_idx ON rsvps (email); 