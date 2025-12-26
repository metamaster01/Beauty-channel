

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



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const models = ["/wmodel.png", "/wmodel2.png", "/wmodel3.png"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % models.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // scroll parallax
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 300], [0, -40]);
  const imageY = useTransform(scrollY, [0, 300], [0, 30]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #B08D3C 0%, #0F0F0F 70%)",
      }}
    >
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-14">

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] items-center gap-10">

            {/* ================= LEFT TEXT ================= */}
            <motion.div
              style={{ y: textY }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="
                text-white
                text-left
                max-w-[540px]
                pt-30 sm:pt-44 md:pt-28 lg:pt-0 md:mt-21 md:text-center lg:text-left
              "
            >
              <h1 className="
                font-[PP Neue Montreal]
                text-[38px]
                sm:text-[44px]
                md:text-[48px]
                lg:text-[56px]
                xl:text-[64px]
                leading-[1.1]
                tracking-tight
              ">
                Experience
                <br />
                Beauty. Feel
              </h1>

              <span className="
                block mt-3
                font-[Cursive]
                italic
                text-[34px]
                sm:text-[38px]
                md:text-[42px]
                lg:text-[48px]
              ">
                Confident.
              </span>

              <p className="
                mt-6
                max-w-md
                text-[15px]
                sm:text-[16px]
                text-white/80
                leading-relaxed
              ">
                Personalized beauty experiences crafted to elevate how you look
                and feel — every single day.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="
                    inline-flex items-center gap-2
                    bg-[#B08D3C]
                    text-[#7D271A]
                    px-6 py-3
                    rounded-full
                    text-sm font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  Book now <ArrowRight size={16} />
                </Link>

                <Link
                  href="/services"
                  className="
                    inline-flex items-center gap-2
                    border border-white/70
                    text-white
                    px-6 py-3
                    rounded-full
                    text-sm font-medium
                    hover:bg-white hover:text-[#7D271A]
                    transition
                  "
                >
                  View services
                </Link>
              </div>
            </motion.div>

            {/* ================= RIGHT IMAGE ================= */}
            <motion.div
              style={{ y: imageY }}
              className="
                relative
                h-[380px]
                sm:h-[460px]
                md:h-[560px]
                lg:h-[720px]
                xl:h-[780px]
                flex justify-end
                w-full
              "
            >
              {/* glow */}
              <div className="
                absolute inset-0
                rounded-full
                bg-[#B08D3C]/20
                blur-[120px]
                opacity-60
              " />

              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={models[index]}
                    alt="Beauty Model"
                    fill
                    priority
                    className="
                  object-contain
                  
                  lg:translate-x-50
                  md:object-center md:w-[430px]  object-center
  w-full
  scale-[1.15]
  sm:scale-[1.1]
  md:scale-120
  lg:object-right
                "
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
