-- Add attending column to rsvps table
ALTER TABLE rsvps 
ADD COLUMN IF NOT EXISTS attending BOOLEAN DEFAULT TRUE;

-- Add comment to explain the column
COMMENT ON COLUMN rsvps.attending IS 'Whether the guest is attending the wedding';

-- Create an index on attending for better performance when filtering
CREATE INDEX IF NOT EXISTS rsvps_attending_idx ON rsvps (attending);