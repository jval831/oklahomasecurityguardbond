-- Sooner Notary Bond - run once in the shared notary Supabase project's SQL Editor.
-- The project also holds Bluegrass's tables, so every table here is named for
-- this site: Oklahoma leads and SMS consents never mix with another brand's.

create table if not exists sol_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  user_message text not null,
  bot_reply text,
  intent_tags text[],
  user_email text,
  user_phone text,
  input_tokens integer,
  output_tokens integer,
  created_at timestamptz default now()
);

create table if not exists sooner_crosssell_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  interests text[] not null,
  source text default 'while-youre-here-form',
  created_at timestamptz default now()
);

create table if not exists sooner_sms_optins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  consent boolean not null,
  consent_text text,
  consent_version text,
  double_optin_status text default 'pending',
  source text,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

alter table sol_conversations enable row level security;
alter table sooner_crosssell_leads enable row level security;
alter table sooner_sms_optins enable row level security;
-- Service role bypasses RLS; no public policies needed.
