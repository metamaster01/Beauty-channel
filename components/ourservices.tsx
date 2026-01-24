"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Hair Care",
    desc: "Professional haircuts, styling, coloring, and nourishing treatments for smooth, healthy, and stunning hair.",
    img: "/haircare.jpg",
    Highlight: true,
    
  },
  {
    title: "Skin Treatments",
    desc: "Custom facials and advanced skincare rituals to hydrate, brighten, and rejuvenate your skin from within.",
    img: "/skin.png",
    Highlight: false,
    
  },
  {
    title: "Makeup Artistry",
    desc: "From subtle glam to bridal elegance, our artists create flawless, long-lasting looks for every occasion.",
    img: "/close.jpg",
    Highlight: false,
  },
  {
    title: "Nails & Hand–Foot Care",
    desc: "Luxurious manicures, pedicures, gel nails, and creative nail art for perfectly polished hands and feet.",
    img: "/nail.png",
  },
  {
    title: "Spa & Wellness",
    desc: "Relaxing massages, body polishing, and aromatherapy rituals designed to refresh your mind and body.",
    img: "/spa.jpg",
    Highlight: false,
  },
  {
    title: "Bridal & Pre-Bridal Packages",
    desc: "Complete beauty preparation with skin rituals, hair treatments, and stunning bridal makeup for your big day.",
    img: "/bridal.jpg",
  },
];

export default function OurServices() {
  return (
    <section className="w-full bg-[#0F0F0F] py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center items-center gap-2 text-sm text-white font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B08D3C]" />
            Our Services
          </div>

          <h2 className="text-3xl md:text-[40px] font-medium text-white">
            Experience beauty crafted with precision.
          </h2>

          <p className="mt-4 text-white max-w-2xl mx-auto text-sm md:text-base">
            From expert hair transformations to luxurious skin rituals, we offer
            a complete range of beauty solutions designed to enhance your
            natural glow.
          </p>
        </motion.div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.1, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            
              className={`
                group rounded-3xl overflow-hidden 
                border border-gray-200
                ${service.Highlight ? "bg-[#C77B58]" : "bg-[#1D1D1D]"}
                shadow-sm hover:shadow-xl transition hover:bg-[#B08D3C]
              `}
            >
              {/* IMAGE */}
              <div className="relative w-full h-[220px]">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col h-[240px]">
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    service.Highlight ? "text-white" : "text-white"
                  }`}
                >
                  {service.title}
                </h3>

                <p
                  className={`text-sm leading-relaxed flex-grow ${
                    service.Highlight
                      ? "text-white/200"
                      : "text-white"
                  }`}
                >
                  {service.desc}
                </p>

                <Link
                  href="/booking"
                  className={`
                    mt-6 inline-flex justify-center items-center
                    rounded-full px-5 py-2 text-sm font-medium
                    transition
                    ${
                      service.Highlight
                        ? "bg-white text-[#C77B58]"
                        : "border border-gray-400 text-white hover:bg-black hover:text-white"
                    }
                  `}
                >
                  Book now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
