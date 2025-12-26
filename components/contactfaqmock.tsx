"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type ContactInfoItem = {
  id: string;
  value: string;
  href: string;
};

const GOLD = "#B08D3C";

const ArrowCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M10.2 8.8 13.4 12l-3.2 3.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.4 12H7.8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PlusIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MinusIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function ContactFAQMock() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);

  const [wrapInView, setWrapInView] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  const uid = useId().replace(/:/g, "");
  const [openId, setOpenId] = useState<string | null>(null);

  const contactInfo: ContactInfoItem[] = useMemo(
    () => [
      { id: "phone", value: "+916356547812", href: "tel:+916356547812" },
      { id: "email", value: "beauty@gmail.com", href: "mailto:beauty@gmail.com" },
    ],
    []
  );

  const faqs: FAQItem[] = useMemo(
    () => [
      {
        id: "faq-1",
        question: "What services do you offer?",
        answer:
          "We offer premium hair, skin, makeup, and wellness services tailored to your goals. Share what you need and we’ll recommend the best option.",
      },
      {
        id: "faq-2",
        question: "How do I book an appointment?",
        answer:
          "You can book via the contact form, call us directly, or email. We’ll confirm your preferred date/time and any preparation details.",
      },
      {
        id: "faq-3",
        question: "Do you offer consultations?",
        answer:
          "Yes—quick consults are available before any service. We’ll assess your needs, discuss expectations, and create a personalized plan.",
      },
      {
        id: "faq-4",
        question: "What is your cancellation policy?",
        answer:
          "If you need to reschedule or cancel, please let us know at least 24 hours in advance so we can offer the slot to someone else.",
      },
    ],
    []
  );

  // Scroll reveal observers
  useEffect(() => {
    const obs = (el: Element | null, set: (v: boolean) => void, threshold = 0.18) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) set(true);
        },
        { threshold }
      );
      io.observe(el);
      return io;
    };

    const ioWrap = obs(wrapRef.current, setWrapInView, 0.1);
    const io1 = obs(contactRef.current, setContactInView, 0.2);
    const io2 = obs(faqRef.current, setFaqInView, 0.15);

    return () => {
      ioWrap?.disconnect();
      io1?.disconnect();
      io2?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full bg-black">
      <style>{`
        @keyframes c_${uid}_fadeUp {
          0% { opacity: 0; transform: translateY(18px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes c_${uid}_shine {
          0%   { transform: translateX(-120%) skewX(-14deg); opacity: 0; }
          35%  { opacity: .14; }
          70%  { opacity: .18; }
          100% { transform: translateX(120%) skewX(-14deg); opacity: 0; }
        }

        .c_${uid}_reveal { opacity: 0; transform: translateY(18px); filter: blur(10px); }
        .c_${uid}_reveal.in { animation: c_${uid}_fadeUp 800ms cubic-bezier(.2,.8,.2,1) forwards; }

        /* FAQ answer: smooth open */
        .c_${uid}_ansWrap {
          display: grid;
          transition: grid-template-rows 260ms ease, opacity 260ms ease, transform 260ms ease;
        }
        .c_${uid}_ansWrap.closed { grid-template-rows: 0fr; opacity: 0; transform: translateY(-6px); }
        .c_${uid}_ansWrap.open { grid-template-rows: 1fr; opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .c_${uid}_reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
          .c_${uid}_reveal.in { animation: none !important; }
          .c_${uid}_ansWrap { transition: none !important; }
        }
      `}</style>

      {/* Top dark band */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-12">
        <div className="mx-auto max-w-6xl">
          {/* CONTACT CARD */}
          <section ref={contactRef}>
            <div
              className={[
                "rounded-2xl overflow-hidden border border-white/10 bg-[#0b0b0b]",
                "shadow-[0_30px_80px_rgba(0,0,0,0.55)]",
                "grid grid-cols-1 md:grid-cols-2",
              ].join(" ")}
            >
              {/* Left gold panel */}
              <div
                className="relative p-8 sm:p-10 text-white"
                style={{ backgroundColor: GOLD }}
              >
                {/* subtle shine sweep */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden md:block"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.22) 50%, rgba(255,255,255,0) 100%)",
                    width: "45%",
                    left: "-12%",
                    top: 0,
                    height: "100%",
                    animation: contactInView ? `c_${uid}_shine 7.2s ease-in-out infinite` : "none",
                    mixBlendMode: "overlay",
                    opacity: 0.18,
                  }}
                />

                <div
                  className={`c_${uid}_reveal ${contactInView ? "in" : ""}`}
                  style={{ animationDelay: "60ms" }}
                >
                  <h2 className="text-xl sm:text-2xl font-semibold leading-snug">
                    Let’s connect and talk about
                    <br />
                    what you need.
                  </h2>
                  <p className="mt-3 text-white/90 max-w-sm">
                    Fill out the form below or reach out directly.
                  </p>
                </div>

                <div className="mt-14 space-y-3">
                  {contactInfo.map((item, idx) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className={[
                        "group flex items-center justify-between gap-4",
                        "max-w-xs",
                        "c_" + uid + "_reveal",
                        contactInView ? "in" : "",
                      ].join(" ")}
                      style={{ animationDelay: `${220 + idx * 90}ms` }}
                      aria-label={item.value}
                    >
                      <span className="text-white/95 font-medium">{item.value}</span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-sm transition group-hover:scale-[1.03] group-hover:bg-white">
                        <ArrowCircleIcon className="h-5 w-5" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right form panel (dark like screenshot) */}
              <div className="relative bg-[#0d0f10] p-8 sm:p-10">
                {/* soft top sheen */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(closest-side at 20% 0%, rgba(255,255,255,.08), rgba(255,255,255,0) 55%)",
                    opacity: 0.35,
                  }}
                />

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Mock send ✨");
                  }}
                  className="relative space-y-6"
                >
                  <div
                    className={`c_${uid}_reveal ${contactInView ? "in" : ""}`}
                    style={{ animationDelay: "160ms" }}
                  >
                    <DarkField label="Your Name" name="name" />
                  </div>

                  <div
                    className={`c_${uid}_reveal ${contactInView ? "in" : ""}`}
                    style={{ animationDelay: "240ms" }}
                  >
                    <DarkField label="Your Number" name="number" />
                  </div>

                  <div
                    className={`c_${uid}_reveal ${contactInView ? "in" : ""}`}
                    style={{ animationDelay: "320ms" }}
                  >
                    <DarkField label="Email" name="email" type="email" />
                  </div>

                  <div
                    className={`c_${uid}_reveal ${contactInView ? "in" : ""}`}
                    style={{ animationDelay: "400ms" }}
                  >
                    <DarkTextArea label="Message..." name="message" />
                  </div>

                  <div
                    className={`c_${uid}_reveal ${contactInView ? "in" : ""}`}
                    style={{ animationDelay: "480ms" }}
                  >
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-black shadow-sm transition hover:brightness-110 active:scale-[0.99]"
                      style={{ backgroundColor: GOLD }}
                    >
                      Send <span aria-hidden="true">→</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ width: 1, height: 1, boxShadow: "0 0 28px rgba(176,141,60,.45)" }}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* FAQ gold section (full width like screenshot) */}
      <section
        ref={faqRef}
        className="w-full"
        style={{
          backgroundColor: GOLD,
        }}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div
              className={`c_${uid}_reveal ${faqInView ? "in" : ""}`}
              style={{ animationDelay: "60ms" }}
            >
              <h3 className="text-white text-2xl sm:text-3xl font-semibold">
                Frequently Asked Questions
              </h3>
            </div>

            <div
              className={[
                "mt-10 border-t border-white/20",
                "divide-y divide-white/15",
                `c_${uid}_reveal`,
                faqInView ? "in" : "",
              ].join(" ")}
              style={{ animationDelay: "140ms" }}
            >
              {faqs.map((item, idx) => {
                const isOpen = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`py-6 c_${uid}_reveal ${faqInView ? "in" : ""}`}
                    style={{ animationDelay: `${200 + idx * 80}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                      className="w-full flex items-center justify-between gap-6 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                    >
                      <span className="text-white/95 text-sm sm:text-base">
                        {item.question}
                      </span>

                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/0 hover:bg-white/10 transition">
                        {isOpen ? (
                          <MinusIcon className="h-5 w-5 text-white" />
                        ) : (
                          <PlusIcon className="h-5 w-5 text-white" />
                        )}
                      </span>
                    </button>

                    <div
                      id={`${item.id}-panel`}
                      className={`c_${uid}_ansWrap ${isOpen ? "open mt-3" : "closed"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-white/85 text-sm leading-relaxed max-w-4xl pr-12">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* subtle bottom dark band like screenshot */}
            <div
              aria-hidden="true"
              className={`mt-10 h-10 w-full rounded-xl bg-black/35 c_${uid}_reveal ${faqInView ? "in" : ""}`}
              style={{ animationDelay: "520ms" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function DarkField({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block group">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder=" "
          className={[
            "w-full bg-transparent text-white/90 text-sm",
            "border-b border-white/15 focus:border-white/35",
            "outline-none py-3",
            "placeholder:text-transparent",
          ].join(" ")}
        />
        <span
          className={[
            "pointer-events-none absolute left-0 top-3",
            "text-sm text-white/35",
            "transition-all duration-200",
            "group-focus-within:-translate-y-3 group-focus-within:text-[11px] group-focus-within:text-white/55",
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </label>
  );
}

function DarkTextArea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block group">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <textarea
          name={name}
          rows={3}
          placeholder=" "
          className={[
            "w-full bg-transparent text-white/90 text-sm resize-none",
            "border-b border-white/15 focus:border-white/35",
            "outline-none py-3",
            "placeholder:text-transparent",
          ].join(" ")}
        />
        <span
          className={[
            "pointer-events-none absolute left-0 top-3",
            "text-sm text-white/35",
            "transition-all duration-200",
            "group-focus-within:-translate-y-3 group-focus-within:text-[11px] group-focus-within:text-white/55",
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </label>
  );
}
