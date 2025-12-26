"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type FeedbackItem = {
  name: string;
  text: string;
  // "gold" = highlighted card like screenshot, "dark" = normal dark card
  variant: "gold" | "dark";
};

const feedbacks: FeedbackItem[] = [
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "gold",
  },
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "dark",
  },
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "dark",
  },
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "dark",
  },
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "dark",
  },
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "dark",
  },
];

export default function Feedback() {
  const reduce = useReducedMotion();

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
      y: reduce ? 0 : 26,
      scale: reduce ? 1 : 0.96,
      filter: reduce ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* background like screenshot */}
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
        {/* Left aligned heading like screenshot */}
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

        {/* Cards grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          variants={wrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {feedbacks.map((item, index) => (
            <FeedbackCard key={`${item.name}-${index}`} item={item} index={index} variants={cardIn} />
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
}: {
  item: FeedbackItem;
  index: number;
  variants: Variants;
}) {
  const isGold = item.variant === "gold";

  return (
    <motion.div
      custom={index}
      variants={variants}
      className="group relative w-full"
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.22, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={[
          "relative overflow-hidden rounded-2xl px-8 py-8 sm:px-10 sm:py-10",
          "border border-white/10",
          "shadow-[0_20px_55px_rgba(0,0,0,0.45)]",
          isGold ? "text-white" : "text-white",
        ].join(" ")}
        style={{
          backgroundColor: isGold ? "#B08D3C" : "#1A1A1A",
        }}
      >
        {/* soft highlight overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background: isGold
              ? "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))"
              : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          }}
        />

        {/* glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-16 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isGold
              ? "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 55%)"
              : "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.14), transparent 55%)",
          }}
        />

        {/* quote mark */}
        <div className="relative">
          <div className="text-4xl leading-none text-white/95">“</div>

          <h4 className="mt-4 text-lg font-semibold tracking-tight sm:text-xl">{item.name}</h4>

          <p className="mt-4 text-sm leading-7 text-white/85 sm:text-base">{item.text}</p>
        </div>

        {/* bottom hairline */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/15" />
      </div>
    </motion.div>
  );
}
