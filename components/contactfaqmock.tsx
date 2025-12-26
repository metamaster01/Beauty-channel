"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type ContactInfoItem = {
  id: string;
  label: string;
  value: string;
  href: string;
};

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
  const contactRef = useRef<HTMLElement | null>(null);
  const faqRef = useRef<HTMLElement | null>(null);

  const [contactInView, setContactInView] = useState(false);
  const [faqInView, setFaqInView] = useState(false);

  const uid = useId().replace(/:/g, "");

  // Scroll reveal observer (reusable)
  useEffect(() => {
    const makeObserver = (el: HTMLElement | null, set: (v: boolean) => void) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) set(true);
        },
        { threshold: 0.2 }
      );
      io.observe(el);
      return io;
    };

    const io1 = makeObserver(contactRef.current, setContactInView);
    const io2 = makeObserver(faqRef.current, setFaqInView);

    return () => {
      io1?.disconnect();
      io2?.disconnect();
    };
  }, []);

  const contactInfo: ContactInfoItem[] = useMemo(
    () => [
      { id: "phone", label: "Phone", value: "+916356547812", href: "tel:+916356547812" },
      { id: "email", label: "Email", value: "beauty@gmail.com", href: "mailto:beauty@gmail.com" },
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

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full bg-white">
      {/* Inline animation CSS (scoped safely with useId) */}
      <style>{`
        @keyframes cfaq_${uid}_fadeUp {
          0% { opacity: 0; transform: translateY(18px); filter: blur(10px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes cfaq_${uid}_softGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 0 30px rgba(0,0,0,.10); }
        }
        @keyframes cfaq_${uid}_shine {
          0% { transform: translateX(-120%) skewX(-14deg); opacity: 0; }
          30% { opacity: .18; }
          100% { transform: translateX(120%) skewX(-14deg); opacity: 0; }
        }

        .cfaq_${uid}_reveal { opacity: 0; transform: translateY(18px); filter: blur(10px); }
        .cfaq_${uid}_reveal.in {
          animation: cfaq_${uid}_fadeUp 750ms cubic-bezier(.2,.8,.2,1) forwards;
        }

        /* FAQ answer: smooth open using grid rows + subtle slide */
        .cfaq_${uid}_ansWrap {
          display: grid;
          transition: grid-template-rows 260ms ease, opacity 260ms ease, transform 260ms ease;
        }
        .cfaq_${uid}_ansWrap.closed {
          grid-template-rows: 0fr;
          opacity: 0;
          transform: translateY(-6px);
        }
        .cfaq_${uid}_ansWrap.open {
          grid-template-rows: 1fr;
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .cfaq_${uid}_reveal { opacity: 1 !important; transform: none !important; filter: none !important; }
          .cfaq_${uid}_reveal.in { animation: none !important; }
          .cfaq_${uid}_ansWrap { transition: none !important; }
        }
      `}</style>

      {/* CONTACT SECTION */}
      <section ref={contactRef} className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-black/10">
            {/* Left panel */}
            <div className="relative bg-[#B08D3C] text-white p-8 sm:p-10 overflow-hidden">
              {/* subtle “shine” sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 md:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.22) 50%, rgba(255,255,255,0) 100%)",
                  width: "45%",
                  left: "-10%",
                  top: "0",
                  height: "100%",
                  animation: contactInView ? `cfaq_${uid}_shine 6.5s ease-in-out infinite` : "none",
                  mixBlendMode: "overlay",
                }}
              />

              <h2
                className={`text-2xl sm:text-3xl font-semibold leading-tight cfaq_${uid}_reveal ${
                  contactInView ? "in" : ""
                }`}
                style={{ animationDelay: "40ms" }}
              >
                Let’s connect and talk about
                <br />
                what you need.
              </h2>

              <p
                className={`mt-4 text-white/90 max-w-sm cfaq_${uid}_reveal ${
                  contactInView ? "in" : ""
                }`}
                style={{ animationDelay: "140ms" }}
              >
                Fill out the form below or reach out directly.
              </p>

              <div className="mt-10 space-y-4">
                {contactInfo.map((item, idx) => (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`group flex items-center justify-between gap-4 rounded-xl px-3 py-2 hover:bg-white/10 transition
                    cfaq_${uid}_reveal ${contactInView ? "in" : ""}`}
                    style={{ animationDelay: `${220 + idx * 90}ms` }}
                    aria-label={`${item.label}: ${item.value}`}
                  >
                    <span className="text-white/95">{item.value}</span>
                    <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 group-hover:bg-white/20 transition">
                      <ArrowCircleIcon className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ boxShadow: "0 0 22px rgba(255,255,255,.20)" }}
                      />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right panel (form) */}
            <div className="bg-white p-8 sm:p-10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Mock send ✨");
                }}
                className="space-y-6"
              >
                <div
                  className={`cfaq_${uid}_reveal ${contactInView ? "in" : ""}`}
                  style={{ animationDelay: "220ms" }}
                >
                  <Field label="Your Name" name="name" placeholder=" " />
                </div>

                <div
                  className={`cfaq_${uid}_reveal ${contactInView ? "in" : ""}`}
                  style={{ animationDelay: "300ms" }}
                >
                  <Field label="Your Number" name="number" placeholder=" " />
                </div>

                <div
                  className={`cfaq_${uid}_reveal ${contactInView ? "in" : ""}`}
                  style={{ animationDelay: "380ms" }}
                >
                  <Field label="Email" name="email" type="email" placeholder=" " />
                </div>

                <div
                  className={`cfaq_${uid}_reveal ${contactInView ? "in" : ""}`}
                  style={{ animationDelay: "460ms" }}
                >
                  <TextAreaField label="Message..." name="message" />
                </div>

                <div
                  className={`cfaq_${uid}_reveal ${contactInView ? "in" : ""}`}
                  style={{ animationDelay: "540ms" }}
                >
                  <button
                    type="submit"
                    className="group relative inline-flex items-center gap-2 rounded-full bg-[#2A1A14] text-white px-6 py-2.5 text-sm font-medium hover:opacity-95 transition"
                    style={{
                      animation: contactInView
                        ? `cfaq_${uid}_softGlow 2.6s ease-in-out infinite`
                        : "none",
                    }}
                  >
                    Send <span aria-hidden="true">→</span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: "0 0 0 1px rgba(255,255,255,.22), 0 0 26px rgba(0,0,0,.18)",
                      }}
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section ref={faqRef} className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <h3
            className={`text-center text-2xl sm:text-3xl font-semibold text-black cfaq_${uid}_reveal ${
              faqInView ? "in" : ""
            }`}
            style={{ animationDelay: "60ms" }}
          >
            Frequently Asked Questions
          </h3>

          <div
            className={`mt-10 divide-y divide-black/10 border-t border-black/10 cfaq_${uid}_reveal ${
              faqInView ? "in" : ""
            }`}
            style={{ animationDelay: "160ms" }}
          >
            {faqs.map((item, idx) => {
              const isOpen = openId === item.id;

              return (
                <div
                  key={item.id}
                  className={`py-4 cfaq_${uid}_reveal ${faqInView ? "in" : ""}`}
                  style={{ animationDelay: `${220 + idx * 90}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                    className="w-full flex items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                  >
                    <span className="text-sm sm:text-base text-black/90">{item.question}</span>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition">
                      {isOpen ? (
                        <MinusIcon className="w-5 h-5 text-black/70" />
                      ) : (
                        <PlusIcon className="w-5 h-5 text-black/70" />
                      )}
                    </span>
                  </button>

                  <div
                    id={`${item.id}-panel`}
                    className={`cfaq_${uid}_ansWrap ${isOpen ? "open mt-2" : "closed"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-black/70 leading-relaxed pr-12">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block group">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full border-b border-black/25 focus:border-black/60 outline-none py-3 text-sm placeholder:text-transparent"
        />
        {/* floating label effect */}
        <span className="pointer-events-none absolute left-0 top-3 text-sm text-black/35 transition-all duration-200 group-focus-within:-translate-y-3 group-focus-within:text-xs group-focus-within:text-black/55">
          {label}
        </span>
      </div>
    </label>
  );
}

function TextAreaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block group">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <textarea
          name={name}
          rows={3}
          placeholder=" "
          className="w-full border-b border-black/25 focus:border-black/60 outline-none py-3 text-sm resize-none placeholder:text-transparent"
        />
        <span className="pointer-events-none absolute left-0 top-3 text-sm text-black/35 transition-all duration-200 group-focus-within:-translate-y-3 group-focus-within:text-xs group-focus-within:text-black/55">
          {label}
        </span>
      </div>
    </label>
  );
}
