-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Optional: Add message and created_at columns if they don't exist
-- Run these commands if you want to track messages and timestamps
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS message TEXT;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

-- Optional: Create an index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
