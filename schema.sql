create table if not exists public.sensor_data (
  id bigint generated always as identity primary key,
  device_id text not null,
  temperature double precision not null,
  humidity double precision not null,
  gas double precision not null,
  created_at timestamptz not null default now()
);

alter table public.sensor_data
add column if not exists gas double precision not null default 0;
