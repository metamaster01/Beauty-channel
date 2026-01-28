
# Supabase Backend Architecture – Beauty Salon Platform

## Tech Stack
- Frontend: Next.js (App Router)
- Backend: Supabase (PostgreSQL + Auth + RLS + Storage)
- Payments: Razorpay

---

## Roles
- super_admin
- admin
- employee
- user

Roles are stored in `profiles.role` and enforced via RLS.

---

## AUTH & PROFILES

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text check (role in ('super_admin','admin','employee','user')) default 'user',
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;
```

---

## SERVICE CATEGORIES

```sql
create table service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  is_active boolean default true
);

alter table service_categories enable row level security;
```

---

## SERVICE SUBCATEGORIES

```sql
create table service_subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references service_categories(id) on delete cascade,
  name text not null,
  slug text not null,
  unique(category_id, slug)
);

alter table service_subcategories enable row level security;
```

---

## SERVICES

```sql
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  category_id uuid references service_categories(id),
  subcategory_id uuid references service_subcategories(id),
  duration_minutes int not null,
  actual_price numeric(10,2),
  discount_price numeric(10,2),
  image text,
  is_active boolean default true
);

alter table services enable row level security;
```

---

## SERVICE BOOKINGS

```sql
create table service_bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  service_id uuid references services(id),
  booking_date date not null,
  time_slot text not null,
  status text check (status in ('pending','confirmed','completed','cancelled')) default 'pending',
  assigned_employee uuid references profiles(id),
  total_amount numeric(10,2),
  payment_status text check (payment_status in ('pending','paid','failed')) default 'pending',
  razorpay_payment_id text,
  notes text,
  created_at timestamp default now()
);

alter table service_bookings enable row level security;
```

---

## PRODUCT CATEGORIES

```sql
create table product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

alter table product_categories enable row level security;
```

---

## PRODUCT SUBCATEGORIES

```sql
create table product_subcategories (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references product_categories(id),
  name text not null,
  slug text not null,
  unique(category_id, slug)
);

alter table product_subcategories enable row level security;
```

---

## PRODUCTS

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category_id uuid references product_categories(id),
  subcategory_id uuid references product_subcategories(id),
  description text,
  actual_price numeric(10,2),
  selling_price numeric(10,2),
  stock int default 0,
  variants jsonb,
  images jsonb,
  is_active boolean default true,
  created_at timestamp default now()
);

alter table products enable row level security;
```

---

## CART ITEMS

```sql
create table cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  quantity int check (quantity > 0),
  variant jsonb,
  created_at timestamp default now(),
  unique(user_id, product_id, variant)
);

alter table cart_items enable row level security;
```

---

## WISHLIST

```sql
create table wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  created_at timestamp default now(),
  unique(user_id, product_id)
);

alter table wishlist enable row level security;
```

---

## ORDERS

```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  total_amount numeric(10,2),
  payment_status text check (payment_status in ('pending','paid','failed')),
  order_status text check (order_status in ('placed','shipped','delivered','cancelled')),
  razorpay_order_id text,
  razorpay_payment_id text,
  address jsonb,
  created_at timestamp default now()
);

alter table orders enable row level security;
```

---

## ORDER ITEMS

```sql
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int,
  price numeric(10,2)
);

alter table order_items enable row level security;
```

---

## REVIEWS

```sql
create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  service_id uuid references services(id),
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamp default now()
);

alter table reviews enable row level security;
```

---

## PROMO CODES

```sql
create table promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_type text check (discount_type in ('flat','percent')),
  discount_value numeric,
  min_order numeric,
  expires_at timestamp,
  is_active boolean default true
);

alter table promo_codes enable row level security;
```

---

## NOTES
- All tables have RLS enabled
- Policies must be applied per role (user/admin/employee/super_admin)
- Razorpay webhooks should update `orders` and `service_bookings`



your-project/
├── lib/
│   └── supabase/
│       ├── client.ts          # Supabase client configuration
│       └── auth.ts             # Auth helper functions
├── app/
│   └── auth/
│       ├── login/
│       │   └── page.tsx       # Login page
│       ├── signup/
│       │   └── page.tsx       # Signup page
│       ├── verify-email/
│       │   └── page.tsx       # OTP verification page
│       ├── forgot-password/
│       │   └── page.tsx       # Forgot password page
│       ├── reset-password/
│       │   └── page.tsx       # Reset password page
│       └── callback/
│           └── route.ts        # OAuth callback handler