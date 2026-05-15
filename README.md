# First Dose

First Dose is a Next.js landing page for collecting contact information and raw `.txt`
genetic data files for pharmacogenomic intake.

## What The App Does

- Presents First Dose as a professional genetics-backed medication response product.
- Collects email and phone number as required contact fields.
- Accepts a raw genetic data `.txt` file up to 10 MB.
- Uploads the file to a private Supabase Storage bucket.
- Saves the submission metadata to a Supabase Postgres table.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Add your Supabase values to `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

4. Run the database setup in Supabase:

   Open the Supabase SQL Editor and run [`supabase/schema.sql`](supabase/schema.sql).

5. Start the development server:

   ```bash
   npm run dev
   ```

## Supabase Data Flow

The browser uses the Supabase publishable key, so Row Level Security matters.

1. A visitor fills out the intake form.
2. The app validates email, phone, consent, and the `.txt` file.
3. The raw data file uploads to the private `raw-genetic-files` bucket.
4. The app inserts a row into `genetic_submissions` with contact details and the file path.

## Next.js Supabase Files

- `utils/supabase/client.ts` creates the browser Supabase client used by the intake form.
- `utils/supabase/server.ts` creates a server Supabase client for future Server Components.
- `utils/supabase/middleware.ts` refreshes Supabase auth sessions on page requests.
- `proxy.ts` connects the Supabase middleware helper to Next.js routing.

## Important Privacy Notes

Raw genetic data is sensitive. This first version uses a private Supabase Storage bucket and blocks
public reads. Before launching publicly, the next best steps are:

- Add a real privacy policy and consent language reviewed by a qualified professional.
- Add bot protection or move submissions behind a Supabase Edge Function.
- Add an authenticated admin view instead of reading files directly from the dashboard.
- Decide whether you need HIPAA-specific infrastructure and agreements before handling protected
  health information.
