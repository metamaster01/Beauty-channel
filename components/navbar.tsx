"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full md:w-[430px]  z-50">

        {/* <div
          className="
            mx-auto max-w-7xl
            px-8 md:px-10
            pt-6
          "
        > */}

        <div className="w-full px-4 sm:px-6 md:px-10 pt-4">
          {/* <div
            className="
              flex items-center justify-between
              rounded-2xl
              px-6 py-4
              bg-[#B08D3C]/60
              backdrop-blur-md
            "
          > */}

          <div
  className="
    flex items-center justify-between
    w-full
    rounded-2xl
    px-6 sm:px-8 md:px-40 lg:px-12
    py-6
    bg-[#B08D3C]/30
    backdrop-blur-md
  "
>
            {/* LOGO */}
            <Link href="/" className="relative w-[320px]  h-[40px] sm:h-[40px]">
              <Image
                src="/beautylogo.png"
                alt="Beauty Logo"
                fill
                priority
                className="object-contain object-left w-[320px] h-[100px]"
              />
            </Link>

            {/* MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="
                flex items-center gap-2
                text-white text-xs md:text-sm
                uppercase tracking-widest
                cursor-pointer
              "
            >
              Menu <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= DRAWER MENU ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.aside
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ duration: 0.45, ease: "easeOut" }}
  className="fixed inset-y-0 right-0 z-50 w-[88%] sm:w-[380px]"
>
  <div
    className="
      h-full
      flex flex-col
      px-8 pt-10 pb-8
      bg-white/55
      backdrop-blur-2xl
      border-l border-white/40
    "
  >
    {/* CLOSE */}
    <div className="flex justify-end mb-8">
      <button
        onClick={() => setOpen(false)}
        className="text-black text-2xl hover:rotate-90 transition duration-300"
      >
        <X />
      </button>
    </div>

    {/* LINKS */}
    <nav className="flex flex-col gap-3 text-black text-lg font-medium">
      {[
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Products", href: "/products" },
        { name: "Blogs", href: "/blogs" },
        { name: "Contact", href: "/contact" },
      ].map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpen(false)}
          className="
            group
            relative
            flex items-center
            w-full
            px-6 py-4
            rounded-2xl
            transition-all duration-300
            hover:bg-gradient-to-r
            hover:from-black/5
            hover:to-black/10
            hover:translate-x-1
          "
        >
          <span className="transition-all duration-300 group-hover:tracking-wide">
            {item.name}
          </span>
        </Link>
      ))}
    </nav>

    {/* CTA */}
    <div className="mt-auto pt-10">
      <Link
        href="/booking"
        onClick={() => setOpen(false)}
        className="
          block w-full text-center
          bg-[#B08D3C]
          text-[#5A3A10]
          font-semibold
          py-4 rounded-full
          text-lg
          hover:scale-[1.03]
          hover:shadow-xl
          transition-all duration-300
        "
      >
        Book Your Session
      </Link>
    </div>
  </div>
</motion.aside>

          </>
        )}
      </AnimatePresence>
    </>
  );
}
