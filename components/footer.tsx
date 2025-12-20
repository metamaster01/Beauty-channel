"use client";

import Link from "next/link";
import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type FooterLink = { label: string; href: string };

function IconFacebook({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v3H7v3h3v6h3v-6h3l1-3h-4v-3c0-.6.4-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconTwitter({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.7 7.2c.01.16.01.32.01.48 0 4.86-3.7 10.46-10.46 10.46-2.08 0-4.01-.61-5.64-1.65.29.03.58.04.88.04 1.72 0 3.31-.59 4.57-1.58-1.6-.03-2.95-1.08-3.41-2.52.23.03.45.06.69.06.32 0 .65-.04.95-.12-1.67-.34-2.93-1.81-2.93-3.58v-.05c.49.27 1.05.44 1.65.46-.98-.66-1.62-1.78-1.62-3.05 0-.67.18-1.3.5-1.84 1.8 2.22 4.5 3.68 7.54 3.83-.06-.27-.1-.55-.1-.84 0-2.02 1.64-3.66 3.66-3.66 1.06 0 2.01.45 2.68 1.16.84-.16 1.62-.47 2.33-.89-.27.86-.86 1.58-1.61 2.04.74-.08 1.46-.29 2.12-.57-.5.74-1.12 1.39-1.84 1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconInstagram({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm10.25 1.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  // ✅ stable across SSR/CSR (no hydration issues)
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const companyLinks: FooterLink[] = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About us", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const exploreLinks: FooterLink[] = useMemo(
    () => [
      { label: "Pricing", href: "/pricing" },
      { label: "Offer", href: "/offer" },
      { label: "Book", href: "/book" },
    ],
    []
  );

  return (
    <footer ref={footerRef} className="relative w-full bg-[#B56A54] text-white overflow-hidden">
      {/* Inline CSS animations (scoped) */}
      <style>{`
        @keyframes f_${uid}_fadeUp {
          0% { opacity: 0; transform: translateY(18px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes f_${uid}_shine {
          0% { transform: translateX(-130%) skewX(-16deg); opacity: 0; }
          30% { opacity: .14; }
          70% { opacity: .18; }
          100% { transform: translateX(130%) skewX(-16deg); opacity: 0; }
        }
        @keyframes f_${uid}_divider {
          0% { transform: scaleX(0); opacity: .2; }
          100% { transform: scaleX(1); opacity: 1; }
        }

        .f_${uid}_reveal { opacity: 0; transform: translateY(18px); filter: blur(10px); }
        .f_${uid}_reveal.in {
          animation: f_${uid}_fadeUp 800ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        .f_${uid}_divider {
          transform-origin: left;
          transform: scaleX(0);
          opacity: .2;
        }
        .f_${uid}_divider.in {
          animation: f_${uid}_divider 700ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .f_${uid}_reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
          .f_${uid}_reveal.in { animation: none !important; }
          .f_${uid}_divider, .f_${uid}_divider.in { transform: scaleX(1) !important; opacity: 1 !important; animation: none !important; }
        }
      `}</style>

      {/* Subtle luxury shine sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.22) 50%, rgba(255,255,255,0) 100%)",
          width: "55%",
          left: "-12%",
          top: 0,
          height: "100%",
          animation: inView ? `f_${uid}_shine 7.2s ease-in-out infinite` : "none",
          mixBlendMode: "overlay",
          opacity: 0.12,
        }}
      />

      <div className="mx-auto max-w-6xl px-6 py-12 md:py-14">
        {/* Top area */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand + Social */}
          <div
            className={`md:col-span-4 f_${uid}_reveal ${inView ? "in" : ""}`}
            style={{ animationDelay: "40ms" }}
          >
            <div className="text-3xl font-semibold italic tracking-tight">Beauty logo</div>

            <div className="mt-8">
              <div className="text-xs uppercase tracking-wider text-white/80">Social Media</div>

              <div className="mt-3 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/35 text-white/90 hover:bg-white/10 transition"
                >
                  <IconFacebook className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: 1, height: 1, boxShadow: "0 0 26px rgba(255,255,255,.22)" }}
                  />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/35 text-white/90 hover:bg-white/10 transition"
                >
                  <IconTwitter className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: 1, height: 1, boxShadow: "0 0 26px rgba(255,255,255,.22)" }}
                  />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/35 text-white/90 hover:bg-white/10 transition"
                >
                  <IconInstagram className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ width: 1, height: 1, boxShadow: "0 0 26px rgba(255,255,255,.22)" }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Company */}
          <div
            className={`md:col-span-2 f_${uid}_reveal ${inView ? "in" : ""}`}
            style={{ animationDelay: "120ms" }}
          >
            <div className="text-sm font-medium text-white/90">Company</div>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {companyLinks.map((l, i) => (
                <li
                  key={l.label}
                  className={`f_${uid}_reveal ${inView ? "in" : ""}`}
                  style={{ animationDelay: `${180 + i * 70}ms` }}
                >
                  <Link className="hover:text-white transition relative" href={l.href}>
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div
            className={`md:col-span-2 f_${uid}_reveal ${inView ? "in" : ""}`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="text-sm font-medium text-white/90">Explore</div>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {exploreLinks.map((l, i) => (
                <li
                  key={l.label}
                  className={`f_${uid}_reveal ${inView ? "in" : ""}`}
                  style={{ animationDelay: `${260 + i * 70}ms` }}
                >
                  <Link className="hover:text-white transition relative" href={l.href}>
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div
            className={`md:col-span-4 f_${uid}_reveal ${inView ? "in" : ""}`}
            style={{ animationDelay: "280ms" }}
          >
            <div className="text-sm font-medium text-white/90">Contact info</div>
            <div className="mt-4 space-y-2 text-sm text-white/85">
              <div className="hover:text-white transition">info@beauty.com</div>
              <div className="hover:text-white transition">(078) 12345 12112</div>
              <div className="max-w-md">
                Tower-17-002, Orchid Petals, Sohna Road,
                <br />
                Sector 49, Gurugram, Haryana 122018
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={`mt-10 border-t border-white/25 f_${uid}_divider ${inView ? "in" : ""}`} />

        {/* Bottom line 1 */}
        <div
          className={`flex flex-col gap-3 py-6 text-xs text-white/85 md:flex-row md:items-center md:justify-between f_${uid}_reveal ${
            inView ? "in" : ""
          }`}
          style={{ animationDelay: "420ms" }}
        >
          <div>ABC Company © 2025. All rights Reserved.</div>
          <div>support@Company.com</div>
        </div>

        {/* Divider */}
        <div className={`border-t border-white/25 f_${uid}_divider ${inView ? "in" : ""}`} />

        {/* Bottom line 2 */}
        <div
          className={`flex items-center justify-end gap-4 py-6 text-sm text-white/90 f_${uid}_reveal ${
            inView ? "in" : ""
          }`}
          style={{ animationDelay: "520ms" }}
        >
          <FooterBottomLink href="/terms" label="Terms" />
          <FooterBottomLink href="/privacy" label="Privacy" />
          <FooterBottomLink href="/cookies" label="Cookies" />
        </div>
      </div>
    </footer>
  );
}

function FooterBottomLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative hover:text-white transition">
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-300 hover:scale-x-100" />
    </Link>
  );
}
