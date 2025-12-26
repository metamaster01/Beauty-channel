"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
};

type GalleryProps = {
  title?: string;
  subtitle?: string;
  hrefSeeAll?: string;
  onSeeAll?: () => void;
  images?: {
    hero?: GalleryItem;
    bottom?: [GalleryItem, GalleryItem, GalleryItem];
  };
};

const defaultImages = {
  hero: {
    id: "hero",
    src: "/gallery/gallery1.png",
    alt: "Cosmetic treatment close-up",
  },
  bottom: [
    { id: "b1", src: "/gallery/gallery2.png", alt: "Gallery image 2" },
    { id: "b2", src: "/gallery/gallery3.png", alt: "Gallery image 3" },
    { id: "b3", src: "/gallery/gallery4.png", alt: "Gallery image 4" },
  ] as [GalleryItem, GalleryItem, GalleryItem],
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Gallery({
  title = "Our Gallery",
  subtitle = "A glimpse into the beauty we create every day — transformations, artistry, and real results.",
  hrefSeeAll = "/gallery",
  onSeeAll,
  images = defaultImages,
}: GalleryProps) {
  const hero = images.hero ?? defaultImages.hero;
  const bottom = images.bottom ?? defaultImages.bottom;

  const items = useMemo(() => [hero, ...bottom], [hero, bottom]);

  // Scroll reveal
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Parallax for hero image
  const [parallaxY, setParallaxY] = useState(0);

  // Mouse tilt (hero + cards)
  const [heroTilt, setHeroTilt] = useState({ rx: 0, ry: 0 });
  const [cardTilt, setCardTilt] = useState<Record<string, { rx: number; ry: number }>>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(-240, Math.min(240, -rect.top / 8));
      setParallaxY(progress);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onTiltMove =
    (id: string) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const ry = clamp((px - 0.5) * 10, -8, 8);
      const rx = clamp((0.5 - py) * 10, -8, 8);

      if (id === "hero") setHeroTilt({ rx, ry });
      else
        setCardTilt((prev) => ({
          ...prev,
          [id]: { rx, ry },
        }));
    };

  const onTiltLeave = (id: string) => () => {
    if (id === "hero") setHeroTilt({ rx: 0, ry: 0 });
    else
      setCardTilt((prev) => ({
        ...prev,
        [id]: { rx: 0, ry: 0 },
      }));
  };

  return (
    <section className="relative w-full bg-black">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* floating blobs */}
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl animate-[float1_9s_ease-in-out_infinite]" />
        <div className="absolute -bottom-48 right-[-80px] h-[640px] w-[640px] rounded-full bg-white/10 blur-3xl animate-[float2_11s_ease-in-out_infinite]" />
        <div className="absolute top-32 left-[-90px] h-[420px] w-[420px] rounded-full bg-white/8 blur-3xl animate-[float3_13s_ease-in-out_infinite]" />

        {/* soft grid */}
        <div className="absolute inset-0 opacity-[0.14] [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px]" />

        {/* subtle vignette */}
        <div className="absolute inset-0 [box-shadow:inset_0_0_160px_rgba(0,0,0,0.75)]" />
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-12"
      >
        {/* Header (LEFT aligned) */}
        <div
          className={[
            "text-left transition-all duration-700 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          ].join(" ")}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {subtitle}
          </p>
        </div>

        {/* Desktop / Tablet */}
        <div className="mt-10 hidden md:grid grid-cols-12 gap-6">
          {/* Hero */}
          <div
            className={[
              "md:col-span-8 transition-all duration-700 ease-out",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "80ms" }}
          >
            <div
              onMouseMove={onTiltMove("hero")}
              onMouseLeave={onTiltLeave("hero")}
              className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-white/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* animated glow border */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-[-2px] rounded-2xl bg-[conic-gradient(from_90deg,rgba(255,255,255,0.0),rgba(255,255,255,0.18),rgba(255,255,255,0.0))] blur-sm animate-[spin_2.8s_linear_infinite]" />
              </div>

              {/* hover glow bloom */}
              <div className="pointer-events-none absolute -inset-12 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100 [background:radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.10),transparent_60%)]" />

              <div
                className="relative aspect-[16/9] w-full transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1100px) rotateX(${heroTilt.rx}deg) rotateY(${heroTilt.ry}deg)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero.src}
                  alt={hero.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  style={{
                    transform: `translateY(${parallaxY}px) scale(1.06)`,
                  }}
                />

                {/* cinematic layers */}
                <div className="pointer-events-none absolute inset-0">
                  {/* gradient depth */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-black/0 opacity-80" />
                  {/* shimmer sweep */}
                  <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-white/18 blur-xl opacity-0 transition duration-700 group-hover:opacity-100 animate-[shine_2.4s_linear_infinite]" />
                  {/* micro-noise */}
                  <div className="absolute inset-0 opacity-[0.05] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')]" />
                  {/* vignette */}
                  <div className="absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.40)]" />
                </div>
              </div>
            </div>
          </div>

          {/* See All card (GOLD bg) */}
          <div
            className={[
              "md:col-span-4 transition-all duration-700 ease-out",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: "140ms" }}
          >
            {hrefSeeAll ? (
              <SeeAllLink href={hrefSeeAll} />
            ) : (
              <button
                type="button"
                onClick={onSeeAll}
                className="group relative flex h-full w-full items-center justify-center rounded-2xl bg-[#B08D3C] shadow-sm ring-1 ring-white/15 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="See all gallery items"
              >
                <span className="text-lg font-semibold text-white transition group-hover:tracking-wide">
                  See All
                </span>

                <span className="pointer-events-none absolute -inset-8 rounded-3xl opacity-0 blur-3xl transition duration-700 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_60%)]" />
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] [background-size:200%_100%] animate-[sweep_1.7s_linear_infinite]" />
              </button>
            )}
          </div>

          {/* Bottom row */}
          {bottom.map((item, idx) => {
            const t = cardTilt[item.id] ?? { rx: 0, ry: 0 };
            return (
              <div
                key={item.id}
                className={[
                  "md:col-span-4 transition-all duration-700 ease-out",
                  visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: `${220 + idx * 90}ms` }}
              >
                <div
                  onMouseMove={onTiltMove(item.id)}
                  onMouseLeave={onTiltLeave(item.id)}
                  className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* glow border */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-[-2px] rounded-2xl bg-[conic-gradient(from_120deg,rgba(255,255,255,0.0),rgba(255,255,255,0.16),rgba(255,255,255,0.0))] blur-sm animate-[spin_3.2s_linear_infinite]" />
                  </div>

                  {/* bloom */}
                  <div className="pointer-events-none absolute -inset-12 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100 [background:radial-gradient(circle_at_40%_25%,rgba(255,255,255,0.12),transparent_60%)]" />

                  <div
                    className="relative w-full h-[320px] lg:h-[400px] transition-transform duration-300 ease-out"
                    style={{
                      transform: `perspective(1100px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.08]"
                      loading="lazy"
                    />

                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                        <div className="absolute inset-0 [box-shadow:inset_0_0_100px_rgba(0,0,0,0.30)]" />
                      </div>

                      <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-white/16 blur-xl opacity-0 transition duration-700 group-hover:opacity-100 animate-[shine_2.8s_linear_infinite]" />

                      <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.0%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.32%22/></svg>')]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile */}
        <div
          className={[
            "mt-8 md:hidden transition-all duration-700 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          ].join(" ")}
          style={{ transitionDelay: "120ms" }}
        >
          <div className="mb-4 flex items-center justify-end">
            {hrefSeeAll ? (
              <Link
                href={hrefSeeAll}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm active:scale-[0.98]"
              >
                See All
              </Link>
            ) : (
              <button
                type="button"
                onClick={onSeeAll}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-sm active:scale-[0.98]"
              >
                See All
              </button>
            )}
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-2 pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {items.map((item) => (
                <div key={item.id} className="snap-start min-w-[85%] sm:min-w-[70%]">
                  <div className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-white/10">
                    <div className="relative h-[340px] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover transition duration-700 group-active:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-active:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                        <div className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-white/16 blur-xl animate-[shine_2.6s_linear_infinite]" />
                      </div>
                      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.0%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.32%22/></svg>')]" />
                    </div>

                    <div className="pointer-events-none absolute -inset-10 opacity-0 blur-3xl transition duration-700 group-active:opacity-100 [background:radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_60%)]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black to-black/0" />
          </div>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes sweep {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 200% 0%;
            }
          }

          @keyframes shine {
            0% {
              transform: translateX(-10%) rotate(12deg);
            }
            100% {
              transform: translateX(220%) rotate(12deg);
            }
          }

          @keyframes float1 {
            0%,
            100% {
              transform: translate(-50%, 0px) scale(1);
            }
            50% {
              transform: translate(-50%, 18px) scale(1.03);
            }
          }

          @keyframes float2 {
            0%,
            100% {
              transform: translate(0px, 0px) scale(1);
            }
            50% {
              transform: translate(-14px, -20px) scale(1.04);
            }
          }

          @keyframes float3 {
            0%,
            100% {
              transform: translate(0px, 0px) scale(1);
            }
            50% {
              transform: translate(16px, 14px) scale(1.03);
            }
          }
        `}</style>
      </div>
    </section>
  );
}

function SeeAllLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="See all gallery items"
      className="group relative flex h-full w-full items-center justify-center rounded-2xl bg-[#B08D3C] shadow-sm ring-1 ring-white/15 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span className="text-lg font-semibold text-white transition group-hover:tracking-wide">
        See All
      </span>

      <span className="pointer-events-none absolute -inset-8 rounded-3xl opacity-0 blur-3xl transition duration-700 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18),transparent_60%)]" />
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] [background-size:200%_100%] animate-[sweep_1.7s_linear_infinite]" />
    </Link>
  );
}
