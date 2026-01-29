"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Advertisement from "@/components/advertisement";
import BeautyMarquee from "@/components/beautymarquee";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contact").insert([form]);

    setLoading(false);
    if (!error) {
      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <>
    <Navbar/>
    <section className="relative min-h-screen bg-[#0B0B0B] text-white overflow-hidden">

      {/* GOLD GLOW */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#B08D3C]/20 blur-[200px] rounded-full"
          animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ===== LEFT FORM CARD ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gray backdrop-blur-xl rounded-3xl p-4 md:p-6  lg:-mr-52 lg:-mt-12  z-10  max-w-[700px] shadow-2xl border border-white/10"

//         className="
//   relative z-10
//   bg-white/5 backdrop-blur-xl
//   rounded-3xl
//   p-6 md:p-7
//   shadow-2xl
//   border border-white/10

//   max-w-[700px]
//   lg:-mr-52 lg:-mt-12
//   lg:absolute lg:left-0
// "
        >
          <p className="text-sm text-gray-400 mb-4">Home / Contact</p>

          <h2 className="text-3xl md:text-4xl font-[PP Neue Montreal] leading-tight mb-6">
            GET IN TOUCH WITH US. <br /> WE’RE HERE TO ASSIST YOU.
          </h2>

          {/* SOCIAL */}
          <div className="flex gap-4 mb-8">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B08D3C] hover:text-black transition"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              type="email"
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number (optional)"
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows={3}
              className="w-full bg-transparent border-b border-white/20 py-3 outline-none resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex items-center gap-2 bg-[#B08D3C] text-black px-6 py-3 rounded-full hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Leave us a Message →"}
            </button>

            {success && (
              <p className="text-green-400 text-sm mt-3">
                Message sent successfully💛
              </p>
            )}
          </form>
        </motion.div>

       {/* ===== RIGHT IMAGE WITH GOLD BG ===== */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
//   className="relative w-full h-[420px] md:h-[560px] lg:h-[680px]"
className="relative w-full h-[460px] md:h-[620px] lg:h-[760px]"
>
  {/* GOLDEN BACK CARD */}
  <div className="absolute inset-0 rounded-3xl bg-[#B08D3C] translate-x-1 translate-y-0 mb-8 " />

  {/* IMAGE LAYER */}
  
   <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl -translate-y-8">
  <Image
    src="/contactimg.png"
    alt="Contact Model"
    fill
    className="object-cover scale-x-[-1]"
  />
</div>
 
</motion.div>
      </div>

      <div className="w-full bg-black py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">

        {/* LEFT BIG TEXT */}
        <div>
          <p className="text-sm text-gray-400 mb-4">Contact Info</p>

          <h3 className="text-3xl md:text-5xl lg:text-4xl font-[PP Neue Montreal] text-white leading-tight">
            We are always happy to assist you
          </h3>
        </div>

        {/* EMAIL */}
        <div className="space-y-4">
          <p className="text-lg text-white font-medium">Email Address</p>
          <span className="block w-8 h-[2px] bg-white" />

          <p className="text-white">chakra@gmail.com</p>

          <p className="text-sm text-gray-400 leading-relaxed">
            Assistance hours:
            <br />
            Monday – Saturday 6 am <br />
            to 8 pm EST
          </p>
        </div>

        {/* NUMBER */}
        <div className="space-y-4">
          <p className="text-lg text-white font-medium">Number</p>
          <span className="block w-8 h-[2px] bg-white" />

          <p className="text-white">+91 98765 43210</p>

          <p className="text-sm text-gray-400 leading-relaxed">
            Assistance hours:
            <br />
            Monday – Saturday 6 am <br />
            to 8 pm EST
          </p>
        </div>

      </div>
    </div>
    </section>
<BeautyMarquee/>
    <Footer/>
    </>
  );
}