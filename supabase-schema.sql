-- ==============================================================================
-- GADGET HUB MART - 100% BULLETPROOF SUPABASE DATABASE SCHEMA & FIX
-- ==============================================================================
-- This script safely resolves all NOT NULL constraint conflicts, pre-existing
-- table differences, and grants full RLS permissions.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. CREATE TABLES (IF NOT EXIST)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.incomplete_orders (
    id TEXT PRIMARY KEY,
    phone TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.coupons (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    thana TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.steadfast_settings (
    id TEXT PRIMARY KEY DEFAULT 'config',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 3. ENSURE ALL COLUMNS EXIST (ADD COLUMN IF NOT EXISTS)
-- ==============================================================================

-- Banners Table
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS subtitle TEXT;
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'main';
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS link_section TEXT;
ALTER TABLE public.banners ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Products Table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS original_price NUMERIC;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock_count INTEGER DEFAULT 50;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 4.9;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 15;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS colors JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS full_description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT '১ বছরের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_best_seller BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_new_arrival BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_bundle BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_travel BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '["All Products"]'::jsonb;

-- Categories Table
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Orders Table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS thana TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivery_zone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'ক্যাশ অন ডেলিভারি';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS steadfast_tracking_code TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS steadfast_consignment_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS steadfast_status TEXT;

-- Incomplete Orders
ALTER TABLE public.incomplete_orders ADD COLUMN IF NOT EXISTS customer_name TEXT;
ALTER TABLE public.incomplete_orders ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.incomplete_orders ADD COLUMN IF NOT EXISTS cart_summary TEXT;
ALTER TABLE public.incomplete_orders ADD COLUMN IF NOT EXISTS total NUMERIC;
ALTER TABLE public.incomplete_orders ADD COLUMN IF NOT EXISTS date TEXT;

-- Coupons Table
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS discount_type TEXT DEFAULT 'percentage';
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS discount_percentage NUMERIC DEFAULT 0;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS discount_amount NUMERIC DEFAULT 0;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS min_order_amount NUMERIC DEFAULT 0;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS usage_count INTEGER DEFAULT 0;

-- Subscribers
ALTER TABLE public.subscribers ADD COLUMN IF NOT EXISTS date TEXT;

-- Steadfast Settings
ALTER TABLE public.steadfast_settings ADD COLUMN IF NOT EXISTS api_key TEXT;
ALTER TABLE public.steadfast_settings ADD COLUMN IF NOT EXISTS secret_key TEXT;
ALTER TABLE public.steadfast_settings ADD COLUMN IF NOT EXISTS base_url TEXT DEFAULT 'https://portal.steadfast.com.bd/api/v1';
ALTER TABLE public.steadfast_settings ADD COLUMN IF NOT EXISTS is_connected BOOLEAN DEFAULT false;
ALTER TABLE public.steadfast_settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- ==============================================================================
-- 4. REMOVE STRICT NOT-NULL CONSTRAINTS (SOLVES ERROR 23502)
-- ==============================================================================
-- Drop NOT NULL constraints on optional fields so fixed coupons or products 
-- without original price never violate any database constraint.
ALTER TABLE public.coupons ALTER COLUMN discount_percentage DROP NOT NULL;
ALTER TABLE public.coupons ALTER COLUMN discount_amount DROP NOT NULL;
ALTER TABLE public.banners ALTER COLUMN subtitle DROP NOT NULL;
ALTER TABLE public.banners ALTER COLUMN link_section DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN original_price DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN short_description DROP NOT NULL;
ALTER TABLE public.products ALTER COLUMN full_description DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN thana DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN city DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN delivery_zone DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN steadfast_tracking_code DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN steadfast_consignment_id DROP NOT NULL;
ALTER TABLE public.orders ALTER COLUMN steadfast_status DROP NOT NULL;

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incomplete_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.steadfast_settings ENABLE ROW LEVEL SECURITY;

-- Products Policy
DROP POLICY IF EXISTS "Public Full Access on products" ON public.products;
CREATE POLICY "Public Full Access on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- Categories Policy
DROP POLICY IF EXISTS "Public Full Access on categories" ON public.categories;
CREATE POLICY "Public Full Access on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- Orders Policy
DROP POLICY IF EXISTS "Public Full Access on orders" ON public.orders;
CREATE POLICY "Public Full Access on orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- Incomplete Orders Policy
DROP POLICY IF EXISTS "Public Full Access on incomplete_orders" ON public.incomplete_orders;
CREATE POLICY "Public Full Access on incomplete_orders" ON public.incomplete_orders FOR ALL USING (true) WITH CHECK (true);

-- Banners Policy
DROP POLICY IF EXISTS "Public Full Access on banners" ON public.banners;
CREATE POLICY "Public Full Access on banners" ON public.banners FOR ALL USING (true) WITH CHECK (true);

-- Coupons Policy
DROP POLICY IF EXISTS "Public Full Access on coupons" ON public.coupons;
CREATE POLICY "Public Full Access on coupons" ON public.coupons FOR ALL USING (true) WITH CHECK (true);

-- Subscribers Policy
DROP POLICY IF EXISTS "Public Full Access on subscribers" ON public.subscribers;
CREATE POLICY "Public Full Access on subscribers" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);

-- Steadfast Settings Policy
DROP POLICY IF EXISTS "Public Full Access on steadfast_settings" ON public.steadfast_settings;
CREATE POLICY "Public Full Access on steadfast_settings" ON public.steadfast_settings FOR ALL USING (true) WITH CHECK (true);

-- Customers Policy
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Full Access on customers" ON public.customers;
CREATE POLICY "Public Full Access on customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 6. INITIAL SEED DATA (SAFE UPSERTS)
-- ==============================================================================

-- Categories
INSERT INTO public.categories (id, label, description, image_url)
VALUES 
    ('charging', 'Charging', 'High-speed chargers & power banks', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80'),
    ('cables', 'Cables', 'Braided fast-charging USB cables', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'),
    ('audio', 'Audio', 'Earphones, headphones & speakers', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'),
    ('cases', 'Cases & Protection', 'Drop-proof covers & screen guards', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80'),
    ('mounts', 'Mounts & Holders', 'Car mounts & desktop docks', 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80'),
    ('adapters', 'Adapters & Hubs', 'Multiport USB-C OTG adapters', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80')
ON CONFLICT (id) DO NOTHING;

-- Hero Banners
INSERT INTO public.banners (id, title, subtitle, image_url, type, is_active)
VALUES
    ('banner-1', 'Next-Gen GaN Fast Chargers', 'Experience up to 65W charging speeds for phones & laptops', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80', 'main', true),
    ('banner-2', 'Flash Sale - Premium Audio Gear', 'Up to 30% Off on Wireless Headphones', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1600&q=80', 'offer', true)
ON CONFLICT (id) DO NOTHING;

-- Coupons (Safe numeric values for both percentage & fixed discounts)
INSERT INTO public.coupons (id, code, discount_type, discount_percentage, discount_amount, min_order_amount, is_active)
VALUES 
    ('cp-1', 'EID10', 'percentage', 10, 0, 500, true),
    ('cp-2', 'GADGET20', 'percentage', 20, 0, 1500, true),
    ('cp-3', 'SAVE100', 'fixed', 0, 100, 1000, true)
ON CONFLICT (code) DO NOTHING;
