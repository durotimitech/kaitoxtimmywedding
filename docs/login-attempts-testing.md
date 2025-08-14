# Login Attempts Testing Guide

## Overview

The login attempt tracking system logs all authentication attempts to the `login_attempts` table in Supabase, capturing both successful and failed login attempts with detailed metadata.

## What Gets Logged

For each login attempt, the following information is recorded:

- **first_name**: The first name entered
- **last_name**: The last name entered
- **email**: The email address entered
- **success**: Whether the login was successful (true/false)
- **matched_fields**: Number of fields that matched (0-3)
- **user_agent**: Browser/device information
- **ip_address**: Client IP (if available)
- **error_message**: Details about why login failed
- **created_at**: Timestamp of the attempt

## Testing Instructions

### 1. Apply Database Migration

First, ensure the `login_attempts` table exists in your Supabase database:

```bash
# Apply the migration to create the table
# This should be done in the Supabase dashboard under SQL Editor
```

### 2. Test Failed Login Attempts

1. Go to the protected page (e.g., `/protected`)
2. Enter incorrect credentials:
   - First Name: "Wrong"
   - Last Name: "Person"
   - Email: "wrong@example.com"
3. Submit the form
4. Check Supabase dashboard - you should see a failed attempt logged with `matched_fields: 0`

### 3. Test Partial Match

1. If you have an RSVP for "John Doe" with email "john@example.com"
2. Try logging in with:
   - First Name: "John"
   - Last Name: "Wrong"
   - Email: "john@example.com"
3. This should fail but log `matched_fields: 2`

### 4. Test Successful Login

1. Enter correct credentials that match at least 2 out of 3 fields
2. Login should succeed
3. Check the `login_attempts` table for a record with `success: true`

### 5. Verify in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Table Editor → `login_attempts`
3. You should see all login attempts with:
   - Timestamps
   - Success/failure status
   - Number of fields matched
   - User agent strings

### 6. Run Test Script (Optional)

```bash
# Install dependencies if needed
npm install @supabase/supabase-js dotenv

# Run the test script
node test-login-attempts.js
```

## Monitoring Login Attempts

You can query login attempts in various ways:

### Recent Failed Attempts

```sql
SELECT * FROM login_attempts
WHERE success = false
ORDER BY created_at DESC
LIMIT 20;
```

### Attempts by Email

```sql
SELECT * FROM login_attempts
WHERE email = 'specific@email.com'
ORDER BY created_at DESC;
```

### Failed Attempts in Last 24 Hours

```sql
SELECT * FROM login_attempts
WHERE success = false
AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

## Security Notes

- The table has RLS (Row Level Security) enabled
- Only the service role can read/write to this table
- No sensitive password data is stored (the app uses a 2/3 field matching system)
- Consider implementing rate limiting based on this data to prevent brute force attempts
