-- First Dose Supabase setup
-- Run this file in the Supabase SQL Editor before testing real submissions.

-- This extension gives us `gen_random_uuid()` for primary keys.
create extension if not exists pgcrypto;

-- Each row represents one intake submission from the public landing page.
create table if not exists public.genetic_submissions (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  phone text not null,
  medication_focus text,
  notes text,
  raw_file_path text not null,
  raw_file_name text not null,
  raw_file_size_bytes integer not null check (raw_file_size_bytes > 0),
  consent_to_review boolean not null default false,
  source text not null default 'first-dose-landing-page',
  status text not null default 'new',
  created_at timestamptz not null default now(),

  -- These constraints make sure the browser cannot save obviously broken intake data.
  constraint genetic_submissions_email_format check (position('@' in email) > 1),
  constraint genetic_submissions_phone_length check (char_length(phone) >= 7),
  constraint genetic_submissions_consent_required check (consent_to_review = true)
);

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
  and raw_file_path is not null
);

-- Create a private storage bucket for raw genetic text files.
-- Private means files are not publicly downloadable by URL.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'raw-genetic-files',
  'raw-genetic-files',
  false,
  10485760,
  array['text/plain']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Dropping first makes this setup file safe to rerun while you are developing.
drop policy if exists "Allow public raw data uploads" on storage.objects;

-- Anonymous visitors can upload new files into the intake folder only.
create policy "Allow public raw data uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'raw-genetic-files'
  and name like 'incoming/%'
);

-- No public read policy is added on purpose.
-- Team access should happen through the Supabase dashboard, service role code, or a protected admin tool.
