"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Category = "All" | "Mens" | "Womens" | "Skincare" | "Haircare" | "Makeup";

type Product = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  price: number;
  oldPrice?: number;
  image: string;
};

const GOLD = "#B08D3C";

function formatINR(n: number) {
  return `₹${n}`;
}

export default function Products() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const tabs: Category[] = useMemo(
    () => ["All", "Mens", "Womens", "Skincare", "Haircare", "Makeup"],
    []
  );

  const products: Product[] = useMemo(
    () => [
      {
        id: "p1",
        category: "Skincare",
        title: "Glowé Radiance Serum",
        price: 400,
        oldPrice: 790,
        image: "/products/product1.png",
      },
      {
        id: "p2",
        category: "Haircare",
        title: "CrownGloss Hair Serum",
        price: 400,
        oldPrice: 790,
        image: "/products/product2.png",
      },
      {
        id: "p3",
        category: "Makeup",
        title: "BlushAura Lip Tint",
        price: 400,
        oldPrice: 790,
        image: "/products/product3.png",
      },
    ],
    []
  );

  const [active, setActive] = useState<Category>("Womens");

  const filtered = useMemo(() => {
    if (active === "All") return products;
    if (active === "Womens") return products;
    if (active === "Mens") return products;
    return products.filter((p) => p.category === active);
  }, [active, products]);

  // Cursor-follow background glow (section)
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
        <div className="flex items-center gap-2 text-white/75 text-xs">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
          <span>Our Products</span>
        </div>

        <div className="mt-3">
          <h2 className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">
            Our Beauty Products
          </h2>
        </div>

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

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 3).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold text-black transition hover:brightness-110 active:scale-[0.99]"
            style={{ backgroundColor: GOLD }}
          >
            Explore all products
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const cardId = useMemo(() => `pc_${p.id.replace(/[^a-zA-Z0-9_-]/g, "")}`, [p.id]);

  return (
    <div
      data-card={cardId}
      className={[
        "group relative rounded-2xl p-4 sm:p-5",
        "bg-white/[0.04] border border-white/10",
        "shadow-[0_26px_70px_rgba(0,0,0,0.45)]",
        "transition-transform duration-300 hover:-translate-y-1.5",
        "overflow-hidden",
      ].join(" ")}
    >
      {/* GOLD OVERLAY — ONLY ON HOVER (all cards) */}
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

      {/* subtle shine sweep on hover */}
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

      {/* image */}
      <div className="relative overflow-hidden rounded-xl bg-black/30">
        <div className="relative aspect-[16/10] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* meta */}
      <div className="relative mt-4">
        <div className="text-[11px] text-white/55">{p.category}</div>
        <div className="mt-2 text-white text-sm font-semibold">{p.title}</div>

        <div className="mt-3 flex items-baseline gap-2 text-xs">
          <span className="text-white/70">Price •</span>
          <span className="text-white/85">{formatINR(p.price)}</span>
          {p.oldPrice ? (
            <span className="text-white/35 line-through">{formatINR(p.oldPrice)}</span>
          ) : null}
        </div>

        {/* Shop now button: ONLY turns gold when the BUTTON is hovered */}
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

      {/* button hover background (scoped to this card only) */}
      <style>{`
        [data-card="${cardId}"] button:hover {
          background: ${GOLD} !important;
        }
      `}</style>
    </div>
  );
}
