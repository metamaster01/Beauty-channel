"use client";

import Advertisement from "@/components/advertisement";
import AppointmentHero from "@/components/appoinment";
import BeautyMarquee from "@/components/beautymarquee";
import ContactFAQMock from "@/components/contactfaqmock";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import WhyChoose from "@/components/whychoose";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="relative w-full min-h-screen bg-[#0B0B0B] text-white overflow-hidden">
        {/* ===== Animated Luxury Background ===== */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#B08D3C]/20 blur-[140px]"
            animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#B08D3C]/10 blur-[160px]"
            animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14 pt-36 pb-32">
          {/* Breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-gray-400 mb-6"
          >
            Home / About us
          </motion.p>

          {/* PAGE TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-[PP Neue Montreal] tracking-wide"
          >
            ABOUT US
          </motion.h1>

          {/* ================= WHERE BEAUTY ================= */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#B08D3C] text-xl md:text-2xl font-medium"
            >
              Where Beauty Meets Confidence
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5 text-gray-300 leading-relaxed text-[15px] md:text-[16px]"
            >
              <p>
                At Neelu Beauty, we believe beauty is not about perfection —
                it’s about feeling confident in your own skin. Our goal is to
                enhance your natural beauty while giving you a relaxing,
                luxurious experience every time you visit.
              </p>

              <p>
                With a passion for creativity and precision, Neelu Beauty offers
                personalized beauty services designed to suit your unique style,
                skin type, and preferences. Whether it’s a simple self-care
                session or a complete makeover, we make sure you leave feeling
                refreshed, confident, and beautiful.
              </p>
            </motion.div>
          </div>

          {/* ================= OUR STORY ================= */}
          <div className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#B08D3C] text-xl md:text-2xl font-medium"
            >
              Our Story
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5 text-gray-300 leading-relaxed text-[15px] md:text-[16px]"
            >
              <p>
                Neelu Beauty was founded with a simple vision — to create a
                space where clients feel cared for, understood, and truly
                valued. What started as a passion for beauty has grown into a
                trusted destination for high-quality salon services, modern
                techniques, and professional care.
              </p>

              <p>
                We combine expert skills, premium products, and a client-first
                approach to deliver results you’ll love — every single time.
              </p>
            </motion.div>
          </div>

          {/* ================= WHAT WE OFFER ================= */}
          <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* LEFT LIST */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#B08D3C] text-xl md:text-2xl font-medium mb-8">
                What We Offer
              </h2>

              <ul className="space-y-4 text-gray-300 text-[15px] md:text-[16px]">
                <li>• Skincare & facial treatments</li>
                <li>• Makeup for all occasions</li>
                <li>• Hair care & styling services</li>
                <li>• Bridal & party makeovers</li>
                <li>• Personalized beauty consultations</li>
              </ul>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full h-[200px] sm:h-[380px] md:h-[320px] lg:h-[320px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/salon.png"
                alt="Our Salon"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <WhyChoose />
      <Advertisement />
      <AppointmentHero />
      <ContactFAQMock />
      <Advertisement />
      <Footer />
    </>
  );
}
