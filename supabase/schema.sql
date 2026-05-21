-- First Dose Supabase setup
-- Run this file in the Supabase SQL Editor before testing real submissions.

-- This extension gives us `gen_random_uuid()` for primary keys.
create extension if not exists pgcrypto;

-- Each row represents one intake submission from the public site.
create table if not exists public.genetic_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text not null,
  medication_focus text,
  notes text,
  raw_file_path text,
  raw_file_name text,
  raw_file_size_bytes integer check (raw_file_size_bytes is null or raw_file_size_bytes > 0),
  consent_to_review boolean not null default false,
  source text not null default 'first-dose-landing-page',
  status text not null default 'new',
  created_at timestamptz not null default now(),

  -- These constraints make sure the browser cannot save obviously broken intake data.
  constraint genetic_submissions_email_format check (position('@' in email) > 1),
  constraint genetic_submissions_phone_length check (char_length(phone) >= 7),
  constraint genetic_submissions_consent_required check (consent_to_review = true)
);

-- If you already ran an older file-upload version of this schema, these lines make those
-- old columns optional so the new contact-only intake can still insert rows.
alter table public.genetic_submissions
  alter column raw_file_path drop not null,
  alter column raw_file_name drop not null,
  alter column raw_file_size_bytes drop not null;

-- Row Level Security keeps the table protected even though the browser uses the public anon key.
alter table public.genetic_submissions enable row level security;

-- Dropping first makes this setup file safe to rerun while you are developing.
drop policy if exists "Allow public intake inserts" on public.genetic_submissions;

-- Anonymous visitors can create an intake request, but they cannot read submissions back.
create policy "Allow public intake inserts"
on public.genetic_submissions
for insert
to anon
with check (
  consent_to_review = true
  and email is not null
  and phone is not null
);
