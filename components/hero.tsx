// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const models = [
//   "/wmodel.png",
//   "/wmodel2.png",
//   "/wmodel3.png",
// ];

// export default function Hero() {
//   const [index, setIndex] = useState(0);

//   // Auto rotate images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % models.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       className="relative w-full overflow-hidden"
//       style={{
//         background:
//           "linear-gradient(180deg, #B08D3C 0%, #0F0F0F 68.83%)",
//       }}
//     >
//       {/* HERO CONTENT */}
//       <div
//         className="
//           relative z-10 max-w-7xl mx-auto
//           px-6 md:px-10 lg:px-12
//           h-screen
//           grid grid-cols-1 md:grid-cols-2
//           items-start
//           gap-10 md:gap-8 lg:gap-10
//           pt-24 md:pt-28 lg:pt-32
//         "
//       >
//         {/* LEFT TEXT */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="
//             text-white text-center md:text-left
//             max-w-[520px]
// md:mt-0 lg:mt-28 xl:mt-32
//           "
//         >
//           <h1 className="text-4xl mt-6 md:text-4xl lg:text-5xl xl:text-6xl font-[PP Neue Montreal] leading-tight">
//             Experience
//             <br />
//             Beauty. Feel
//           </h1>

//           <span className="block mt-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[Cursive] italic">
//             Confident.
//           </span>

//           {/* Buttons */}
//           <div className="mt-14 flex flex-col sm:flex-row justify-center md:justify-start gap-6">
//             <Link
//               href="/booking"
//               className="inline-flex justify-center items-center gap-2 bg-[#B08D3C] text-[#7D271A] px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
//             >
//               Book now <ArrowRight size={16} />
//             </Link>

//             <Link
//               href="/services"
//               className="inline-flex justify-center items-center gap-2 border border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[#7D271A] transition"
//             >
//               View services
//             </Link>
//           </div>
//         </motion.div>

//         {/* RIGHT IMAGE CAROUSEL */}
//         <div
//           className="
//             relative w-full
//             h-[360px]
//             sm:h-[480px]
//             md:h-[520px]
//             lg:h-[590px]
//             xl:h-[760px]
//             flex justify-end
//           "
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="relative w-full h-full"
//             >
//               <Image
//                 src={models[index]}
//                 alt="Beauty Model"
//                 fill
//                 priority
// className="
//   object-contain
//   object-right
//   lg:translate-x-62
// "
//               />
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const models = ["/wmodel.png", "/wmodel2.png", "/wmodel3.png"];

// export default function Hero() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setIndex((p) => (p + 1) % models.length);
//     }, 4500);
//     return () => clearInterval(id);
//   }, []);

//   // scroll parallax
//   const { scrollY } = useScroll();
//   const textY = useTransform(scrollY, [0, 300], [0, -40]);
//   const imageY = useTransform(scrollY, [0, 300], [0, 30]);

//   return (
//     <section
//       className="relative w-full overflow-hidden"
//       style={{
//         background: "linear-gradient(180deg, #B08D3C 0%, #0F0F0F 70%)",
//       }}
//     >
//       <div className="relative z-10 min-h-screen flex items-center">
//         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
//           <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] items-center gap-10">
//             {/* ================= LEFT TEXT ================= */}
//             <motion.div
//               style={{ y: textY }}
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="
//                 text-white
//                 text-left
//                 max-w-[540px]
//                 pt-30 sm:pt-44 md:pt-28 lg:pt-0 md:mt-21 md:text-center lg:text-left
//               "
//             >
//               <h1
//                 className="
//                 font-[PP Neue Montreal]
//                 text-[38px]
//                 sm:text-[44px]
//                 md:text-[48px]
//                 lg:text-[56px]
//                 xl:text-[64px]
//                 leading-[1.1]
//                 tracking-tight
//               "
//               >
//                 Experience
//                 <br />
//                 Beauty. Feel
//               </h1>

//               <span
//                 className="
//                 block mt-3
//                 font-[Cursive]
//                 italic
//                 text-[34px]
//                 sm:text-[38px]
//                 md:text-[42px]
//                 lg:text-[48px]
//               "
//               >
//                 Confident.
//               </span>

//               <p
//                 className="
//                 mt-6
//                 max-w-md
//                 text-[15px]
//                 sm:text-[16px]
//                 text-white/80
//                 leading-relaxed
//               "
//               >
//                 Personalized beauty experiences crafted to elevate how you look
//                 and feel — every single day.
//               </p>

//               {/* CTA */}
//               <div className="mt-10 flex flex-wrap gap-4">
//                 <Link
//                   href="/booking"
//                   className="
//                     inline-flex items-center gap-2
//                     bg-[#B08D3C]
//                     text-[#7D271A]
//                     px-6 py-3
//                     rounded-full
//                     text-sm font-medium
//                     hover:opacity-90
//                     transition
//                   "
//                 >
//                   Book now <ArrowRight size={16} />
//                 </Link>

//                 <Link
//                   href="/services"
//                   className="
//                     inline-flex items-center gap-2
//                     border border-white/70
//                     text-white
//                     px-6 py-3
//                     rounded-full
//                     text-sm font-medium
//                     hover:bg-white hover:text-[#7D271A]
//                     transition
//                   "
//                 >
//                   View services
//                 </Link>
//               </div>
//             </motion.div>

//             {/* ================= RIGHT IMAGE ================= */}
//             <motion.div
//               style={{ y: imageY }}
//               className="
//                 relative
//                 h-[380px]
//                 sm:h-[460px]
//                 md:h-[560px]
//                 lg:h-[650px]
//                 xl:h-[780px]
//                 flex justify-end
//                 w-full
//               "
//             >
//               {/* glow */}
//               <div
//                 className="
//                 absolute inset-0
//                 rounded-full
//                 bg-[#B08D3C]/20
//                 blur-[120px]
//                 opacity-60
//               "
//               />

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: 60 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -40 }}
//                   transition={{ duration: 0.9, ease: "easeOut" }}
//                   className="absolute inset-0"
//                 >
//                   <Image
//                     src={models[index]}
//                     alt="Beauty Model"
//                     fill
//                     priority
//                     className="
//                   object-contain
                  
//                   lg:translate-x-50
//                   md:object-center md:w-[430px]  object-center
//   w-full
//   scale-[1.15]
//   sm:scale-[1.1]
//   md:scale-120
//   lg:object-right
//                 "
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }






"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* ================= VIDEO BACKGROUND ================= */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video-idea.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 lg:pb-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">
          <div className="flex flex-col items-center text-center">
            {/* Decorative Element */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Sparkles className="w-4 h-4 text-[#B08D3C]" />
                <span className="text-white/90 text-sm font-light tracking-wide">
                  Premium Beauty Experience
                </span>
              </div>
            </motion.div> */}

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white max-w-5xl"
            >
              <span
                className="
                  block
                  font-[Playfair_Display]
                  text-[42px]
                  sm:text-[56px]
                  md:text-[72px]
                  lg:text-[88px]
                  xl:text-[104px]
                  leading-[1.1]
                  tracking-tight
                  font-bold
                "
              >
                Where Beauty
              </span>
              <span
                className="
                  block
                  mt-2
                  font-[Great_Vibes]
                  text-[48px]
                  sm:text-[64px]
                  md:text-[80px]
                  lg:text-[96px]
                  xl:text-[112px]
                  text-[#D4AF37]
                  leading-[1.2]
                "
                style={{ fontWeight: 400 }}
              >
                Meets Confidence
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="
                mt-6
                max-w-2xl
                text-[16px]
                sm:text-[17px]
                md:text-[18px]
                text-white/85
                leading-relaxed
                font-light
              "
            >
              Transform your look with personalized treatments from our expert
              stylists. Experience luxury, elegance, and results that last.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                href="/booking"
                className="
                  group
                  inline-flex items-center justify-center gap-2
                  bg-[#D4AF37]
                  text-[#1a1a1a]
                  px-8 py-4
                  rounded-full
                  text-[15px]
                  font-semibold
                  tracking-wide
                  hover:bg-[#B08D3C]
                  transition-all
                  duration-300
                  shadow-lg shadow-[#D4AF37]/30
                  hover:shadow-xl hover:shadow-[#D4AF37]/40
                  hover:scale-105
                  w-full sm:w-auto
                "
              >
                Book Your Appointment
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/services"
                className="
                  group
                  inline-flex items-center justify-center gap-2
                  border-2 border-white/80
                  text-white
                  px-8 py-4
                  rounded-full
                  text-[15px]
                  font-semibold
                  tracking-wide
                  hover:bg-white
                  hover:text-[#1a1a1a]
                  hover:border-white
                  transition-all
                  duration-300
                  backdrop-blur-sm
                  bg-white/5
                  hover:scale-105
                  w-full sm:w-auto
                "
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-16 hidden md:block"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/60 text-xs uppercase tracking-widest font-light">
                  Scroll
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
                >
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
                </motion.div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </section>
  );
}