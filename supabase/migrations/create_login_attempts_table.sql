-- Create login_attempts table to track all login attempts
CREATE TABLE IF NOT EXISTS public.login_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    success BOOLEAN NOT NULL DEFAULT false,
    matched_fields INTEGER NOT NULL DEFAULT 0,
    ip_address TEXT,
    user_agent TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index on created_at for efficient querying of recent attempts
CREATE INDEX idx_login_attempts_created_at ON public.login_attempts(created_at DESC);

-- Add index on email for quick lookups by email
CREATE INDEX idx_login_attempts_email ON public.login_attempts(email);

-- Add index on success for filtering successful/failed attempts
CREATE INDEX idx_login_attempts_success ON public.login_attempts(success);

-- Enable RLS (Row Level Security)
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert login attempts
CREATE POLICY "Service role can insert login attempts" ON public.login_attempts
    FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Create policy to allow service role to read login attempts
CREATE POLICY "Service role can read login attempts" ON public.login_attempts
    FOR SELECT
    TO service_role
    USING (true);

-- Add comment to table
COMMENT ON TABLE public.login_attempts IS 'Tracks all login attempts to the protected area, both successful and failed';