-- Create the messages table
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read messages
CREATE POLICY "Anyone can view messages" ON messages
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert messages
CREATE POLICY "Anyone can insert messages" ON messages
  FOR INSERT WITH CHECK (true);

-- Create an index on created_at for better performance when ordering by date
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC); 