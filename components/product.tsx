// "use client";

// import React, { useEffect, useMemo, useRef, useState } from "react";

// type Category = "All" | "Mens" | "Womens" | "Skincare" | "Haircare" | "Makeup";

// type Product = {
//   id: string;
//   title: string;
//   category: Exclude<Category, "All">;
//   price: number;
//   oldPrice?: number;
//   image: string;
// };

// const GOLD = "#B08D3C";

// function formatINR(n: number) {
//   return `₹${n}`;
// }

// export default function Products() {
//   const wrapRef = useRef<HTMLDivElement | null>(null);

//   const tabs: Category[] = useMemo(
//     () => ["All", "Mens", "Womens", "Skincare", "Haircare", "Makeup"],
//     []
//   );

//   const products: Product[] = useMemo(
//     () => [
//       {
//         id: "p1",
//         category: "Skincare",
//         title: "Glowé Radiance Serum",
//         price: 400,
//         oldPrice: 790,
//         image: "/products/product1.png",
//       },
//       {
//         id: "p2",
//         category: "Haircare",
//         title: "CrownGloss Hair Serum",
//         price: 400,
//         oldPrice: 790,
//         image: "/products/product2.png",
//       },
//       {
//         id: "p3",
//         category: "Makeup",
//         title: "BlushAura Lip Tint",
//         price: 400,
//         oldPrice: 790,
//         image: "/products/product3.png",
//       },
//     ],
//     []
//   );

//   const [active, setActive] = useState<Category>("Womens");

//   const filtered = useMemo(() => {
//     if (active === "All") return products;
//     if (active === "Womens") return products;
//     if (active === "Mens") return products;
//     return products.filter((p) => p.category === active);
//   }, [active, products]);

//   // Cursor-follow background glow (section)
//   useEffect(() => {
//     const el = wrapRef.current;
//     if (!el) return;

//     const onMove = (e: MouseEvent) => {
//       const rect = el.getBoundingClientRect();
//       const x = ((e.clientX - rect.left) / rect.width) * 100;
//       const y = ((e.clientY - rect.top) / rect.height) * 100;
//       el.style.setProperty("--mx", `${x}%`);
//       el.style.setProperty("--my", `${y}%`);
//     };

//     const onLeave = () => {
//       el.style.setProperty("--mx", `70%`);
//       el.style.setProperty("--my", `20%`);
//     };

//     el.addEventListener("mousemove", onMove, { passive: true });
//     el.addEventListener("mouseleave", onLeave);
//     return () => {
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseleave", onLeave);
//     };
//   }, []);

//   return (
//     <section ref={wrapRef} className="relative w-full overflow-hidden bg-black">
//       <style>{`
//         .prodWrap {
//           --mx: 72%;
//           --my: 18%;
//         }

//         @keyframes prod_shine {
//           0%   { transform: translateX(-120%) skewX(-14deg); opacity: 0; }
//           28%  { opacity: .14; }
//           65%  { opacity: .20; }
//           100% { transform: translateX(120%) skewX(-14deg); opacity: 0; }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .noRM { animation: none !important; transition: none !important; }
//         }
//       `}</style>

//       {/* Background */}
//       <div className="pointer-events-none absolute inset-0 prodWrap">
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(900px 520px at var(--mx) var(--my), rgba(176,141,60,0.35), rgba(0,0,0,0) 55%)",
//           }}
//         />
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(700px 420px at 20% 15%, rgba(255,255,255,0.06), rgba(0,0,0,0) 55%)",
//             opacity: 0.6,
//           }}
//         />
//         <div
//           className="absolute inset-0 opacity-[0.16]"
//           style={{
//             background:
//               "radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.12) 1px, transparent 0)",
//             backgroundSize: "24px 24px",
//           }}
//         />
//         <div className="absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.85)]" />
//       </div>

//       <div className="relative mx-auto max-w-6xl px-5 sm:px-6 py-12 sm:py-14">
//         <div className="flex items-center gap-2 text-white/75 text-xs">
//           <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
//           <span>Our Products</span>
//         </div>

//         <div className="mt-3">
//           <h2 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">
//             Our Beauty Products
//           </h2>
//         </div>

//         <div className="mt-6 flex flex-wrap gap-2">
//           {tabs.map((t) => {
//             const isActive = t === active;
//             return (
//               <button
//                 key={t}
//                 type="button"
//                 onClick={() => setActive(t)}
//                 className={[
//                   "rounded-md px-3 py-1.5 text-[11px] sm:text-xs transition",
//                   "border",
//                   isActive
//                     ? "text-black"
//                     : "text-white/70 hover:text-white/90 hover:bg-white/5",
//                 ].join(" ")}
//                 style={{
//                   borderColor: isActive ? "transparent" : "rgba(255,255,255,0.10)",
//                   backgroundColor: isActive ? GOLD : "rgba(255,255,255,0.06)",
//                 }}
//               >
//                 {t}
//               </button>
//             );
//           })}
//         </div>

//         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filtered.slice(0, 3).map((p) => (
//             <ProductCard key={p.id} p={p} />
//           ))}
//         </div>

//         <div className="mt-8">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-black transition hover:brightness-110 active:scale-[0.99]"
//             style={{ backgroundColor: GOLD }}
//           >
//             Explore all products
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ProductCard({ p }: { p: Product }) {
//   const cardId = useMemo(() => `pc_${p.id.replace(/[^a-zA-Z0-9_-]/g, "")}`, [p.id]);

//   return (
//     <div
//       data-card={cardId}
//       className={[
//         "group relative rounded-2xl p-4 sm:p-5",
//         "bg-white/[0.04] border border-white/10",
//         "shadow-[0_26px_70px_rgba(0,0,0,0.45)]",
//         "transition-transform duration-300 hover:-translate-y-1.5",
//         "overflow-hidden",
//       ].join(" ")}
//     >
//       {/* GOLD OVERLAY — ONLY ON HOVER (all cards) */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//         style={{
//           background:
//             "radial-gradient(900px 360px at 35% 15%, rgba(176,141,60,0.34), rgba(0,0,0,0) 60%)",
//         }}
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//         style={{ boxShadow: "inset 0 0 0 1px rgba(176,141,60,0.25)" }}
//       />

//       {/* subtle shine sweep on hover */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 noRM"
//       >
//         <div
//           className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 blur-xl"
//           style={{
//             background:
//               "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)",
//             animation: "prod_shine 2.2s ease-in-out infinite",
//           }}
//         />
//       </div>

//       {/* image */}
//       <div className="relative overflow-hidden rounded-xl bg-black/30">
//         <div className="relative aspect-[16/10] w-full">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img
//             src={p.image}
//             alt={p.title}
//             className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
//           />
//         </div>
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
//       </div>

//       {/* meta */}
//       <div className="relative mt-4">
//         <div className="text-[11px] text-white/55">{p.category}</div>
//         <div className="mt-2 text-white text-sm font-semibold">{p.title}</div>

//         <div className="mt-3 flex items-baseline gap-2 text-xs">
//           <span className="text-white/70">Price •</span>
//           <span className="text-white/85">{formatINR(p.price)}</span>
//           {p.oldPrice ? (
//             <span className="text-white/35 line-through">{formatINR(p.oldPrice)}</span>
//           ) : null}
//         </div>

//         {/* Shop now button: ONLY turns gold when the BUTTON is hovered */}
//         <div className="mt-4">
//           <button
//             type="button"
//             className={[
//               "w-full rounded-lg px-4 py-2 text-xs font-semibold transition",
//               "border border-white/25",
//               "text-white/85 hover:text-black",
//               "hover:border-transparent",
//               "hover:shadow-[0_14px_34px_rgba(176,141,60,0.18)]",
//               "hover:brightness-110",
//             ].join(" ")}
//             style={{
//               backgroundColor: "transparent",
//             }}
//           >
//             <span className="inline-flex items-center justify-center gap-2">
//               Shop now <span aria-hidden>↗</span>
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* button hover background (scoped to this card only) */}
//       <style>{`
//         [data-card="${cardId}"] button:hover {
//           background: ${GOLD} !important;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

type Category = "All" | "Mens" | "Womens" | "Skincare" | "Haircare" | "Makeup";

type Product = {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  subcategory_id: string;
  description: string;
  features: string[];
  actual_price: number;
  selling_price: number;
  discount_percentage: number;
  stock: number;
  variants: any[];
  images: string[];
  is_active: boolean;
  is_marked: boolean;
  category_name: string;
  category_slug: string;
  subcategory_name: string;
  average_rating: number;
  review_count: number;
};

const GOLD = "#B08D3C";

function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function Products() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs: Category[] = useMemo(
    () => ["All", "Mens", "Womens", "Skincare", "Haircare", "Makeup"],
    []
  );

  const [active, setActive] = useState<Category>("All");

  // Fetch featured products from Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch products that are marked for homepage (is_marked = true)
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select(`
          *,
          product_categories!inner(name, slug),
          product_subcategories(name, slug)
        `)
        .eq("is_marked", true)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;

      // Fetch reviews for each product to calculate ratings
      const productsWithRatings = await Promise.all(
        (productsData || []).map(async (product: any) => {
          const { data: reviews } = await supabase
            .from("reviews")
            .select("rating")
            .eq("product_id", product.id);

          const reviewCount = reviews?.length || 0;
          const averageRating =
            reviewCount > 0
              ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
              : 0;

          return {
            id: product.id,
            title: product.title,
            slug: product.slug,
            category_id: product.category_id,
            subcategory_id: product.subcategory_id,
            description: product.description,
            features: product.features || [],
            actual_price: product.actual_price,
            selling_price: product.selling_price,
            discount_percentage: product.discount_percentage,
            stock: product.stock,
            variants: product.variants || [],
            images: product.images || [],
            is_active: product.is_active,
            is_marked: product.is_marked,
            category_name: product.product_categories?.name || "",
            category_slug: product.product_categories?.slug || "",
            subcategory_name: product.product_subcategories?.name || "",
            average_rating: Math.round(averageRating * 10) / 10,
            review_count: reviewCount,
          };
        })
      );

      setProducts(productsWithRatings);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on active category
  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter(
      (p) => p.category_slug === active.toLowerCase()
    );
  }, [active, products]);

  // Cursor-follow background glow
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    const onLeave = () => {
      el.style.setProperty("--mx", `70%`);
      el.style.setProperty("--my", `20%`);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative w-full overflow-hidden bg-black">
      <style>{`
        .prodWrap {
          --mx: 72%;
          --my: 18%;
        }

        @keyframes prod_shine {
          0%   { transform: translateX(-120%) skewX(-14deg); opacity: 0; }
          28%  { opacity: .14; }
          65%  { opacity: .20; }
          100% { transform: translateX(120%) skewX(-14deg); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .noRM { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 prodWrap">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at var(--mx) var(--my), rgba(176,141,60,0.35), rgba(0,0,0,0) 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(700px 420px at 20% 15%, rgba(255,255,255,0.06), rgba(0,0,0,0) 55%)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            background:
              "radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.12) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.85)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 py-12 sm:py-14">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-white/75 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          <span>Our Products</span>
        </div>

        <div className="mt-3">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">
            Our Beauty Products
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const isActive = t === active;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActive(t)}
                className={[
                  "rounded-md px-3 py-1.5 text-[11px] sm:text-xs transition",
                  "border",
                  isActive
                    ? "text-black"
                    : "text-white/70 hover:text-white/90 hover:bg-white/5",
                ].join(" ")}
                style={{
                  borderColor: isActive ? "transparent" : "rgba(255,255,255,0.10)",
                  backgroundColor: isActive ? GOLD : "rgba(255,255,255,0.06)",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="mt-8 flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
              <p className="text-white/60 text-sm">Loading products...</p>
            </div>
          </div>
        ) : error ? (
          <div className="mt-8 flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-red-400 text-sm mb-2">Failed to load products</p>
              <button
                onClick={fetchProducts}
                className="text-xs text-white/70 hover:text-white underline"
              >
                Try again
              </button>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-8 flex items-center justify-center py-20">
            <p className="text-white/60 text-sm">No products found in this category.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 3).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {/* Explore All Button */}
        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-black transition hover:brightness-110 active:scale-[0.99]"
            style={{ backgroundColor: GOLD }}
          >
            Explore all products
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const cardId = useMemo(() => `pc_${p.id.replace(/[^a-zA-Z0-9_-]/g, "")}`, [p.id]);

  // Get first image or fallback
  const productImage = p.images && p.images.length > 0 ? p.images[0] : "/products/placeholder.png";

  return (
    <Link href={`/products/${p.slug}`}>
      <div
        data-card={cardId}
        className={[
          "group relative rounded-2xl p-4 sm:p-5",
          "bg-white/[0.04] border border-white/10",
          "shadow-[0_26px_70px_rgba(0,0,0,0.45)]",
          "transition-transform duration-300 hover:-translate-y-1.5",
          "overflow-hidden",
          "cursor-pointer",
        ].join(" ")}
      >
        {/* GOLD OVERLAY — ONLY ON HOVER */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(900px 360px at 35% 15%, rgba(176,141,60,0.34), rgba(0,0,0,0) 60%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgba(176,141,60,0.25)" }}
        />

        {/* Subtle shine sweep on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 noRM"
        >
          <div
            className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 blur-xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)",
              animation: "prod_shine 2.2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-black/30">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={productImage}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          
          {/* Discount Badge */}
          {p.discount_percentage > 0 && (
            <div className="absolute top-3 right-3">
              <div
                className="px-2 py-1 rounded-md text-xs font-bold text-black"
                style={{ backgroundColor: GOLD }}
              >
                {Math.round(p.discount_percentage)}% OFF
              </div>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="relative mt-4">
          <div className="text-[11px] text-white/55">{p.subcategory_name || p.category_name}</div>
          <div className="mt-2 text-white text-sm font-semibold line-clamp-1">{p.title}</div>

          {/* Rating */}
          {p.review_count > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < Math.round(p.average_rating)
                        ? "text-yellow-400"
                        : "text-white/20"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-white/50">
                {p.average_rating.toFixed(1)} ({p.review_count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2 text-xs">
            <span className="text-white/70">Price •</span>
            <span className="text-white/85 font-semibold">{formatINR(p.selling_price)}</span>
            {p.actual_price > p.selling_price && (
              <span className="text-white/35 line-through">{formatINR(p.actual_price)}</span>
            )}
          </div>

          {/* Shop Now Button */}
          <div className="mt-4">
            <button
              type="button"
              className={[
                "w-full rounded-lg px-4 py-2 text-xs font-semibold transition",
                "border border-white/25",
                "text-white/85 hover:text-black",
                "hover:border-transparent",
                "hover:shadow-[0_14px_34px_rgba(176,141,60,0.18)]",
                "hover:brightness-110",
              ].join(" ")}
              style={{
                backgroundColor: "transparent",
              }}
            >
              <span className="inline-flex items-center justify-center gap-2">
                Shop now <span aria-hidden>↗</span>
              </span>
            </button>
          </div>
        </div>

        {/* Button hover background */}
        <style>{`
          [data-card="${cardId}"] button:hover {
            background: ${GOLD} !important;
          }
        `}</style>
      </div>
    </Link>
  );
}