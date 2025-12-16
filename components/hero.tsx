"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ArrowRight } from "lucide-react";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #7D271A 0%, #BA6C4E 100%)",
      }}
    >
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-10 lg:px-12 py-5 flex items-center justify-between">
       <Link
  href="/"
  className="
    relative block
    w-[200px] h-[50px]
    sm:w-[180px] sm:h-[55px]
    md:w-[200px] md:h-[60px]
  "
>
  <Image
    src="/beautylogo.png"
    alt="Beauty Logo"
    fill
    priority
    className="object-contain"
  />
</Link>


        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-white uppercase text-xs md:text-sm tracking-widest"
        >
          Menu <Menu size={20} />
        </button>
      </header>

      {/* HERO CONTENT */}
      <div
        className="
          relative z-10 max-w-7xl mx-auto
          px-6 md:px-10 lg:px-12
          h-screen
          grid grid-cols-1 md:grid-cols-2
          items-center
          gap-10 md:gap-8 lg:gap-10
          pt-24 md:pt-28 lg:pt-0
        "
      >
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white text-center md:text-left"
        >
          <Link href="/" className="block">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight">
              Experience
              <br />
              Beauty. Feel
            </h1>

            <span className="block mt-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-[cursive] italic">
              Confident.
            </span>
          </Link>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row md:flex-row justify-center md:justify-start gap-4">
            <Link
              href="/booking"
              className="inline-flex justify-center items-center gap-2 bg-white text-[#7D271A] px-6 py-3 rounded-full text-sm font-medium hover:bg-opacity-90 transition"
            >
              Book now <ArrowRight size={16} />
            </Link>

            <Link
              href="/services"
              className="inline-flex justify-center items-center gap-2 border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[#7D271A] transition"
            >
              View services
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            relative w-full
            h-[260px]
            sm:h-[360px]
            md:h-[420px]
            lg:h-[590px]
            xl:h-[720px]
          "
        >
          <Image
            src="/womenmodel.png"
            alt="Beauty Model"
            fill
            priority
            className="object-contain object-center md:object-right"
          />
        </motion.div>
      </div>

      {/* RIGHT MENU */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-30"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-4 right-4 md:top-6 md:right-6 z-40"
            >
              <div className="relative bg-[#7D271A] rounded-3xl px-8 py-8 w-[230px] md:w-[260px] shadow-2xl">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-4 text-white text-xl hover:opacity-70"
                >
                  ✕
                </button>

                <nav className="mt-6 flex flex-col gap-5 text-base md:text-lg font-light tracking-wide text-[#F6E7DE]">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Services", href: "/services" },
                    { name: "Booking", href: "/booking" },
                    { name: "Contact", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group relative w-fit"
                    >
                      <span className="group-hover:text-[#FFD6C9] transition">
                        {item.name}
                      </span>
                      <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-[#FFD6C9] transition-all group-hover:w-full" />
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
