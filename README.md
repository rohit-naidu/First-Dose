# First Dose

First Dose is a Next.js intake page for collecting contact information and medication context for
pharmacogenomic review.

## What The App Does

- Presents First Dose as a professional genetics-backed medication response product.
- Collects email and phone number as required contact fields.
- Collects optional name, medication target, and notes.
- Saves the intake submission to a Supabase Postgres table.

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
2. The app validates email, phone, and consent.
3. The app inserts a row into `genetic_submissions` with contact details and context.

## Next.js Supabase Files

- `utils/supabase/client.ts` creates the browser Supabase client used by the intake form.
- `utils/supabase/server.ts` creates a server Supabase client for future Server Components.
- `utils/supabase/middleware.ts` refreshes Supabase auth sessions on page requests.
- `proxy.ts` connects the Supabase middleware helper to Next.js routing.

## Important Privacy Notes

Medication and health context can be sensitive. Before launching publicly, the next best steps are:

- Add a real privacy policy and consent language reviewed by a qualified professional.
- Add bot protection or move submissions behind a Supabase Edge Function.
- Add an authenticated admin view instead of reading submissions directly from the dashboard.
- Decide whether you need HIPAA-specific infrastructure and agreements before handling protected
  health information.
