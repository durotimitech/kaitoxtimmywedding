-- Add table and seat columns to rsvps table
ALTER TABLE rsvps 
ADD COLUMN IF NOT EXISTS "table" INTEGER,
ADD COLUMN IF NOT EXISTS seat INTEGER;

-- Create an index on table for better performance when grouping by table
CREATE INDEX IF NOT EXISTS rsvps_table_idx ON rsvps ("table");

-- Create an index on seat for better performance when ordering by seat
CREATE INDEX IF NOT EXISTS rsvps_seat_idx ON rsvps (seat); 