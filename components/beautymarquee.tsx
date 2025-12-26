"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type MarqueeItem = {
  id: string;
  label: string;
};

type BeautyMarqueeProps = {
  items?: MarqueeItem[];
  speedSeconds?: number; // lower = faster
  className?: string;
};

const DEFAULT_ITEMS: MarqueeItem[] = [
  { id: "hair-1", label: "HAIRCARE" },
  { id: "makeup-1", label: "MAKEUP" },
  { id: "spa-1", label: "SPA" },
  { id: "selfcare-1", label: "SELFCARE" },
  { id: "organic-1", label: "ORGANIC" },
  { id: "skincare-1", label: "SKINCARE" },
  { id: "hair-2", label: "HAIRCARE" },
  { id: "makeup-2", label: "MAKEUP" },
];

export default function BeautyMarquee({
  items = DEFAULT_ITEMS,
  speedSeconds = 18,
  className = "",
}: BeautyMarqueeProps) {
  const uid = useId().replace(/:/g, "");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // duplicate for seamless loop
  const loopItems = useMemo(() => [...items, ...items], [items]);

  // reveal on scroll (soft fade like your sections)
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={wrapRef} className={["w-full", className].join(" ")}>
      <style>{`
        @keyframes mq_${uid}_scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes mq_${uid}_fadeUp {
          0% { opacity: 0; transform: translateY(12px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .mq_${uid}_reveal {
          opacity: 0;
          transform: translateY(12px);
          filter: blur(10px);
        }
        .mq_${uid}_reveal.in {
          animation: mq_${uid}_fadeUp 750ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .mq_${uid}_track { animation: none !important; transform: none !important; }
          .mq_${uid}_reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
          .mq_${uid}_reveal.in { animation: none !important; }
        }
      `}</style>

      <div
        className={[
          "relative overflow-hidden py-10",
          "bg-[#121212]",
          "mq_" + uid + "_reveal",
          inView ? "in" : "",
        ].join(" ")}
      >
        {/* top/bottom soft borders like screenshot */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />

        {/* subtle vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,0.55)" }}
        />

        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#121212] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#121212] to-transparent" />

        {/* marquee */}
        <div className="relative">
          <div
            className="mq_${uid}_track flex w-[200%] items-center gap-6 will-change-transform"
            style={{
              animation: `mq_${uid}_scroll ${speedSeconds}s linear infinite`,
            }}
            onMouseEnter={(e) => {
              // pause on hover
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
            }}
          >
            {loopItems.map((it, idx) => (
              <div
                key={`${it.id}-${idx}`}
                className="flex items-center gap-6 whitespace-nowrap"
              >
                <span className="text-sm tracking-[0.12em] text-white/60">{it.label}</span>

                {/* gold starburst */}
                <Starburst className="h-5 w-5 text-[#B08D3C]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Starburst({ className = "" }: { className?: string }) {
  // simple sunburst icon (looks like your screenshot)
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M12 2.5v3.2" />
        <path d="M12 18.3v3.2" />
        <path d="M2.5 12h3.2" />
        <path d="M18.3 12h3.2" />
        <path d="M4.2 4.2l2.3 2.3" />
        <path d="M17.5 17.5l2.3 2.3" />
        <path d="M19.8 4.2l-2.3 2.3" />
        <path d="M6.5 17.5l-2.3 2.3" />
        <path d="M7.2 2.9l1.2 3.0" />
        <path d="M15.6 18.1l1.2 3.0" />
        <path d="M2.9 16.8l3.0-1.2" />
        <path d="M18.1 8.4l3.0-1.2" />
        <path d="M2.9 7.2l3.0 1.2" />
        <path d="M18.1 15.6l3.0 1.2" />
        <path d="M7.2 21.1l1.2-3.0" />
        <path d="M15.6 5.9l1.2-3.0" />
      </g>
      <circle cx="12" cy="12" r="3.1" fill="currentColor" opacity="0.18" />
      <circle cx="12" cy="12" r="1.9" fill="currentColor" />
    </svg>
  );
}
