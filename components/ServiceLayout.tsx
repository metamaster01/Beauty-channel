"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ServiceLayout({ service }: { service: any }) {
  const s = service;

  return (
    <section className="bg-black text-white overflow-hidden">

      {/* ============ HERO ============ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full "
        >
          <p className="text-sm text-gray-400 mb-4">Home / Services</p>

          <p className="text-[#B08D3C] uppercase text-xs tracking-[0.25em] mb-3">
            {s.hero_subtitle}
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-[64px] font-[PP Neue Montreal] leading-tight mb-6">
            {s.hero_title}
          </h1>

          <p className="text-gray-300 max-w-xl mb-12">
            {s.hero_desc}
          </p>

          <a
            href={`/booking?service=${s.slug}`}
            className="inline-block bg-[#B08D3C] text-black px-8 py-3 rounded-full hover:scale-105 transition"
          >
            Book Hair Appointment
          </a>
        </motion.div>
      </div>

      {/* ============ ABOUT (FULL WIDTH) ============ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="flex items-center gap-2 text-[#B08D3C] text-xl mb-4">
            🍃 {s.about_title}
          </h2>

          <p className="text-gray-300 leading-relaxed">
            {s.about_desc}
          </p>
        </motion.div>
      </div>

      {/* ============ WHY + IMAGE GRID ============ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT - WHY */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[#B08D3C] mb-6">
            Why Choose Our {s.hero_title} Services?
          </h3>

          <ul className="space-y-3 text-gray-300">
            {s.why_points.map((p: string, i: number) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-2"
              >
                <span className="text-[#B08D3C]">•</span>
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT - IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src={s.gallery_image}
            alt=""
            fill
            className="object-cover hover:scale-105 transition duration-700"
          />
        </motion.div>
      </div>

      {/* ============ SERVICES GRID ============ */}
      <div className="bg-[#B08D3C] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black text-3xl md:text-4xl mb-12"
          >
            Our {s.hero_title}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {s.cards.map((c: any, i: number) => (
              <motion.div
                key={c.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-black text-white p-6 rounded-xl hover:-translate-y-2 transition shadow-xl"
              >
                <p className="text-[#B08D3C] text-sm mb-1">{c.no}</p>
                <h3 className="mb-2 text-lg">{c.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
