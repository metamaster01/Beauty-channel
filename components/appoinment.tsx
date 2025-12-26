"use client";

import React, { useEffect, useId, useRef, useState } from "react";

type AppointmentHeroProps = {
  backgroundImageUrl?: string;
  onBookClick?: () => void;
};

export default function AppointmentHero({
  backgroundImageUrl = "/book1.png",
  onBookClick,
}: AppointmentHeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [inView, setInView] = useState(false);

  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        const img = imgRef.current;
        if (!el || !img) return;

        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;

        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

        const translateY = (progress - 0.5) * 22;
        const scale = 1.03 + progress * 0.02;

        img.style.transform = `translateY(${translateY.toFixed(2)}px) scale(${scale.toFixed(
          3
        )})`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <style>{`
        @keyframes beauty_${uid}_fadeUpSilk {
          0%   { opacity: 0; transform: translateY(18px); filter: blur(10px); }
          60%  { opacity: 1; transform: translateY(0);   filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0);   filter: blur(0px); }
        }

        @keyframes beauty_${uid}_wipeSoft {
          0%   { clip-path: inset(0 100% 0 0); opacity: .35; filter: blur(8px); }
          100% { clip-path: inset(0 0 0 0);   opacity: 1;   filter: blur(0px); }
        }

        @keyframes beauty_${uid}_spotlightDrift {
          0%   { transform: translate3d(-6%, -8%, 0) scale(1); opacity: .55; }
          50%  { transform: translate3d(6%, 8%, 0)   scale(1.05); opacity: .75; }
          100% { transform: translate3d(-6%, -8%, 0) scale(1); opacity: .55; }
        }

        @keyframes beauty_${uid}_shimmerSweep {
          0%   { transform: translateX(-120%) skewX(-14deg); opacity: 0; }
          20%  { opacity: .10; }
          55%  { opacity: .18; }
          100% { transform: translateX(120%) skewX(-14deg); opacity: 0; }
        }

        @keyframes beauty_${uid}_ctaPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(255,255,255,0); }
          50%      { box-shadow: 0 0 30px rgba(255,255,255,.16); }
        }

        .beauty_${uid}_reveal {
          opacity: 0;
          transform: translateY(18px);
          filter: blur(10px);
        }
        .beauty_${uid}_reveal.is-inview {
          animation: beauty_${uid}_fadeUpSilk 900ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        .beauty_${uid}_wipe {
          clip-path: inset(0 100% 0 0);
          opacity: .35;
          filter: blur(8px);
        }
        .beauty_${uid}_wipe.is-inview {
          animation: beauty_${uid}_wipeSoft 900ms cubic-bezier(.2,.85,.2,1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .beauty_${uid}_reveal, .beauty_${uid}_wipe {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            clip-path: none !important;
            animation: none !important;
          }
          .beauty_${uid}_anim { animation: none !important; }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={backgroundImageUrl}
          alt="Beauty hero background"
          className="h-full w-full object-cover will-change-transform"
          style={{ objectPosition: "center 35%", transform: "translateY(0) scale(1.03)" }}
        />

        <div className="absolute inset-0 bg-black/20" />

        <div
          aria-hidden="true"
          className={`absolute -inset-24 beauty_${uid}_anim pointer-events-none`}
          style={{
            background:
              "radial-gradient(closest-side at 35% 35%, rgba(176,141,60,.22), rgba(176,141,60,0) 60%)",
            animation: `beauty_${uid}_spotlightDrift 7.5s ease-in-out infinite`,
            mixBlendMode: "soft-light",
          }}
        />

        <div
          aria-hidden="true"
          className={`absolute inset-0 beauty_${uid}_anim pointer-events-none`}
          style={{
            background:
              "linear-gradient(90deg, rgba(176,141,60,0) 0%, rgba(176,141,60,.22) 50%, rgba(176,141,60,0) 100%)",
            width: "55%",
            left: "-10%",
            top: "0",
            height: "100%",
            animation: `beauty_${uid}_shimmerSweep 6.5s ease-in-out infinite`,
            mixBlendMode: "overlay",
            opacity: 0.15,
          }}
        />
      </div>

      {/* Content (Responsive) */}
      <div
        className="
          relative mx-auto max-w-6xl
          px-5 sm:px-6 md:px-10
          pt-10 pb-10 sm:pt-12 sm:pb-12 md:pt-14 md:pb-14
          min-h-[380px] sm:min-h-[420px] md:min-h-[520px]
          flex flex-col md:flex-row
          items-center md:items-end
          justify-between
          gap-8 md:gap-10
          text-center md:text-left
        "
      >
        {/* Left headline */}
        <div className="w-full md:w-auto max-w-xl">
          <h1 className="text-white tracking-tight leading-[1.05]">
            <span
              className={`beauty_${uid}_wipe ${inView ? "is-inview" : ""} block text-4xl sm:text-5xl md:text-6xl`}
              style={{ animationDelay: "60ms" }}
            >
              Experience Beauty.
            </span>
            <span
              className={`beauty_${uid}_wipe ${inView ? "is-inview" : ""} block text-4xl sm:text-5xl md:text-6xl`}
              style={{ animationDelay: "190ms" }}
            >
              Feel Confident.
            </span>
          </h1>

          <div
            className={`beauty_${uid}_reveal ${inView ? "is-inview" : ""} mt-4 text-white/80 text-xs tracking-[0.26em] uppercase`}
            style={{ animationDelay: "360ms" }}
          >
            Glow • Care • Ritual
          </div>
        </div>

        {/* Right copy + CTA */}
        <div className="w-full md:w-auto max-w-md md:max-w-sm md:ml-auto md:text-right">
          <p
            className={`beauty_${uid}_reveal ${inView ? "is-inview" : ""} text-white/90 text-sm sm:text-base leading-relaxed`}
            style={{ animationDelay: "420ms" }}
          >
            Premium hair, skin, makeup &amp; wellness services crafted to bring out your natural
            glow.
          </p>

          <div
            className={`beauty_${uid}_reveal ${inView ? "is-inview" : ""} mt-5 flex justify-center md:justify-end`}
            style={{ animationDelay: "520ms" }}
          >
            <button
              type="button"
              onClick={onBookClick}
              className="group relative inline-flex items-center gap-2 text-white text-sm sm:text-base rounded-full px-4 py-2 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{
                animation: inView ? `beauty_${uid}_ctaPulse 2.8s ease-in-out infinite` : undefined,
                backdropFilter: "blur(6px)",
                background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06))",
                border: "1px solid rgba(255,255,255,.18)",
              }}
            >
              <span className="relative">
                Book appointment
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 group-hover:scale-x-100" />
              </span>

              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,.22), 0 0 26px rgba(255,255,255,.14)",
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
