"use client";

import React, { useId } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type FeedbackItem = {
  name: string;
  text: string;
};

const GOLD = "#B08D3C";

const feedbacks: FeedbackItem[] = Array.from({ length: 6 }).map(() => ({
  name: "Sarah Thompson",
  text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
}));

export default function Feedback() {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");

  const wrap: Variants = {
    hidden: {},
    visible: {
      transition: reduce ? { staggerChildren: 0 } : { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const headIn: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14, filter: reduce ? "blur(0px)" : "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const cardIn: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 22,
      scale: reduce ? 1 : 0.98,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Card visibility boosted (lighter cards + clearer border) */}
      <style>{`
        .fb_${uid}_card { --mx: 50%; --my: 35%; }

        /* ✅ make cards more visible on black */
        .fb_${uid}_base {
          background: linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.05));
        }

        .fb_${uid}_glass {
          opacity: 0;
          transition: opacity 220ms ease;
          background:
            radial-gradient(420px 240px at var(--mx) var(--my), rgba(176,141,60,0.55), rgba(176,141,60,0.16) 35%, rgba(0,0,0,0) 62%),
            radial-gradient(540px 320px at var(--mx) var(--my), rgba(255,255,255,0.18), rgba(0,0,0,0) 62%),
            linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04));
          mix-blend-mode: screen;
          filter: saturate(1.12);
        }

        .fb_${uid}_card:hover .fb_${uid}_glass { opacity: 1; }

        .fb_${uid}_ring {
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.14) inset,
            0 16px 50px rgba(0,0,0,0.55);
        }

        .fb_${uid}_card:hover .fb_${uid}_ring {
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.18) inset,
            0 18px 60px rgba(0,0,0,0.60),
            0 0 42px rgba(176,141,60,0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .fb_${uid}_glass { display:none !important; }
        }
      `}</style>

      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 500px at 15% 12%, rgba(255,255,255,0.10), rgba(0,0,0,0) 60%), radial-gradient(1000px 600px at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0) 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <motion.div
          variants={headIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Feedback Corner
          </h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            At Beauty salon, our customers are the heartbeat of our brand.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={wrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {feedbacks.map((item, index) => (
            <FeedbackCard
              key={`${item.name}-${index}`}
              item={item}
              index={index}
              variants={cardIn}
              uid={uid}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeedbackCard({
  item,
  index,
  variants,
  uid,
}: {
  item: FeedbackItem;
  index: number;
  variants: Variants;
  uid: string;
}) {
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <motion.div
      custom={index}
      variants={variants}
      className={`group relative w-full fb_${uid}_card`}
      onMouseMove={onMove}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={[
          `fb_${uid}_base fb_${uid}_ring`,
          "relative overflow-hidden rounded-2xl px-8 py-8 sm:px-10 sm:py-10",
          "border border-white/20", // ✅ stronger border so it’s visible
          "backdrop-blur-[2px]", // ✅ subtle glass feel even at rest
        ].join(" ")}
      >
        {/* cursor-follow gold glass (hover only) */}
        <div aria-hidden className={`pointer-events-none absolute inset-0 fb_${uid}_glass`} />

        {/* content */}
        <div className="relative text-white">
          <div className="text-4xl leading-none text-white/95">“</div>

          <h4 className="mt-4 text-lg font-semibold tracking-tight sm:text-xl">{item.name}</h4>

          <p className="mt-4 text-sm leading-7 text-white/85 sm:text-base">{item.text}</p>
        </div>

        {/* bottom hairline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/20" />

        {/* hover-only gold edge hint */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `0 0 0 1px rgba(176,141,60,0.28) inset` }}
        />

        {/* tiny gold sparkle dot (optional, subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-5 top-5 h-2 w-2 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: GOLD,
            boxShadow: "0 0 18px rgba(176,141,60,0.55)",
          }}
        />
      </div>
    </motion.div>
  );
}
