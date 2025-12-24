"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Scissors,
  Sparkles,
  Crown,
  Paintbrush,
  Leaf,
  Hand,
} from "lucide-react";

const topBrands = [
  { name: "Opulence Hair Studio", icon: Scissors },
  { name: "Velvet Touch Skin Clinic", icon: Sparkles },
  { name: "Bridal Glam Academy", icon: Crown },
];

const bottomBrands = [
  { name: "Elite Nail Lounge", icon: Hand },
  { name: "Aura Wellness Spa", icon: Leaf },
  { name: "GlowUp Artists Network", icon: Paintbrush },
];

export default function AboutUs() {
  return (
    <section className="w-full bg-[#0F0F0F] py-14">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-[#FFFFFF] font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B08D3C]" />
              About us
            </div>

            <h2 className="text-[38px] leading-tight font-light text-[#FFFFFF] max-w-xl">
              We help people look & feel their most beautiful
              <br />
              {/* <span className="font-medium">most beautiful</span> */}
            </h2>

            <p className="mt-5 text-[#FFFFFF] max-w-lg leading-relaxed">
              Our salon believes confidence starts with self-care. With expert
              hair, skin, and makeup services, certified stylists, and premium
              products, we bring out your natural glow.
            </p>
          </motion.div>

          {/* RIGHT STATS */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-10 items-start"
          >
            <div className="border-l border-gray-400 pl-6">
              <h3 className="text-3xl font-semibold text-[#FFFFFF]">110+</h3>
              <p className="text-[#FFFFFF] mt-1">Clients Styled</p>
              <span className="text-sm italic text-[#FFFFFF]">All time</span>
            </div>

            <div className="border-l border-gray-400 pl-6">
              <h3 className="text-3xl font-semibold text-[#FFFFFF]">64</h3>
              <p className="text-[#FFFFFF] mt-1">Makeovers Completed</p>
              <span className="text-sm italic text-[#FFFFFF]">
                Bridal & Occasion
              </span>
            </div>
          </motion.div>
        </div>

        {/* ================= TRUSTED ROW ================= */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.1fr_2.9fr] gap-8 items-center">
          {/* LEFT TEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium text-[#FFFFFF] bg-[#1D1D1D] rounded-2xl  px-6 py-5 flex  "
          >
            Trusted by top beauty & wellness brands
          </motion.p>

          {/* RIGHT 3 CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {topBrands.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-[#1D1D1D] rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:shadow-lg transition"
                >
                  <span className="text-sm font-medium text-[#FFFFFF]">
                    {item.name}
                  </span>

                  <span className="w-10 h-10 rounded-full bg-[#B08D3C] flex items-center justify-center text-white">
                    <Icon size={18} />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM CARDS ================= */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bottomBrands.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-[#1D1D1D] rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:shadow-lg transition"
              >
                <span className="text-sm font-medium text-[#FFFFFF]">
                  {item.name}
                </span>

                <span className="w-10 h-10 rounded-full bg-[#B08D3C] flex items-center justify-center text-[#FFFFFF]">
                  <Icon size={18} />
                </span>
              </motion.div>
            );
          })}

          {/* Partner Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="bg-[#1D1D1D] rounded-2xl px-6 py-5 flex items-center justify-between border border-gray-400 "
          >
            <span className="text-sm font-medium text-[#FFFFFF]">
              Partner with us
            </span>
            <span className="w-10 h-10 rounded-full bg-[#B08D3C] flex items-center justify-center text-white">
              <ArrowRight size={16} />
            </span>
          </motion.div>
        </div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 mt-10 bg-[#B08D3C] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#AF6A4A] transition"
          >
            More about us <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
