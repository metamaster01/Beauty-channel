// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, ArrowRight } from "lucide-react";

// export default function Hero() {
//   const [open, setOpen] = useState(false);

//   return (
//     <section
//       className="relative w-full overflow-hidden"
//       style={{
//         background:
//           " linear-gradient(180deg, #B08D3C 0%, #0F0F0F 68.83%)",
//       }}
//     >
//       {/* HEADER */}
//       <header className="absolute top-0 left-0 w-full z-20 px-6 md:px-10 lg:px-12 py-5 flex items-center justify-between">
       
//       <Link
//   href="/"
//   className="
//     relative
//     flex items-center
//     shrink-0
//     w-[280px] h-[52px]
//     sm:w-[200px] sm:h-[56px]
//     md:w-[220px] md:h-[60px]
//     lg:w-[240px] lg:h-[64px]
//   "
// >
//   <Image
//     src="/beautylogo.png"
//     alt="Beauty Logo"
//     fill
//     priority
//     sizes="(max-width: 640px) 180px,
//            (max-width: 768px) 200px,
//            (max-width: 1024px) 320px,
//            240px"
//     className="object-contain object-left scale-[2.25] origin-left"

//   />
// </Link>



//         <button
//   type="button"
//   onClick={() => setOpen(true)}
//   className="
//     relative z-50
//     flex items-center gap-2
//     text-white uppercase
//     text-xs md:text-sm
//     tracking-widest
//     cursor-pointer
//     touch-manipulation
//   "
// >
//   Menu <Menu size={20} />
// </button>

//       </header>

//       {/* HERO CONTENT */}
//       <div
//         className="
//           relative z-10 max-w-7xl mx-auto
//           px-6 md:px-10 lg:px-12
//           h-screen
//           grid grid-cols-1 md:grid-cols-2
//           items-center
//           gap-10 md:gap-8 lg:gap-10
//           pt-24 md:pt-28 lg:pt-0
//         "
//       >
//         {/* LEFT TEXT */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="text-white text-center md:text-left   "
//         >
          
//             <h1 className="text-4xl  sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-[PP Neue Montreal]  leading-tight">
//               Experience
//               <br />
//               Beauty. Feel
//             </h1>

//             <span className="block    mt-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-[Cursive] italic">
//               Confident.
//             </span>
          

//           {/* Buttons */}
//           <div className="mt-8 flex flex-col sm:flex-row md:flex-row justify-center md:justify-start gap-4">
//             <Link
//               href="/booking"
//               className="inline-flex justify-center items-center gap-2 bg-white text-[#7D271A] px-6 py-3 rounded-full text-sm font-medium  hover:bg- #7D271A-500 transition"
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

//         {/* RIGHT IMAGE */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="
//             relative w-full
//             h-[360px]
//             sm:h-[480px]
//             md:h-[520px]
//             lg:h-[590px]
//             xl:h-[760px]
//           "
//         >
//           <Image
//             src="/womenmodel.png"
//             alt="Beauty Model"
//             fill
//             priority
//             className="object-contain object-center md:object-right"
//           />
//         </motion.div>
//       </div>

      
//       {/* RIGHT MENU */}
// <AnimatePresence>
//   {open && (
//     <>
//       {/* Overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.45 }}
//         exit={{ opacity: 0 }}
//         onClick={() => setOpen(false)}
//         className="fixed inset-0 bg-black z-30"
//       />

//       {/* Drawer */}
//       <motion.aside
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//        className="fixed inset-y-0 right-0 z-40 w-[85%] sm:w-[360px]"

//       >
//         <div className="h-full bg-gradient-to-b from-[#7D271A] to-[#5F1E15] rounded-l-3xl px-6 py-8 flex flex-col">

//           {/* Close */}
//           <div className="flex justify-end">
//             <button
//               onClick={() => setOpen(false)}
//               className="text-white text-2xl hover:opacity-70 transition"
//             >
//               ✕
//             </button>
//           </div>

//           {/* NAV LINKS */}
//           <nav className="mt-10 flex flex-col gap-6 text-white">
//             {[
//               { name: "Home", href: "/", icon: "🏠" },
//               { name: "About", href: "/about", icon: "✨" },
//               { name: "Services", href: "/services", icon: "🧴" },
              
//               { name: "Contact", href: "/contact", icon: "📞" },
              
//             ].map((item) => (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={`
//                   flex items-center gap-4 px-4 py-3 rounded-xl
//                   text-lg font-medium
//                   transition
//                   ${
//                     item.active
//                       ? "bg-white/15"
//                       : "hover:bg-white/10"
//                   }
//                 `}
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* CTA BUTTON */}
//           <div className="mt-auto pt-8">
//             <Link
//               href="/booking"
//               onClick={() => setOpen(false)}
//               className="
//                 block w-full text-center
//                 bg-gradient-to-r from-[#F5D98B] to-[#E6B65C]
//                 text-[#5F1E15]
//                 font-semibold
//                 py-4 rounded-full
//                 text-lg
//                 hover:opacity-90
//                 hover:bg-#F5D98B-600
//                 transition
//               "
//             >
//               Book Your Session
//             </Link>
//           </div>
//         </div>
//       </motion.aside>
//     </>
//   )}
// </AnimatePresence>

//     </section>
//   );
// }




"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #B08D3C 0%, #0F0F0F 68.83%)",
      }}
    >
      {/* HERO CONTENT */}
      <div
        className="
          relative z-10 max-w-7xl mx-auto
          px-6 md:px-10 lg:px-12
          h-screen
          grid grid-cols-1 md:grid-cols-2
          items-center
          gap-10 md:gap-8 lg:gap-10
          pt-24 md:pt-28 lg:pt-32
        "
      >
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-white text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-[PP Neue Montreal] leading-tight">
            Experience
            <br />
            Beauty. Feel
          </h1>

          <span className="block mt-2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-[Cursive] italic">
            Confident.
          </span>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              href="/booking"
              className="inline-flex justify-center items-center gap-2 bg-white text-[#7D271A] px-6 py-3 rounded-full text-sm font-medium transition hover:opacity-90"
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
            h-[360px]
            sm:h-[480px]
            md:h-[520px]
            lg:h-[590px]
            xl:h-[760px]
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
    </section>
  );
}

