// "use client";

// import { motion } from "framer-motion";

// const TEXT = "Claim your 10% discount on your first visit";

// function Marquee({ reverse = false, bg, z, opacity = 1 }) {
//   return (
//     <motion.div
//       initial={{ x: reverse ? "-50%" : "0%" }}
//       animate={{ x: reverse ? "0%" : "-50%" }}
//       transition={{
//         repeat: Infinity,
//         repeatType: "loop",
//         duration: reverse ? 22 : 18,
//         ease: "linear",
//       }}
//       className={`
//         absolute left-[-25%] w-[200%]
//         py-4 flex items-center
//         ${bg} ${z}
//       `}
//       style={{ opacity }}
//     >
//       <div className="flex w-full whitespace-nowrap">
//         {/* DOUBLE CONTENT = NO GAP */}
//         {[...Array(2)].map((_, block) => (
//           <div key={block} className="flex gap-12 px-6">
//             {[...Array(8)].map((_, i) => (
//               <span
//                 key={i}
//                 className="flex items-center gap-8 text-white text-sm md:text-base font-medium"
//               >
//                 <span className="w-8 h-[1.5px] bg-white" />
//                 {TEXT}
//               </span>
//             ))}
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default function Offer() {
//   return (
//     <section className="relative w-full bg-white overflow-hidden py-16">
//       <div className="relative h-[180px]">

//         {/* BACK STRIP (LIGHT, BEHIND) */}
//         <div className="absolute inset-0 rotate-[6deg]">
//           <Marquee
//             reverse
//             bg="bg-[#E4B19B]"
//             z="z-10"
//             opacity={0.75}
//           />
//         </div>

//         {/* FRONT STRIP (DARK, ON TOP) */}
//         <div className="absolute inset-0 rotate-[-6deg]">
//           <Marquee
//             bg="bg-[#C77B58]"
//             z="z-20"
//             opacity={1}
//           />
//         </div>

//       </div>
//     </section>
//   );
// }
