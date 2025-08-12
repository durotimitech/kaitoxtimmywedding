-- Create dietary_restrictions table
CREATE TABLE IF NOT EXISTS dietary_restrictions (
  id BIGSERIAL PRIMARY KEY,
  rsvp_id BIGINT NOT NULL,
  restrictions TEXT[] DEFAULT '{}',
  additional_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Foreign key constraint
  CONSTRAINT fk_rsvp
    FOREIGN KEY (rsvp_id) 
    REFERENCES rsvps(id)
    ON DELETE CASCADE,
    
  -- Ensure one dietary restriction per RSVP
  CONSTRAINT unique_rsvp_dietary
    UNIQUE (rsvp_id)
);

-- Create index for faster lookups
CREATE INDEX idx_dietary_restrictions_rsvp_id ON dietary_restrictions(rsvp_id);

-- Enable Row Level Security
ALTER TABLE dietary_restrictions ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_dietary_restrictions_updated_at
  BEFORE UPDATE ON dietary_restrictions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();