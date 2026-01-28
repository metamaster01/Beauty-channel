// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <nav className="fixed top-0 left-0 w-full   z-50">
//         {/* <div
//           className="
//             mx-auto max-w-7xl
//             px-8 md:px-10
//             pt-6
//           "
//         > */}

//         <div className="w-full px-4 sm:px-6 md:px-10 pt-4">
//           {/* <div
//             className="
//               flex items-center justify-between
//               rounded-2xl
//               px-6 py-4
//               bg-[#B08D3C]/60
//               backdrop-blur-md
//             "
//           > */}

//           <div
//             className="
//     flex items-center justify-between
//     w-full
//     rounded-2xl
//     px-6 sm:px-8 md:px-40 lg:px-12
//     py-6
//     bg-[#B08D3C]/30
//     backdrop-blur-md
//   "
//           >
//             {/* LOGO */}
//             <Link href="/" className="relative w-[320px]  h-[40px] sm:h-[40px]">
//               <Image
//                 src="/beautylogo.png"
//                 alt="Beauty Logo"
//                 fill
//                 priority
//                 className="object-contain object-left w-[320px] h-[100px]"
//               />
//             </Link>

//             {/* MENU BUTTON */}
//             <button
//               onClick={() => setOpen(true)}
//               className="
//                 flex items-center gap-2
//                 text-white text-xs md:text-sm
//                 uppercase tracking-widest
//                 cursor-pointer
//               "
//             >
//               Menu <Menu size={20} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ================= DRAWER MENU ================= */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.45 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setOpen(false)}
//               className="fixed inset-0 bg-black z-40"
//             />

//             {/* Drawer */}
//             <motion.aside
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.45, ease: "easeOut" }}
//               className="fixed inset-y-0 right-0 z-50 w-[88%] sm:w-[380px]"
//             >
//               <div
//                 className="
//       h-full
//       flex flex-col
//       px-8 pt-10 pb-8
//       bg-white/55
//       backdrop-blur-2xl
//       border-l border-white/40
//     "
//               >
//                 {/* CLOSE */}
//                 <div className="flex justify-end mb-8">
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="text-black text-2xl hover:rotate-90 transition duration-300"
//                   >
//                     <X />
//                   </button>
//                 </div>

//                 {/* LINKS */}
//                 <nav className="flex flex-col gap-3 text-black text-lg font-medium">
//                   {[
//                     { name: "Home", href: "/" },
//                     { name: "About", href: "/about" },
//                     { name: "Services", href: "/services" },
//                     { name: "Products", href: "/products" },
//                     { name: "Blogs", href: "/blogs" },
//                     { name: "Contact", href: "/contact" },
//                   ].map((item) => (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       onClick={() => setOpen(false)}
//                       className="
//             group
//             relative
//             flex items-center
//             w-full
//             px-6 py-4
//             rounded-2xl
//             transition-all duration-300
//             hover:bg-gradient-to-r
//             hover:from-black/5
//             hover:to-black/10
//             hover:translate-x-1
//           "
//                     >
//                       <span className="transition-all duration-300 group-hover:tracking-wide">
//                         {item.name}
//                       </span>
//                     </Link>
//                   ))}
//                 </nav>

//                 {/* CTA */}
//                 <div className="mt-auto pt-10">
//                   <Link
//                     href="/booking"
//                     onClick={() => setOpen(false)}
//                     className="
//           block w-full text-center
//           bg-[#B08D3C]
//           text-[#5A3A10]
//           font-semibold
//           py-4 rounded-full
//           text-lg
//           hover:scale-[1.03]
//           hover:shadow-xl
//           transition-all duration-300
//         "
//                   >
//                     Book Your Session
//                   </Link>
//                 </div>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }







// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, X, Heart, ShoppingCart, User, ChevronDown } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Change this based on actual auth state
  
//   // Mock data - replace with actual data from your state management
//   const cartCount = 3;
//   const wishlistCount = 5;

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close user menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (!target.closest(".user-menu-container")) {
//         setUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Products", href: "/products" },
//     { name: "Blog", href: "/blogs" },
//     { name: "Contact", href: "/contact" },
//   ];

//   const userMenuItems = [
//     { name: "My Account", href: "/account", icon: User },
//     { name: "Wishlist", href: "/wishlist", icon: Heart },
//     { name: "Cart", href: "/cart", icon: ShoppingCart },
//     { name: "My Orders", href: "/orders", icon: null },
//     { name: "Bookings", href: "/bookings", icon: null },
//   ];

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`
//           fixed top-0 left-0 w-full z-50
//           transition-all duration-500
//           ${
//             scrolled
//               ? "bg-[#B08D3C]/95 backdrop-blur-lg shadow-lg"
//               : "bg-transparent"
//           }
//         `}
//       >
//         <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
//           <div
//             className={`
//               flex items-center justify-between
//               w-full
//               rounded-2xl
//               px-4  lg:px-6
//               transition-all duration-500
//               ${
//                 scrolled
//                   ? "py-2 md:py-0 bg-transparent"
//                   : " mt-4 bg-[#B08D3C]/30 backdrop-blur-md"
//               }
//             `}
//           >
//             {/* LOGO */}
//             <Link
//               href="/"
//               className="relative w-[70px] sm:w-[75px] lg:w-[110px] h-[54px] sm:h-[64px] lg:h-[95px]"
//             >
//               <Image
//                 src="/beautylogo.png"
//                 alt="Beauty Logo"
//                 fill
//                 priority
//                 className="object-contain object-left"
//               />
//             </Link>

//             {/* DESKTOP ACTIONS */}
//             <div className="hidden lg:flex items-center gap-4 xl:gap-6">
//               {/* Wishlist Icon */}
//               <Link
//                 href="/wishlist"
//                 className="relative group"
//                 aria-label="Wishlist"
//               >
//                 <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300">
//                   <Heart
//                     className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
//                     strokeWidth={2}
//                   />
//                   {wishlistCount > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="absolute -top-1 -right-1 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
//                     >
//                       {wishlistCount}
//                     </motion.span>
//                   )}
//                 </div>
//               </Link>

//               {/* Cart Icon */}
//               <Link href="/cart" className="relative group" aria-label="Cart">
//                 <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300">
//                   <ShoppingCart
//                     className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
//                     strokeWidth={2}
//                   />
//                   {cartCount > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="absolute -top-1 -right-1 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
//                     >
//                       {cartCount}
//                     </motion.span>
//                   )}
//                 </div>
//               </Link>

//               {/* Login Button or User Menu */}
//               {!isLoggedIn ? (
//                 <Link
//                   href="/auth/login"
//                   className="
//                     px-6 py-2.5
//                     bg-white
//                     text-[#B08D3C]
//                     font-semibold
//                     rounded-full
//                     hover:bg-[#5A3A10]
//                     hover:text-white
//                     transition-all duration-300
//                     hover:scale-105
//                     hover:shadow-xl
//                   "
//                 >
//                   Login
//                 </Link>
//               ) : (
//                 <div className="relative user-menu-container">
//                   <button
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                     className="
//                       flex items-center gap-2
//                       px-4 py-2.5
//                       bg-white/10
//                       backdrop-blur-sm
//                       text-white
//                       font-medium
//                       rounded-full
//                       hover:bg-white/20
//                       transition-all duration-300
//                       border border-white/20
//                     "
//                   >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5A3A10] to-[#B08D3C] flex items-center justify-center">
//                       <User className="w-4 h-4 text-white" />
//                     </div>
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         userMenuOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* User Dropdown Menu */}
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="
//                           absolute right-0 top-full mt-2
//                           w-56
//                           bg-white
//                           rounded-2xl
//                           shadow-2xl
//                           overflow-hidden
//                           border border-gray-100
//                         "
//                       >
//                         {userMenuItems.map((item, index) => (
//                           <Link
//                             key={item.name}
//                             href={item.href}
//                             onClick={() => setUserMenuOpen(false)}
//                             className={`
//                               flex items-center gap-3
//                               px-5 py-3.5
//                               text-gray-700
//                               hover:bg-[#B08D3C]/10
//                               hover:text-[#5A3A10]
//                               transition-all duration-300
//                               ${
//                                 index !== userMenuItems.length - 1
//                                   ? "border-b border-gray-100"
//                                   : ""
//                               }
//                             `}
//                           >
//                             {item.icon && (
//                               <item.icon className="w-4 h-4" strokeWidth={2} />
//                             )}
//                             <span className="font-medium">{item.name}</span>
//                           </Link>
//                         ))}
//                         <button
//                           onClick={() => {
//                             setIsLoggedIn(false);
//                             setUserMenuOpen(false);
//                           }}
//                           className="
//                             w-full
//                             px-5 py-3.5
//                             text-left
//                             text-red-600
//                             hover:bg-red-50
//                             transition-all duration-300
//                             font-medium
//                           "
//                         >
//                           Logout
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Menu Button */}
//               <button
//                 onClick={() => setOpen(true)}
//                 className="
//                   flex items-center gap-2
//                   text-white text-sm
//                   uppercase tracking-widest
//                   px-4 py-2
//                   rounded-full
//                   hover:bg-white/10
//                   transition-all duration-300
//                 "
//               >
//                 Menu <Menu size={18} />
//               </button>
//             </div>

//             {/* MOBILE MENU BUTTON */}
//             <button
//               onClick={() => setOpen(true)}
//               className="lg:hidden flex items-center gap-2 text-white"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* ================= DRAWER MENU ================= */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={() => setOpen(false)}
//               className="fixed inset-0 bg-black z-40"
//             />

//             {/* Drawer */}
//             <motion.aside
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
//               className="fixed inset-y-0 right-0 z-50 w-[90%] sm:w-[420px] max-w-full"
//             >
//               <div
//                 className="
//                   h-full
//                   flex flex-col
//                   bg-gradient-to-br from-white via-[#FFF8F0] to-white
//                   backdrop-blur-2xl
//                   overflow-y-auto
//                 "
//               >
//                 {/* HEADER */}
//                 <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
//                   <div className="flex items-center justify-between px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-[#B08D3C]" />
//                       <span className="text-[#5A3A10] font-bold tracking-wider uppercase text-sm">
//                         Menu
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => setOpen(false)}
//                       className="
//                         p-2 rounded-full
//                         hover:bg-gray-100
//                         transition-all duration-300
//                         hover:rotate-90
//                       "
//                     >
//                       <X className="w-6 h-6 text-gray-700" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* USER SECTION (Mobile) */}
//                 <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-[#B08D3C]/5 to-transparent">
//                   {!isLoggedIn ? (
//                     <Link
//                       href="/login"
//                       onClick={() => setOpen(false)}
//                       className="
//                         flex items-center justify-center gap-2
//                         w-full
//                         px-6 py-3.5
//                         bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
//                         text-white
//                         font-semibold
//                         rounded-full
//                         hover:shadow-xl
//                         hover:scale-[1.02]
//                         transition-all duration-300
//                       "
//                     >
//                       <User className="w-5 h-5" />
//                       Login to Your Account
//                     </Link>
//                   ) : (
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5A3A10] to-[#B08D3C] flex items-center justify-center">
//                         <User className="w-7 h-7 text-white" />
//                       </div>
//                       <div>
//                         <p className="font-bold text-gray-800 text-lg">
//                           Welcome Back!
//                         </p>
//                         <p className="text-sm text-gray-600">
//                           user@example.com
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* QUICK ACTIONS (Mobile) */}
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <div className="grid grid-cols-2 gap-3">
//                     <Link
//                       href="/wishlist"
//                       onClick={() => setOpen(false)}
//                       className="
//                         flex flex-col items-center gap-2
//                         px-4 py-4
//                         bg-white
//                         rounded-xl
//                         border border-gray-200
//                         hover:border-[#B08D3C]
//                         hover:shadow-md
//                         transition-all duration-300
//                         relative
//                       "
//                     >
//                       <Heart className="w-6 h-6 text-[#B08D3C]" />
//                       <span className="text-sm font-medium text-gray-700">
//                         Wishlist
//                       </span>
//                       {wishlistCount > 0 && (
//                         <span className="absolute top-2 right-2 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                           {wishlistCount}
//                         </span>
//                       )}
//                     </Link>

//                     <Link
//                       href="/cart"
//                       onClick={() => setOpen(false)}
//                       className="
//                         flex flex-col items-center gap-2
//                         px-4 py-4
//                         bg-white
//                         rounded-xl
//                         border border-gray-200
//                         hover:border-[#B08D3C]
//                         hover:shadow-md
//                         transition-all duration-300
//                         relative
//                       "
//                     >
//                       <ShoppingCart className="w-6 h-6 text-[#B08D3C]" />
//                       <span className="text-sm font-medium text-gray-700">
//                         Cart
//                       </span>
//                       {cartCount > 0 && (
//                         <span className="absolute top-2 right-2 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                           {cartCount}
//                         </span>
//                       )}
//                     </Link>
//                   </div>
//                 </div>

//                 {/* NAVIGATION LINKS */}
//                 <nav className="flex-1 px-6 py-6">
//                   <div className="space-y-2">
//                     {navLinks.map((item, index) => (
//                       <motion.div
//                         key={item.name}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                       >
//                         <Link
//                           href={item.href}
//                           onClick={() => setOpen(false)}
//                           className="
//                             group
//                             relative
//                             flex items-center
//                             w-full
//                             px-5 py-4
//                             rounded-xl
//                             text-gray-800
//                             font-medium
//                             text-lg
//                             overflow-hidden
//                             transition-all duration-300
//                             hover:text-[#5A3A10]
//                           "
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#B08D3C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
//                           <span className="relative flex items-center gap-3">
//                             <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                             {item.name}
//                           </span>
//                         </Link>
//                       </motion.div>
//                     ))}

//                     {/* User Menu Items (when logged in on mobile) */}
//                     {isLoggedIn && (
//                       <>
//                         <div className="my-4 border-t border-gray-200" />
//                         {userMenuItems.map((item, index) => (
//                           <motion.div
//                             key={item.name}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: (navLinks.length + index) * 0.05 }}
//                           >
//                             <Link
//                               href={item.href}
//                               onClick={() => setOpen(false)}
//                               className="
//                                 group
//                                 relative
//                                 flex items-center gap-3
//                                 w-full
//                                 px-5 py-3.5
//                                 rounded-xl
//                                 text-gray-700
//                                 font-medium
//                                 overflow-hidden
//                                 transition-all duration-300
//                                 hover:text-[#5A3A10]
//                               "
//                             >
//                               <span className="absolute inset-0 bg-gradient-to-r from-[#B08D3C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
//                               <span className="relative flex items-center gap-3">
//                                 {item.icon && (
//                                   <item.icon
//                                     className="w-5 h-5 text-[#B08D3C]"
//                                     strokeWidth={2}
//                                   />
//                                 )}
//                                 {item.name}
//                               </span>
//                             </Link>
//                           </motion.div>
//                         ))}
//                       </>
//                     )}
//                   </div>
//                 </nav>

//                 {/* CTA SECTION */}
//                 <div className="sticky bottom-0 px-6 py-6 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200">
//                   <Link
//                     href="/booking"
//                     onClick={() => setOpen(false)}
//                     className="
//                       block w-full text-center
//                       bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
//                       text-white
//                       font-bold
//                       py-4 rounded-full
//                       text-lg
//                       hover:shadow-2xl
//                       hover:scale-[1.02]
//                       transition-all duration-300
//                       relative
//                       overflow-hidden
//                       group
//                     "
//                   >
//                     <span className="absolute inset-0 bg-gradient-to-r from-[#5A3A10] to-[#B08D3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
//                     <span className="relative">Book Your Session</span>
//                   </Link>

//                   {isLoggedIn && (
//                     <button
//                       onClick={() => {
//                         setIsLoggedIn(false);
//                         setOpen(false);
//                       }}
//                       className="
//                         w-full mt-3
//                         px-6 py-3
//                         text-red-600
//                         font-semibold
//                         rounded-full
//                         hover:bg-red-50
//                         transition-all duration-300
//                       "
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }






// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Menu,
//   X,
//   Heart,
//   ShoppingCart,
//   User,
//   ChevronDown,
//   Package,
//   Calendar,
//   UserCircle,
//   LogOut,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { supabase } from "@/lib/supabase/client";
// import { signOut } from "@/lib/supabase/auth";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export default function Navbar() {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userProfile, setUserProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // Mock data - replace with actual data from your state management
//   const cartCount = 3;
//   const wishlistCount = 5;

//   // Navigation links
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Products", href: "/products" },
//     { name: "Blog", href: "/blogs" },
//     { name: "Contact", href: "/contact" },
//   ];

//   // User menu items
//   const userMenuItems = [
//     { name: "My Account", href: "/account", icon: UserCircle },
//     { name: "My Bookings", href: "/bookings", icon: Calendar },
//     { name: "My Orders", href: "/orders", icon: Package },
//     { name: "Wishlist", href: "/wishlist", icon: Heart },
//     { name: "Cart", href: "/cart", icon: ShoppingCart },
//   ];

//   // Check authentication status on component mount
//   useEffect(() => {
//     checkAuth();

//     // Subscribe to auth changes
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       async (event, session) => {
//         if (event === "SIGNED_IN" && session) {
//           await loadUserProfile(session.user.id);
//           setIsLoggedIn(true);
//         } else if (event === "SIGNED_OUT") {
//           setIsLoggedIn(false);
//           setUserProfile(null);
//         }
//       }
//     );

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   // Check if user is authenticated
//   const checkAuth = async () => {
//     try {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (session?.user) {
//         setIsLoggedIn(true);
//         await loadUserProfile(session.user.id);
//       } else {
//         setIsLoggedIn(false);
//         setUserProfile(null);
//       }
//     } catch (error) {
//       console.error("Error checking auth:", error);
//       setIsLoggedIn(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load user profile from database
//   const loadUserProfile = async (userId: string) => {
//     try {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", userId)
//         .single();

//       if (error) throw error;
//       setUserProfile(data);
//     } catch (error) {
//       console.error("Error loading profile:", error);
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     try {
//       const { error } = await signOut();
//       if (error) {
//         toast.error("Logout failed");
//         return;
//       }

//       setIsLoggedIn(false);
//       setUserProfile(null);
//       setUserMenuOpen(false);
//       setOpen(false);
//       toast.success("Logged out successfully");
//       router.push("/");
//     } catch (error: any) {
//       toast.error(error.message || "Logout failed");
//     }
//   };

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close user menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (!target.closest(".user-menu-container")) {
//         setUserMenuOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   // Get user initials for avatar
//   const getUserInitials = () => {
//     if (userProfile?.full_name) {
//       return userProfile.full_name
//         .split(" ")
//         .map((n: string) => n[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2);
//     }
//     return "U";
//   };

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//         className={`
//           fixed top-0 left-0 w-full z-50
//           transition-all duration-500
//           ${
//             scrolled
//               ? "bg-[#B08D3C]/95 backdrop-blur-lg shadow-lg"
//               : "bg-transparent"
//           }
//         `}
//       >
//         <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
//           <div
//             className={`
//               flex items-center justify-between
//               w-full
//               rounded-2xl
//               px-4 lg:px-6
//               transition-all duration-500
//               ${
//                 scrolled
//                   ? "py-2 md:py-0 bg-transparent"
//                   : "mt-4 bg-[#B08D3C]/30 backdrop-blur-md"
//               }
//             `}
//           >
//             {/* LOGO */}
//             <Link
//               href="/"
//               className="relative w-[70px] sm:w-[75px] lg:w-[110px] h-[54px] sm:h-[64px] lg:h-[95px]"
//             >
//               <Image
//                 src="/beautylogo.png"
//                 alt="Beauty Logo"
//                 fill
//                 priority
//                 className="object-contain object-left"
//               />
//             </Link>

//             {/* DESKTOP ACTIONS */}
//             <div className="hidden lg:flex items-center gap-4 xl:gap-6">
//               {/* Wishlist Icon */}
//               <Link
//                 href="/wishlist"
//                 className="relative group"
//                 aria-label="Wishlist"
//               >
//                 <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300">
//                   <Heart
//                     className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
//                     strokeWidth={2}
//                   />
//                   {wishlistCount > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="absolute -top-1 -right-1 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
//                     >
//                       {wishlistCount}
//                     </motion.span>
//                   )}
//                 </div>
//               </Link>

//               {/* Cart Icon */}
//               <Link href="/cart" className="relative group" aria-label="Cart">
//                 <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300">
//                   <ShoppingCart
//                     className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
//                     strokeWidth={2}
//                   />
//                   {cartCount > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       className="absolute -top-1 -right-1 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
//                     >
//                       {cartCount}
//                     </motion.span>
//                   )}
//                 </div>
//               </Link>

//               {/* Login Button or User Menu */}
//               {loading ? (
//                 <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
//               ) : !isLoggedIn ? (
//                 <Link
//                   href="/auth/login"
//                   className="
//                     px-6 py-2.5
//                     bg-white
//                     text-[#B08D3C]
//                     font-semibold
//                     rounded-full
//                     hover:bg-[#5A3A10]
//                     hover:text-white
//                     transition-all duration-300
//                     hover:scale-105
//                     hover:shadow-xl
//                   "
//                 >
//                   Login
//                 </Link>
//               ) : (
//                 <div className="relative user-menu-container">
//                   <button
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                     className="
//                       flex items-center gap-2
//                       px-4 py-2.5
//                       bg-white/10
//                       backdrop-blur-sm
//                       text-white
//                       font-medium
//                       rounded-full
//                       hover:bg-white/20
//                       transition-all duration-300
//                       border border-white/20
//                     "
//                   >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5A3A10] to-[#B08D3C] flex items-center justify-center font-bold text-sm text-white">
//                       {getUserInitials()}
//                     </div>
//                     <ChevronDown
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         userMenuOpen ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   {/* User Dropdown Menu */}
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         className="
//                           absolute right-0 top-full mt-2
//                           w-64
//                           bg-white
//                           rounded-2xl
//                           shadow-2xl
//                           overflow-hidden
//                           border border-gray-100
//                         "
//                       >
//                         {/* User Info Header */}
//                         <div className="px-4 py-3 bg-gradient-to-br from-[#FFF8F0] to-white border-b border-gray-100">
//                           <p className="font-bold text-gray-800 truncate">
//                             {userProfile?.full_name || "User"}
//                           </p>
//                           <p className="text-sm text-gray-600 truncate">
//                             {userProfile?.email || "user@example.com"}
//                           </p>
//                         </div>

//                         {/* Menu Items */}
//                         <div className="py-2">
//                           {userMenuItems.map((item, index) => (
//                             <Link
//                               key={item.name}
//                               href={item.href}
//                               onClick={() => setUserMenuOpen(false)}
//                               className={`
//                                 flex items-center gap-3
//                                 px-5 py-3
//                                 text-gray-700
//                                 hover:bg-[#B08D3C]/10
//                                 hover:text-[#5A3A10]
//                                 transition-all duration-300
//                               `}
//                             >
//                               {item.icon && (
//                                 <item.icon className="w-5 h-5 text-[#B08D3C]" strokeWidth={2} />
//                               )}
//                               <span className="font-medium">{item.name}</span>
//                             </Link>
//                           ))}
//                         </div>

//                         {/* Logout Button */}
//                         <div className="border-t border-gray-100">
//                           <button
//                             onClick={handleLogout}
//                             className="
//                               flex items-center gap-3
//                               w-full
//                               px-5 py-3
//                               text-left
//                               text-red-600
//                               hover:bg-red-50
//                               transition-all duration-300
//                               font-medium
//                             "
//                           >
//                             <LogOut className="w-5 h-5" />
//                             <span>Logout</span>
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Menu Button */}
//               <button
//                 onClick={() => setOpen(true)}
//                 className="
//                   flex items-center gap-2
//                   text-white text-sm
//                   uppercase tracking-widest
//                   px-4 py-2
//                   rounded-full
//                   hover:bg-white/10
//                   transition-all duration-300
//                 "
//               >
//                 Menu <Menu size={18} />
//               </button>
//             </div>

//             {/* MOBILE MENU BUTTON */}
//             <button
//               onClick={() => setOpen(true)}
//               className="lg:hidden flex items-center gap-2 text-white"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* ================= DRAWER MENU ================= */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={() => setOpen(false)}
//               className="fixed inset-0 bg-black z-40"
//             />

//             {/* Drawer */}
//             <motion.aside
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
//               className="fixed inset-y-0 right-0 z-50 w-[90%] sm:w-[420px] max-w-full"
//             >
//               <div
//                 className="
//                   h-full
//                   flex flex-col
//                   bg-gradient-to-br from-white via-[#FFF8F0] to-white
//                   backdrop-blur-2xl
//                   overflow-y-auto
//                 "
//               >
//                 {/* HEADER */}
//                 <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
//                   <div className="flex items-center justify-between px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 rounded-full bg-[#B08D3C]" />
//                       <span className="text-[#5A3A10] font-bold tracking-wider uppercase text-sm">
//                         Menu
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => setOpen(false)}
//                       className="
//                         p-2 rounded-full
//                         hover:bg-gray-100
//                         transition-all duration-300
//                         hover:rotate-90
//                       "
//                     >
//                       <X className="w-6 h-6 text-gray-700" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* USER SECTION (Mobile) */}
//                 <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-[#B08D3C]/5 to-transparent">
//                   {loading ? (
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
//                       <div className="flex-1">
//                         <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
//                         <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
//                       </div>
//                     </div>
//                   ) : !isLoggedIn ? (
//                     <Link
//                       href="/auth/login"
//                       onClick={() => setOpen(false)}
//                       className="
//                         flex items-center justify-center gap-2
//                         w-full
//                         px-6 py-3.5
//                         bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
//                         text-white
//                         font-semibold
//                         rounded-full
//                         hover:shadow-xl
//                         hover:scale-[1.02]
//                         transition-all duration-300
//                       "
//                     >
//                       <User className="w-5 h-5" />
//                       Login to Your Account
//                     </Link>
//                   ) : (
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5A3A10] to-[#B08D3C] flex items-center justify-center font-bold text-white text-xl">
//                         {getUserInitials()}
//                       </div>
//                       <div>
//                         <p className="font-bold text-gray-800 text-lg">
//                           {userProfile?.full_name || "Welcome Back!"}
//                         </p>
//                         <p className="text-sm text-gray-600 truncate max-w-[200px]">
//                           {userProfile?.email || "user@example.com"}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* QUICK ACTIONS (Mobile) */}
//                 <div className="px-6 py-4 border-b border-gray-200">
//                   <div className="grid grid-cols-2 gap-3">
//                     <Link
//                       href="/wishlist"
//                       onClick={() => setOpen(false)}
//                       className="
//                         flex flex-col items-center gap-2
//                         px-4 py-4
//                         bg-white
//                         rounded-xl
//                         border border-gray-200
//                         hover:border-[#B08D3C]
//                         hover:shadow-md
//                         transition-all duration-300
//                         relative
//                       "
//                     >
//                       <Heart className="w-6 h-6 text-[#B08D3C]" />
//                       <span className="text-sm font-medium text-gray-700">
//                         Wishlist
//                       </span>
//                       {wishlistCount > 0 && (
//                         <span className="absolute top-2 right-2 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                           {wishlistCount}
//                         </span>
//                       )}
//                     </Link>

//                     <Link
//                       href="/cart"
//                       onClick={() => setOpen(false)}
//                       className="
//                         flex flex-col items-center gap-2
//                         px-4 py-4
//                         bg-white
//                         rounded-xl
//                         border border-gray-200
//                         hover:border-[#B08D3C]
//                         hover:shadow-md
//                         transition-all duration-300
//                         relative
//                       "
//                     >
//                       <ShoppingCart className="w-6 h-6 text-[#B08D3C]" />
//                       <span className="text-sm font-medium text-gray-700">
//                         Cart
//                       </span>
//                       {cartCount > 0 && (
//                         <span className="absolute top-2 right-2 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                           {cartCount}
//                         </span>
//                       )}
//                     </Link>
//                   </div>
//                 </div>

//                 {/* NAVIGATION LINKS */}
//                 <nav className="flex-1 px-6 py-6">
//                   <div className="space-y-2">
//                     {navLinks.map((item, index) => (
//                       <motion.div
//                         key={item.name}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                       >
//                         <Link
//                           href={item.href}
//                           onClick={() => setOpen(false)}
//                           className="
//                             group
//                             relative
//                             flex items-center
//                             w-full
//                             px-5 py-4
//                             rounded-xl
//                             text-gray-800
//                             font-medium
//                             text-lg
//                             overflow-hidden
//                             transition-all duration-300
//                             hover:text-[#5A3A10]
//                           "
//                         >
//                           <span className="absolute inset-0 bg-gradient-to-r from-[#B08D3C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
//                           <span className="relative flex items-center gap-3">
//                             <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                             {item.name}
//                           </span>
//                         </Link>
//                       </motion.div>
//                     ))}

//                     {/* User Menu Items (when logged in on mobile) */}
//                     {!loading && isLoggedIn && (
//                       <>
//                         <div className="my-4 border-t border-gray-200 pt-4">
//                           <p className="px-5 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                             My Account
//                           </p>
//                         </div>
//                         {userMenuItems.map((item, index) => (
//                           <motion.div
//                             key={item.name}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{
//                               delay: (navLinks.length + index) * 0.05,
//                             }}
//                           >
//                             <Link
//                               href={item.href}
//                               onClick={() => setOpen(false)}
//                               className="
//                                 group
//                                 relative
//                                 flex items-center gap-3
//                                 w-full
//                                 px-5 py-3.5
//                                 rounded-xl
//                                 text-gray-700
//                                 font-medium
//                                 overflow-hidden
//                                 transition-all duration-300
//                                 hover:text-[#5A3A10]
//                               "
//                             >
//                               <span className="absolute inset-0 bg-gradient-to-r from-[#B08D3C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
//                               <span className="relative flex items-center gap-3">
//                                 {item.icon && (
//                                   <item.icon
//                                     className="w-5 h-5 text-[#B08D3C]"
//                                     strokeWidth={2}
//                                   />
//                                 )}
//                                 {item.name}
//                               </span>
//                             </Link>
//                           </motion.div>
//                         ))}
//                       </>
//                     )}
//                   </div>
//                 </nav>

//                 {/* CTA SECTION */}
//                 <div className="sticky bottom-0 px-6 py-6 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200">
//                   <Link
//                     href="/booking"
//                     onClick={() => setOpen(false)}
//                     className="
//                       block w-full text-center
//                       bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
//                       text-white
//                       font-bold
//                       py-4 rounded-full
//                       text-lg
//                       hover:shadow-2xl
//                       hover:scale-[1.02]
//                       transition-all duration-300
//                       relative
//                       overflow-hidden
//                       group
//                     "
//                   >
//                     <span className="absolute inset-0 bg-gradient-to-r from-[#5A3A10] to-[#B08D3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
//                     <span className="relative">Book Your Session</span>
//                   </Link>

//                   {!loading && isLoggedIn && (
//                     <button
//                       onClick={handleLogout}
//                       className="
//                         w-full mt-3
//                         px-6 py-3
//                         text-red-600
//                         font-semibold
//                         rounded-full
//                         hover:bg-red-50
//                         transition-all duration-300
//                         flex items-center justify-center gap-2
//                       "
//                     >
//                       <LogOut className="w-4 h-4" />
//                       Logout
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Package,
  Calendar,
  UserCircle,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import { signOut } from "@/lib/supabase/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual data from your state management
  const cartCount = 3;
  const wishlistCount = 5;

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  // User menu items
  const userMenuItems = [
    { name: "My Account", href: "/account", icon: UserCircle },
    { name: "My Bookings", href: "/bookings", icon: Calendar },
    { name: "My Orders", href: "/orders", icon: Package },
    { name: "Wishlist", href: "/wishlist", icon: Heart },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
  ];

  // Check authentication status on component mount
  useEffect(() => {
    checkAuth();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event, "Session:", session); // Debug log
        
        if (event === "SIGNED_IN" && session) {
          await loadUserProfile(session.user.id);
          setIsLoggedIn(true);
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          setUserProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("Current session:", session); // Debug log

      if (session?.user) {
        setIsLoggedIn(true);
        await loadUserProfile(session.user.id);
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // Load user profile from database
  const loadUserProfile = async (userId: string) => {
    try {
      console.log("Loading profile for user ID:", userId); // Debug log

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      console.log("Profile query result:", { data, error }); // Debug log

      if (error) {
        console.error("Profile query error:", error);
        
        // If profile doesn't exist, try to get user data from auth
        const { data: { user } } = await supabase.auth.getUser();
        console.log("Auth user data:", user); // Debug log
        
        if (user) {
          // Use auth metadata as fallback
          setUserProfile({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            phone: user.user_metadata?.phone || null,
            role: 'user',
          });
        }
        return;
      }

      if (data) {
        console.log("Profile loaded successfully:", data); // Debug log
        setUserProfile(data);
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      console.error("Error details:", error.message, error.details, error.hint); // Detailed error log
      
      // Fallback: Try to get user from auth
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserProfile({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
            phone: user.user_metadata?.phone || null,
            role: 'user',
          });
        }
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error("Logout failed");
        return;
      }

      setIsLoggedIn(false);
      setUserProfile(null);
      setUserMenuOpen(false);
      setOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.full_name && userProfile.full_name !== 'User') {
      return userProfile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (userProfile?.email) {
      return userProfile.email[0].toUpperCase();
    }
    return "U";
  };

  // Get display name
  const getDisplayName = () => {
    if (userProfile?.full_name && userProfile.full_name !== '') {
      return userProfile.full_name;
    }
    if (userProfile?.email) {
      return userProfile.email.split('@')[0];
    }
    return "User";
  };

  // Get display email
  const getDisplayEmail = () => {
    return userProfile?.email || "user@example.com";
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-500
          ${
            scrolled
              ? "bg-[#B08D3C]/95 backdrop-blur-lg shadow-lg"
              : "bg-transparent"
          }
        `}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div
            className={`
              flex items-center justify-between
              w-full
              rounded-2xl
              px-4 lg:px-6
              transition-all duration-500
              ${
                scrolled
                  ? "py-2 md:py-0 bg-transparent"
                  : "mt-4 bg-[#B08D3C]/30 backdrop-blur-md"
              }
            `}
          >
            {/* LOGO */}
            <Link
              href="/"
              className="relative w-[70px] sm:w-[75px] lg:w-[110px] h-[54px] sm:h-[64px] lg:h-[95px]"
            >
              <Image
                src="/beautylogo.png"
                alt="Beauty Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </Link>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="relative group"
                aria-label="Wishlist"
              >
                <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300">
                  <Heart
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={2}
                  />
                  {wishlistCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </div>
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="relative group" aria-label="Cart">
                <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-300">
                  <ShoppingCart
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={2}
                  />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
              </Link>

              {/* Login Button or User Menu */}
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
              ) : !isLoggedIn ? (
                <Link
                  href="/auth/login"
                  className="
                    px-6 py-2.5
                    bg-white
                    text-[#B08D3C]
                    font-semibold
                    rounded-full
                    hover:bg-[#5A3A10]
                    hover:text-white
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-xl
                  "
                >
                  Login
                </Link>
              ) : (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="
                      flex items-center gap-2
                      px-4 py-2.5
                      bg-white/10
                      backdrop-blur-sm
                      text-white
                      font-medium
                      rounded-full
                      hover:bg-white/20
                      transition-all duration-300
                      border border-white/20
                    "
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5A3A10] to-[#B08D3C] flex items-center justify-center font-bold text-sm text-white">
                      {getUserInitials()}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="
                          absolute right-0 top-full mt-2
                          w-64
                          bg-white
                          rounded-2xl
                          shadow-2xl
                          overflow-hidden
                          border border-gray-100
                        "
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-gradient-to-br from-[#FFF8F0] to-white border-b border-gray-100">
                          <p className="font-bold text-gray-800 truncate">
                            {getDisplayName()}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {getDisplayEmail()}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {userMenuItems.map((item, index) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setUserMenuOpen(false)}
                              className={`
                                flex items-center gap-3
                                px-5 py-3
                                text-gray-700
                                hover:bg-[#B08D3C]/10
                                hover:text-[#5A3A10]
                                transition-all duration-300
                              `}
                            >
                              {item.icon && (
                                <item.icon className="w-5 h-5 text-[#B08D3C]" strokeWidth={2} />
                              )}
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          ))}
                        </div>

                        {/* Logout Button */}
                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="
                              flex items-center gap-3
                              w-full
                              px-5 py-3
                              text-left
                              text-red-600
                              hover:bg-red-50
                              transition-all duration-300
                              font-medium
                            "
                          >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Menu Button */}
              <button
                onClick={() => setOpen(true)}
                className="
                  flex items-center gap-2
                  text-white text-sm
                  uppercase tracking-widest
                  px-4 py-2
                  rounded-full
                  hover:bg-white/10
                  transition-all duration-300
                "
              >
                Menu <Menu size={18} />
              </button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center gap-2 text-white"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= DRAWER MENU ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-[90%] sm:w-[420px] max-w-full"
            >
              <div
                className="
                  h-full
                  flex flex-col
                  bg-gradient-to-br from-white via-[#FFF8F0] to-white
                  backdrop-blur-2xl
                  overflow-y-auto
                "
              >
                {/* HEADER */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#B08D3C]" />
                      <span className="text-[#5A3A10] font-bold tracking-wider uppercase text-sm">
                        Menu
                      </span>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="
                        p-2 rounded-full
                        hover:bg-gray-100
                        transition-all duration-300
                        hover:rotate-90
                      "
                    >
                      <X className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* USER SECTION (Mobile) */}
                <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-[#B08D3C]/5 to-transparent">
                  {loading ? (
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                      </div>
                    </div>
                  ) : !isLoggedIn ? (
                    <Link
                      href="/auth/login"
                      onClick={() => setOpen(false)}
                      className="
                        flex items-center justify-center gap-2
                        w-full
                        px-6 py-3.5
                        bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
                        text-white
                        font-semibold
                        rounded-full
                        hover:shadow-xl
                        hover:scale-[1.02]
                        transition-all duration-300
                      "
                    >
                      <User className="w-5 h-5" />
                      Login to Your Account
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5A3A10] to-[#B08D3C] flex items-center justify-center font-bold text-white text-xl">
                        {getUserInitials()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-lg">
                          {getDisplayName()}
                        </p>
                        <p className="text-sm text-gray-600 truncate max-w-[200px]">
                          {getDisplayEmail()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* QUICK ACTIONS (Mobile) */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/wishlist"
                      onClick={() => setOpen(false)}
                      className="
                        flex flex-col items-center gap-2
                        px-4 py-4
                        bg-white
                        rounded-xl
                        border border-gray-200
                        hover:border-[#B08D3C]
                        hover:shadow-md
                        transition-all duration-300
                        relative
                      "
                    >
                      <Heart className="w-6 h-6 text-[#B08D3C]" />
                      <span className="text-sm font-medium text-gray-700">
                        Wishlist
                      </span>
                      {wishlistCount > 0 && (
                        <span className="absolute top-2 right-2 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="
                        flex flex-col items-center gap-2
                        px-4 py-4
                        bg-white
                        rounded-xl
                        border border-gray-200
                        hover:border-[#B08D3C]
                        hover:shadow-md
                        transition-all duration-300
                        relative
                      "
                    >
                      <ShoppingCart className="w-6 h-6 text-[#B08D3C]" />
                      <span className="text-sm font-medium text-gray-700">
                        Cart
                      </span>
                      {cartCount > 0 && (
                        <span className="absolute top-2 right-2 bg-[#5A3A10] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* NAVIGATION LINKS */}
                <nav className="flex-1 px-6 py-6">
                  <div className="space-y-2">
                    {navLinks.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="
                            group
                            relative
                            flex items-center
                            w-full
                            px-5 py-4
                            rounded-xl
                            text-gray-800
                            font-medium
                            text-lg
                            overflow-hidden
                            transition-all duration-300
                            hover:text-[#5A3A10]
                          "
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#B08D3C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                          <span className="relative flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B08D3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {item.name}
                          </span>
                        </Link>
                      </motion.div>
                    ))}

                    {/* User Menu Items (when logged in on mobile) */}
                    {!loading && isLoggedIn && (
                      <>
                        <div className="my-4 border-t border-gray-200 pt-4">
                          <p className="px-5 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            My Account
                          </p>
                        </div>
                        {userMenuItems.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: (navLinks.length + index) * 0.05,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="
                                group
                                relative
                                flex items-center gap-3
                                w-full
                                px-5 py-3.5
                                rounded-xl
                                text-gray-700
                                font-medium
                                overflow-hidden
                                transition-all duration-300
                                hover:text-[#5A3A10]
                              "
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-[#B08D3C]/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl" />
                              <span className="relative flex items-center gap-3">
                                {item.icon && (
                                  <item.icon
                                    className="w-5 h-5 text-[#B08D3C]"
                                    strokeWidth={2}
                                  />
                                )}
                                {item.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                </nav>

                {/* CTA SECTION */}
                <div className="sticky bottom-0 px-6 py-6 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200">
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="
                      block w-full text-center
                      bg-gradient-to-r from-[#B08D3C] to-[#C49D4C]
                      text-white
                      font-bold
                      py-4 rounded-full
                      text-lg
                      hover:shadow-2xl
                      hover:scale-[1.02]
                      transition-all duration-300
                      relative
                      overflow-hidden
                      group
                    "
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#5A3A10] to-[#B08D3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <span className="relative">Book Your Session</span>
                  </Link>

                  {!loading && isLoggedIn && (
                    <button
                      onClick={handleLogout}
                      className="
                        w-full mt-3
                        px-6 py-3
                        text-red-600
                        font-semibold
                        rounded-full
                        hover:bg-red-50
                        transition-all duration-300
                        flex items-center justify-center gap-2
                      "
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}