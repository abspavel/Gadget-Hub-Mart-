-- ========================================================
-- GADGET HUB MART - SUPABASE SQL SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- ========================================================

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric not null,
  original_price numeric,
  rating numeric default 4.8,
  review_count integer default 10,
  image_type text,
  image_url text,
  badge text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CATEGORIES TABLE
create table if not exists public.categories (
  id text primary key,
  name text not null,
  image_url text,
  product_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS TABLE
create table if not exists public.orders (
  id text primary key,
  customer_name text not null,
  phone text not null,
  address text not null,
  items jsonb not null,
  total numeric not null,
  status text default 'Pending',
  courier_status text default 'Not Dispatched',
  fraud_risk text default 'Low Risk (Verified)',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. INCOMPLETE ORDERS TABLE (Abandoned Checkouts)
create table if not exists public.incomplete_orders (
  id text primary key,
  phone text not null,
  customer_name text,
  address text,
  cart_summary text,
  total numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. BANNERS TABLE (Hero & Offer Banners)
create table if not exists public.banners (
  id text primary key,
  title text not null,
  image_url text not null,
  type text not null, -- 'main' or 'offer'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. COUPONS TABLE
create table if not exists public.coupons (
  id text primary key,
  code text not null unique,
  discount_percentage numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. SUBSCRIBERS TABLE
create table if not exists public.subscribers (
  id text primary key default gen_random_uuid()::text,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. CUSTOMERS TABLE
create table if not exists public.customers (
  id text primary key,
  name text not null,
  phone text not null,
  email text,
  total_orders integer default 0,
  total_spent numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) & Public Access Policies for Prototyping
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.incomplete_orders enable row level security;
alter table public.banners enable row level security;
alter table public.coupons enable row level security;
alter table public.subscribers enable row level security;
alter table public.customers enable row level security;

create policy "Allow public read/write on products" on public.products for all using (true) with check (true);
create policy "Allow public read/write on categories" on public.categories for all using (true) with check (true);
create policy "Allow public read/write on orders" on public.orders for all using (true) with check (true);
create policy "Allow public read/write on incomplete_orders" on public.incomplete_orders for all using (true) with check (true);
create policy "Allow public read/write on banners" on public.banners for all using (true) with check (true);
create policy "Allow public read/write on coupons" on public.coupons for all using (true) with check (true);
create policy "Allow public read/write on subscribers" on public.subscribers for all using (true) with check (true);
create policy "Allow public read/write on customers" on public.customers for all using (true) with check (true);
