"use client";

import React from "react";
import { motion } from "framer-motion";

type FeedbackItem = {
  name: string;
  text: string;
  variant: "light" | "dark";
};

const feedbacks: FeedbackItem[] = [
  {
    name: "Emily Wilson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "light",
  },
  {
    name: "Sarah Thompson",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "dark",
  },
  {
    name: "Olivia Martinez",
    text: "I recently purchased the Glossom Glow Serum and I'm absolutely in love with it! My skin feels so hydrated and radiant.",
    variant: "light",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

function FeedbackCard({
  item,
  index,
}: {
  item: FeedbackItem;
  index: number;
}) {
  const isDark = item.variant === "dark";

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      className="relative"
    >
      <div
        className={`relative rounded-2xl px-12 py-10 overflow-hidden transition-all duration-300 ${
          isDark
            ? "text-white shadow-[0_25px_60px_rgba(186,108,78,0.35)]"
            : "bg-[#f3e4e6] text-[#1f1f1f] shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
        }`}
        style={isDark ? { backgroundColor: "#B08D3C" } : undefined}
      >
        {/* overlay */}
        {isDark && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: "#B08D3C21" }}
            aria-hidden
          />
        )}

        {/* decorative glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition duration-300 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <span
          className={`absolute left-9 top-7 text-6xl leading-none transition-transform duration-300 group-hover:scale-110 ${
            isDark ? "text-white/90" : "text-black/70"
          }`}
          aria-hidden
        >
          “
        </span>

        <div className="relative pt-12">
          <h4 className="text-xl font-semibold tracking-tight">{item.name}</h4>

          <p
            className={`mt-6 text-base leading-7 ${
              isDark ? "text-white/90" : "text-black/70"
            }`}
          >
            {item.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Feedback() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-semibold"
        >
          Feedback Corner
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {feedbacks.map((item, index) => (
            <div
              key={item.name}
              className="w-full max-w-xl md:max-w-[420px] lg:max-w-[480px]"
            >
              <FeedbackCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
