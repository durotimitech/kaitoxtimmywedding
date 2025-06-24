# Supabase Setup Guide

This guide will help you set up Supabase for your wedding website to store and manage guest messages.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: Wedding Website Messages
   - **Database Password**: Choose a strong password
   - **Region**: Choose the region closest to your users
5. Click "Create new project"

## Step 2: Get Your Project Credentials

1. Once your project is created, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **Anon public key** (under "Project API keys")

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.local.example`)
2. Replace the placeholder values with your actual Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase/schema.sql`
3. Click "Run" to execute the SQL

This will create:

- A `messages` table with `id`, `message`, and `created_at` columns
- Row Level Security policies to allow public read/write access
- An index for better performance

## Step 5: Test the Setup

1. Start your development server: `npm run dev`
2. Try submitting a message through your website
3. Check the **Table Editor** in Supabase to see if the message was saved

## Database Schema

```sql
CREATE TABLE messages (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

## Security Notes

- The current setup allows anyone to read and write messages (suitable for a public guestbook)
- Row Level Security (RLS) is enabled for future customization
- Consider adding rate limiting in production to prevent spam

## Real-time Features

The setup includes real-time subscriptions, so new messages will appear automatically without page refresh.

## Troubleshooting

- Make sure your environment variables are correctly set
- Verify that RLS policies are properly configured
- Check the browser console for any error messages
- Ensure your Supabase project is not paused (free tier projects pause after inactivity)
