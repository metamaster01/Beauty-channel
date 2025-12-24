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
      <nav className="fixed top-0 left-0 w-full z-50">

        <div
          className="
            mx-auto max-w-7xl
            px-6 md:px-10
            pt-6
          "
        >
          <div
            className="
              flex items-center justify-between
              rounded-2xl
              px-6 py-4
              bg-[#b79a45]/70
              backdrop-blur-md
            "
          >
            {/* LOGO */}
            <Link href="/" className="relative w-[170px] h-[40px]">
              <Image
                src="/beautylogo.png"
                alt="Beauty Logo"
                fill
                priority
                className="object-contain object-left"
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
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-50 w-[85%] sm:w-[360px]"
            >
              <div className="h-full bg-[#7D271A] px-8 py-8 flex flex-col">
                {/* Close */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white text-2xl"
                  >
                    <X />
                  </button>
                </div>

                {/* Links */}
                <nav className="mt-10 flex flex-col gap-6 text-white text-lg">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Services", href: "/services" },
                    { name: "Products", href: "/products" },
                    { name: "Contact", href: "/contact" },
                    { name: "Blogs", href: "/blogs" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="hover:opacity-80 transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* CTA */}
                <div className="mt-auto pt-8">
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="
                      block text-center
                      bg-[#F1D06B]
                      text-[#5A3A10]
                      font-semibold
                      py-4 rounded-full
                      text-lg
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
