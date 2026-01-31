// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Search, Loader2, X, ChevronRight } from "lucide-react";
// // import { getProducts, getCategories } from "@/lib/supabase/products";

// // const GOLD = "#B08D3C";

// // type Category = {
// //   id: string;
// //   name: string;
// //   slug: string;
// // };

// // type Product = {
// //   id: string;
// //   title: string;
// //   slug: string;
// //   category_name: string;
// //   category_slug: string;
// //   subcategory_name: string;
// //   description: string;
// //   actual_price: number;
// //   selling_price: number;
// //   discount_percentage: number;
// //   images: string[];
// //   average_rating: number;
// //   review_count: number;
// // };

// // function formatINR(n: number) {
// //   return `₹${n.toLocaleString("en-IN")}`;
// // }

// // export default function ExploreProducts() {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   const [activeCategory, setActiveCategory] = useState("all");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [debouncedSearch, setDebouncedSearch] = useState("");

// //   // Pagination
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const productsPerPage = 9;

// //   // Fetch categories
// //   useEffect(() => {
// //     fetchCategories();
// //   }, []);

// //   // Fetch products
// //   useEffect(() => {
// //     fetchProducts();
// //   }, [activeCategory, debouncedSearch]);

// //   // Debounce search
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setDebouncedSearch(searchQuery);
// //       setCurrentPage(1);
// //     }, 500);

// //     return () => clearTimeout(timer);
// //   }, [searchQuery]);

// //   const fetchCategories = async () => {
// //     const { data, error } = await getCategories();
// //     if (error) {
// //       console.error("Error fetching categories:", error);
// //     } else {
// //       setCategories([{ id: "all", name: "All", slug: "all" }, ...(data || [])]);
// //     }
// //   };

// //   const fetchProducts = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const filters: any = {};

// //       if (activeCategory !== "all") {
// //         filters.category = activeCategory;
// //       }

// //       if (debouncedSearch) {
// //         filters.search = debouncedSearch;
// //       }

// //       const { data, error: productsError } = await getProducts(filters);

// //       if (productsError) throw new Error(productsError);

// //       setProducts(data || []);
// //     } catch (err: any) {
// //       console.error("Error fetching products:", err);
// //       setError(err.message || "Failed to load products");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Pagination logic
// //   const indexOfLastProduct = currentPage * productsPerPage;
// //   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
// //   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
// //   const totalPages = Math.ceil(products.length / productsPerPage);

// //   const handlePageChange = (pageNumber: number) => {
// //     setCurrentPage(pageNumber);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   return (
// //     <div className="min-h-screen bg-black">
// //       <style jsx global>{`
// //         @keyframes shine {
// //           0% {
// //             transform: translateX(-120%) skewX(-14deg);
// //             opacity: 0;
// //           }
// //           28% {
// //             opacity: 0.14;
// //           }
// //           65% {
// //             opacity: 0.2;
// //           }
// //           100% {
// //             transform: translateX(120%) skewX(-14deg);
// //             opacity: 0;
// //           }
// //         }

// //         @media (prefers-reduced-motion: reduce) {
// //           .no-motion {
// //             animation: none !important;
// //             transition: none !important;
// //           }
// //         }
// //       `}</style>

// //       {/* Background Effects */}
// //       <div className="fixed inset-0 pointer-events-none">
// //         <div
// //           className="absolute inset-0 opacity-20"
// //           style={{
// //             background:
// //               "radial-gradient(circle_at_1px_1px, rgba(255,255,255,0.08) 1px, transparent 0)",
// //             backgroundSize: "24px 24px",
// //           }}
// //         />
// //         <div
// //           className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30"
// //           style={{
// //             background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
// //           }}
// //         />
// //         <div className="absolute inset-0 [box-shadow:inset_0_0_200px_rgba(0,0,0,0.9)]" />
// //       </div>

// //       <div className="relative z-10">
// //         {/* Breadcrumb */}
// //         <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
// //           <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">
// //             <div className="flex items-center gap-2 text-sm">
// //               <Link href="/" className="text-white/60 hover:text-white transition-colors">
// //                 Home
// //               </Link>
// //               <ChevronRight className="w-4 h-4 text-white/40" />
// //               <span className="text-white font-medium">Explore Product</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Header Section */}
// //         <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-12 pb-8">
// //           <motion.h1
// //             initial={{ opacity: 0, y: -20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             className="text-4xl sm:text-5xl font-bold text-white mb-8"
// //           >
// //             EXPLORE ALL PRODUCTS
// //           </motion.h1>

// //           {/* Search Bar */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="relative max-w-xl mb-8"
// //           >
// //             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
// //             <input
// //               type="text"
// //               placeholder="Search products..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="
// //                 w-full pl-12 pr-12 py-3.5
// //                 bg-white/5 backdrop-blur-sm
// //                 border border-white/10
// //                 rounded-xl
// //                 text-white placeholder-white/40
// //                 focus:outline-none focus:border-[#B08D3C]/50 focus:bg-white/10
// //                 transition-all duration-300
// //               "
// //             />
// //             {searchQuery && (
// //               <button
// //                 onClick={() => setSearchQuery("")}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>
// //             )}
// //           </motion.div>

// //           {/* Category Filter Tabs */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="flex flex-wrap gap-2"
// //           >
// //             {categories.map((category, index) => {
// //               const isActive = category.slug === activeCategory;
// //               return (
// //                 <motion.button
// //                   key={category.id}
// //                   initial={{ opacity: 0, scale: 0.9 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   transition={{ delay: 0.3 + index * 0.05 }}
// //                   onClick={() => {
// //                     setActiveCategory(category.slug);
// //                     setCurrentPage(1);
// //                   }}
// //                   className={`
// //                     px-4 py-2 rounded-lg text-sm font-medium
// //                     border transition-all duration-300
// //                     ${
// //                       isActive
// //                         ? "text-black border-transparent shadow-lg shadow-[#B08D3C]/20"
// //                         : "text-white/70 border-white/10 hover:text-white hover:bg-white/5"
// //                     }
// //                   `}
// //                   style={{
// //                     backgroundColor: isActive ? GOLD : "rgba(255,255,255,0.03)",
// //                   }}
// //                 >
// //                   {category.name}
// //                 </motion.button>
// //               );
// //             })}
// //           </motion.div>

// //           {/* Results Count */}
// //           {!loading && (
// //             <motion.p
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ delay: 0.4 }}
// //               className="mt-6 text-white/60 text-sm"
// //             >
// //               {products.length} {products.length === 1 ? "product" : "products"} found
// //               {debouncedSearch && ` for "${debouncedSearch}"`}
// //             </motion.p>
// //           )}
// //         </div>

// //         {/* Products Grid */}
// //         <div className="max-w-7xl mx-auto px-5 sm:px-6 pb-16">
// //           {loading ? (
// //             <div className="flex items-center justify-center py-20">
// //               <div className="flex flex-col items-center gap-4">
// //                 <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
// //                 <p className="text-white/60 text-sm">Loading products...</p>
// //               </div>
// //             </div>
// //           ) : error ? (
// //             <div className="flex items-center justify-center py-20">
// //               <div className="text-center">
// //                 <p className="text-red-400 text-sm mb-2">Failed to load products</p>
// //                 <button
// //                   onClick={fetchProducts}
// //                   className="text-xs text-white/70 hover:text-white underline"
// //                 >
// //                   Try again
// //                 </button>
// //               </div>
// //             </div>
// //           ) : currentProducts.length === 0 ? (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="flex flex-col items-center justify-center py-20"
// //             >
// //               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
// //                 <Search className="w-10 h-10 text-white/30" />
// //               </div>
// //               <p className="text-white/60 text-lg mb-2">No products found</p>
// //               <p className="text-white/40 text-sm">
// //                 Try adjusting your search or filters
// //               </p>
// //             </motion.div>
// //           ) : (
// //             <>
// //               <motion.div
// //                 layout
// //                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// //               >
// //                 <AnimatePresence mode="popLayout">
// //                   {currentProducts.map((product, index) => (
// //                     <ProductCard
// //                       key={product.id}
// //                       product={product}
// //                       index={index}
// //                     />
// //                   ))}
// //                 </AnimatePresence>
// //               </motion.div>

// //               {/* Pagination */}
// //               {totalPages > 1 && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.5 }}
// //                   className="mt-12 flex items-center justify-center gap-2"
// //                 >
// //                   <button
// //                     onClick={() => handlePageChange(currentPage - 1)}
// //                     disabled={currentPage === 1}
// //                     className="
// //                       px-4 py-2 rounded-lg
// //                       bg-white/5 border border-white/10
// //                       text-white/70 text-sm font-medium
// //                       hover:bg-white/10 hover:text-white
// //                       disabled:opacity-30 disabled:cursor-not-allowed
// //                       transition-all duration-300
// //                     "
// //                   >
// //                     Previous
// //                   </button>

// //                   <div className="flex items-center gap-2">
// //                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
// //                       <button
// //                         key={page}
// //                         onClick={() => handlePageChange(page)}
// //                         className={`
// //                           w-10 h-10 rounded-lg text-sm font-medium
// //                           border transition-all duration-300
// //                           ${
// //                             page === currentPage
// //                               ? "text-black border-transparent"
// //                               : "text-white/70 border-white/10 hover:bg-white/5"
// //                           }
// //                         `}
// //                         style={{
// //                           backgroundColor:
// //                             page === currentPage ? GOLD : "rgba(255,255,255,0.03)",
// //                         }}
// //                       >
// //                         {page}
// //                       </button>
// //                     ))}
// //                   </div>

// //                   <button
// //                     onClick={() => handlePageChange(currentPage + 1)}
// //                     disabled={currentPage === totalPages}
// //                     className="
// //                       px-4 py-2 rounded-lg
// //                       bg-white/5 border border-white/10
// //                       text-white/70 text-sm font-medium
// //                       hover:bg-white/10 hover:text-white
// //                       disabled:opacity-30 disabled:cursor-not-allowed
// //                       transition-all duration-300
// //                     "
// //                   >
// //                     Next
// //                   </button>
// //                 </motion.div>
// //               )}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Product Card Component
// // function ProductCard({ product, index }: { product: Product; index: number }) {
// //   const productImage =
// //     product.images && product.images.length > 0
// //       ? product.images[0]
// //       : "/products/placeholder.png";

// //   return (
// //     <motion.div
// //       layout
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       exit={{ opacity: 0, scale: 0.9 }}
// //       transition={{ delay: index * 0.05 }}
// //     >
// //       <Link href={`/products/${product.slug}`}>
// //         <div
// //           className="
// //             group relative rounded-2xl p-4 sm:p-5
// //             bg-white/[0.04] border border-white/10
// //             shadow-[0_26px_70px_rgba(0,0,0,0.45)]
// //             transition-all duration-300 hover:-translate-y-2
// //             overflow-hidden cursor-pointer
// //           "
// //         >
// //           {/* Gold Overlay on Hover */}
// //           <div
// //             aria-hidden="true"
// //             className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
// //             style={{
// //               background: `radial-gradient(900px 360px at 35% 15%, rgba(176,141,60,0.34), rgba(0,0,0,0) 60%)`,
// //             }}
// //           />
// //           <div
// //             aria-hidden="true"
// //             className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
// //             style={{ boxShadow: `inset 0 0 0 1px rgba(176,141,60,0.25)` }}
// //           />

// //           {/* Shine Effect */}
// //           <div
// //             aria-hidden="true"
// //             className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 no-motion"
// //           >
// //             <div
// //               className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 blur-xl"
// //               style={{
// //                 background:
// //                   "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)",
// //                 animation: "shine 2.2s ease-in-out infinite",
// //               }}
// //             />
// //           </div>

// //           {/* Image */}
// //           <div className="relative overflow-hidden rounded-xl bg-black/30">
// //             <div className="relative aspect-[16/10] w-full">
// //               <Image
// //                 src={productImage}
// //                 alt={product.title}
// //                 fill
// //                 className="object-cover transition-transform duration-700 group-hover:scale-105"
// //               />
// //             </div>
// //             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

// //             {/* Discount Badge */}
// //             {product.discount_percentage > 0 && (
// //               <div className="absolute top-3 right-3">
// //                 <div
// //                   className="px-2 py-1 rounded-md text-xs font-bold text-black"
// //                   style={{ backgroundColor: GOLD }}
// //                 >
// //                   {Math.round(product.discount_percentage)}% OFF
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           {/* Content */}
// //           <div className="relative mt-4">
// //             <div className="text-[11px] text-white/55">
// //               {product.subcategory_name || product.category_name}
// //             </div>
// //             <div className="mt-2 text-white text-sm font-semibold line-clamp-1">
// //               {product.title}
// //             </div>

// //             {/* Rating */}
// //             {product.review_count > 0 && (
// //               <div className="mt-2 flex items-center gap-2">
// //                 <div className="flex items-center gap-1">
// //                   {[...Array(5)].map((_, i) => (
// //                     <span
// //                       key={i}
// //                       className={`text-xs ${
// //                         i < Math.round(product.average_rating)
// //                           ? "text-yellow-400"
// //                           : "text-white/20"
// //                       }`}
// //                     >
// //                       ★
// //                     </span>
// //                   ))}
// //                 </div>
// //                 <span className="text-[10px] text-white/50">
// //                   {product.average_rating.toFixed(1)} ({product.review_count})
// //                 </span>
// //               </div>
// //             )}

// //             {/* Price */}
// //             <div className="mt-3 flex items-baseline gap-2 text-xs">
// //               <span className="text-white/70">Price •</span>
// //               <span className="text-white/85 font-semibold">
// //                 {formatINR(product.selling_price)}
// //               </span>
// //               {product.actual_price > product.selling_price && (
// //                 <span className="text-white/35 line-through">
// //                   {formatINR(product.actual_price)}
// //                 </span>
// //               )}
// //             </div>

// //             {/* Shop Now Button */}
// //             <div className="mt-4">
// //               <div
// //                 className="
// //                   w-full rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300
// //                   border border-white/25
// //                   text-white/85 group-hover:text-black
// //                   group-hover:border-transparent
// //                   group-hover:shadow-[0_14px_34px_rgba(176,141,60,0.18)]
// //                   flex items-center justify-center gap-2
// //                 "
// //                 style={{
// //                   backgroundColor: "transparent",
// //                 }}
// //               >
// //                 <span className="group-hover:hidden">Shop now ↗</span>
// //                 <span
// //                   className="hidden group-hover:inline"
// //                   style={{ backgroundColor: GOLD }}
// //                 >
// //                   Shop now ↗
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </Link>
// //     </motion.div>
// //   );
// // }



// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, Loader2, X, ChevronRight } from "lucide-react";
// import { getProducts, getCategories } from "@/lib/supabase/products";

// const GOLD = "#B08D3C";

// type Category = {
//   id: string;
//   name: string;
//   slug: string;
// };

// type Product = {
//   id: string;
//   title: string;
//   slug: string;
//   category_name: string;
//   category_slug: string;
//   subcategory_name: string;
//   description: string;
//   actual_price: number;
//   selling_price: number;
//   discount_percentage: number;
//   images: string[];
//   average_rating: number;
//   review_count: number;
// };

// function formatINR(n: number) {
//   return `₹${n.toLocaleString("en-IN")}`;
// }

// export default function ExploreProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9;

//   // Fetch categories
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Fetch products
//   useEffect(() => {
//     fetchProducts();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeCategory, debouncedSearch]);

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const fetchCategories = async () => {
//     const { data, error } = await getCategories();
//     if (error) {
//       console.error("Error fetching categories:", error);
//     } else {
//       setCategories([{ id: "all", name: "All", slug: "all" }, ...(data || [])]);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const filters: any = {};

//       if (activeCategory !== "all") {
//         filters.category = activeCategory;
//       }

//       if (debouncedSearch) {
//         filters.search = debouncedSearch;
//       }

//       const { data, error: productsError } = await getProducts(filters);

//       if (productsError) throw new Error(productsError);

//       setProducts(data || []);
//     } catch (err: any) {
//       console.error("Error fetching products:", err);
//       setError(err.message || "Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       <style jsx global>{`
//         @keyframes shine {
//           0% {
//             transform: translateX(-120%) skewX(-14deg);
//             opacity: 0;
//           }
//           28% {
//             opacity: 0.14;
//           }
//           65% {
//             opacity: 0.2;
//           }
//           100% {
//             transform: translateX(120%) skewX(-14deg);
//             opacity: 0;
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .no-motion {
//             animation: none !important;
//             transition: none !important;
//           }
//         }
//       `}</style>

//       {/* Background Effects */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             background:
//               "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
//             backgroundSize: "24px 24px",
//           }}
//         />
//         <div
//           className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30"
//           style={{
//             background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/90" style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.9)" }} />
//       </div>

//       <div className="relative z-10">
//         {/* Breadcrumb */}
//         <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">
//             <div className="flex items-center gap-2 text-sm">
//               <Link href="/" className="text-white/60 hover:text-white transition-colors">
//                 Home
//               </Link>
//               <ChevronRight className="w-4 h-4 text-white/40" />
//               <span className="text-white font-medium">Explore Products</span>
//             </div>
//           </div>
//         </div>

//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto px-5 sm:px-6 pt-12 pb-8">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="text-4xl sm:text-5xl font-bold text-white mb-8"
//           >
//             EXPLORE ALL PRODUCTS
//           </motion.h1>

//           {/* Search Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
//             className="relative max-w-xl mb-8"
//           >
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="
//                 w-full pl-12 pr-12 py-3.5
//                 bg-white/5 backdrop-blur-sm
//                 border border-white/10
//                 rounded-xl
//                 text-white placeholder-white/40
//                 focus:outline-none focus:border-[#B08D3C]/50 focus:bg-white/10
//                 transition-all duration-300
//               "
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
//                 aria-label="Clear search"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             )}
//           </motion.div>

//           {/* Category Filter Tabs */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
//             className="flex flex-wrap gap-2"
//           >
//             {categories.map((category, index) => {
//               const isActive = category.slug === activeCategory;
//               return (
//                 <motion.button
//                   key={category.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
//                   onClick={() => {
//                     setActiveCategory(category.slug);
//                     setCurrentPage(1);
//                   }}
//                   className={`
//                     px-4 py-2 rounded-lg text-sm font-medium
//                     border transition-all duration-300
//                     ${
//                       isActive
//                         ? "text-black border-transparent shadow-lg shadow-[#B08D3C]/20"
//                         : "text-white/70 border-white/10 hover:text-white hover:bg-white/5"
//                     }
//                   `}
//                   style={{
//                     backgroundColor: isActive ? GOLD : "rgba(255,255,255,0.03)",
//                   }}
//                 >
//                   {category.name}
//                 </motion.button>
//               );
//             })}
//           </motion.div>

//           {/* Results Count */}
//           {!loading && (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               className="mt-6 text-white/60 text-sm"
//             >
//               {products.length} {products.length === 1 ? "product" : "products"} found
//               {debouncedSearch && ` for "${debouncedSearch}"`}
//             </motion.p>
//           )}
//         </div>

//         {/* Products Grid */}
//         <div className="max-w-7xl mx-auto px-5 sm:px-6 pb-16">
//           {loading ? (
//             <div className="flex items-center justify-center py-20">
//               <div className="flex flex-col items-center gap-4">
//                 <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
//                 <p className="text-white/60 text-sm">Loading products...</p>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center py-20">
//               <div className="text-center">
//                 <p className="text-red-400 text-sm mb-2">Failed to load products</p>
//                 <button
//                   onClick={fetchProducts}
//                   className="text-xs text-white/70 hover:text-white underline"
//                 >
//                   Try again
//                 </button>
//               </div>
//             </div>
//           ) : currentProducts.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex flex-col items-center justify-center py-20"
//             >
//               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
//                 <Search className="w-10 h-10 text-white/30" />
//               </div>
//               <p className="text-white/60 text-lg mb-2">No products found</p>
//               <p className="text-white/40 text-sm">
//                 Try adjusting your search or filters
//               </p>
//             </motion.div>
//           ) : (
//             <>
//               <motion.div
//                 layout
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 <AnimatePresence mode="popLayout">
//                   {currentProducts.map((product, index) => (
//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                       index={index}
//                     />
//                   ))}
//                 </AnimatePresence>
//               </motion.div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5, duration: 0.6 }}
//                   className="mt-12 flex items-center justify-center gap-2 flex-wrap"
//                 >
//                   <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="
//                       px-4 py-2 rounded-lg
//                       bg-white/5 border border-white/10
//                       text-white/70 text-sm font-medium
//                       hover:bg-white/10 hover:text-white
//                       disabled:opacity-30 disabled:cursor-not-allowed
//                       transition-all duration-300
//                     "
//                   >
//                     Previous
//                   </button>

//                   <div className="flex items-center gap-2 flex-wrap">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => handlePageChange(page)}
//                         className={`
//                           w-10 h-10 rounded-lg text-sm font-medium
//                           border transition-all duration-300
//                           ${
//                             page === currentPage
//                               ? "text-black border-transparent"
//                               : "text-white/70 border-white/10 hover:bg-white/5"
//                           }
//                         `}
//                         style={{
//                           backgroundColor:
//                             page === currentPage ? GOLD : "rgba(255,255,255,0.03)",
//                         }}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="
//                       px-4 py-2 rounded-lg
//                       bg-white/5 border border-white/10
//                       text-white/70 text-sm font-medium
//                       hover:bg-white/10 hover:text-white
//                       disabled:opacity-30 disabled:cursor-not-allowed
//                       transition-all duration-300
//                     "
//                   >
//                     Next
//                   </button>
//                 </motion.div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Product Card Component
// function ProductCard({ product, index }: { product: Product; index: number }) {
//   const [isHovered, setIsHovered] = useState(false);
  
//   const productImage =
//     product.images && product.images.length > 0
//       ? product.images[0]
//       : "/products/placeholder.png";

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ 
//         delay: index * 0.05, 
//         duration: 0.5,
//         layout: { duration: 0.3 }
//       }}
//     >
//       <Link href={`/products/${product.slug}`}>
//         <div
//           className="
//             group relative rounded-2xl p-4 sm:p-5
//             bg-white/[0.04] border border-white/10
//             shadow-[0_26px_70px_rgba(0,0,0,0.45)]
//             transition-all duration-300 hover:-translate-y-2
//             overflow-hidden cursor-pointer
//           "
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {/* Gold Overlay on Hover */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//             style={{
//               background: `radial-gradient(900px 360px at 35% 15%, rgba(176,141,60,0.34), rgba(0,0,0,0) 60%)`,
//             }}
//           />
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//             style={{ boxShadow: `inset 0 0 0 1px rgba(176,141,60,0.25)` }}
//           />

//           {/* Shine Effect */}
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 no-motion"
//           >
//             <div
//               className="absolute -left-1/2 top-0 h-full w-1/3 rotate-12 blur-xl"
//               style={{
//                 background:
//                   "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)",
//                 animation: "shine 2.2s ease-in-out infinite",
//               }}
//             />
//           </div>

//           {/* Image */}
//           <div className="relative overflow-hidden rounded-xl bg-black/30">
//             <div className="relative aspect-[16/10] w-full">
//               <Image
//                 src={productImage}
//                 alt={product.title}
//                 fill
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                 className="object-cover transition-transform duration-700 group-hover:scale-105"
//               />
//             </div>
//             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

//             {/* Discount Badge */}
//             {product.discount_percentage > 0 && (
//               <div className="absolute top-3 right-3">
//                 <div
//                   className="px-2 py-1 rounded-md text-xs font-bold text-black"
//                   style={{ backgroundColor: GOLD }}
//                 >
//                   {Math.round(product.discount_percentage)}% OFF
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Content */}
//           <div className="relative mt-4">
//             <div className="text-[11px] text-white/55 uppercase tracking-wide">
//               {product.subcategory_name || product.category_name}
//             </div>
//             <div className="mt-2 text-white text-sm font-semibold line-clamp-1">
//               {product.title}
//             </div>

//             {/* Rating */}
//             {product.review_count > 0 && (
//               <div className="mt-2 flex items-center gap-2">
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <span
//                       key={i}
//                       className={`text-xs transition-colors duration-200 ${
//                         i < Math.round(product.average_rating)
//                           ? "text-yellow-400"
//                           : "text-white/20"
//                       }`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <span className="text-[10px] text-white/50">
//                   {product.average_rating.toFixed(1)} ({product.review_count})
//                 </span>
//               </div>
//             )}

//             {/* Price */}
//             <div className="mt-3 flex items-baseline gap-2 text-xs">
//               <span className="text-white/70">Price •</span>
//               <span className="text-white/85 font-semibold">
//                 {formatINR(product.selling_price)}
//               </span>
//               {product.actual_price > product.selling_price && (
//                 <span className="text-white/35 line-through">
//                   {formatINR(product.actual_price)}
//                 </span>
//               )}
//             </div>

//             {/* Shop Now Button */}
//             <div className="mt-4">
//               <div
//                 className="
//                   w-full rounded-lg px-4 py-2 text-xs font-semibold 
//                   border text-center
//                   transition-all duration-300
//                   flex items-center justify-center gap-2
//                 "
//                 style={{
//                   backgroundColor: isHovered ? GOLD : "transparent",
//                   borderColor: isHovered ? "transparent" : "rgba(255,255,255,0.25)",
//                   color: isHovered ? "#000000" : "rgba(255,255,255,0.85)",
//                   boxShadow: isHovered ? "0 14px 34px rgba(176,141,60,0.18)" : "none",
//                 }}
//               >
//                 Shop now ↗
//               </div>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ChevronRight, Loader2 } from "lucide-react";
import { getProducts, getCategories } from "@/lib/supabase/products";

const GOLD = "#B08D3C";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  category_name: string;
  category_slug: string;
  subcategory_name: string;
  description: string;
  actual_price: number;
  selling_price: number;
  discount_percentage: number;
  images: string[];
  average_rating: number;
  review_count: number;
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ExploreProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    loadProducts();
  }, [selectedCategory, debouncedSearch]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  async function loadCategories() {
    const result = await getCategories();
    if (result.error) {
      console.error("Error loading categories:", result.error);
      return;
    }
    const allCategory = { id: "all", name: "All", slug: "all" };
    setCategories([allCategory, ...(result.data || [])]);
  }

  async function loadProducts() {
    try {
      setLoading(true);
      setError(null);

      const filters: any = {};
      
      if (selectedCategory !== "all") {
        filters.category = selectedCategory;
      }
      
      if (debouncedSearch) {
        filters.search = debouncedSearch;
      }

      const result = await getProducts(filters);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setProducts(result.data || []);
    } catch (err: any) {
      console.error("Error loading products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  // Pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-black mt-20 py-10">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30"
          style={{
            background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 200px rgba(0,0,0,0.9)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white font-medium">Explore Products</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            EXPLORE ALL PRODUCTS
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 focus:bg-white/10 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const isActive = cat.slug === selectedCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-all"
                  style={{
                    backgroundColor: isActive ? GOLD : "rgba(255,255,255,0.03)",
                    borderColor: isActive ? "transparent" : "rgba(255,255,255,0.10)",
                    color: isActive ? "#000000" : "rgba(255,255,255,0.70)",
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          {!loading && (
            <p className="text-white/60 text-sm mb-6">
              {products.length} {products.length === 1 ? "product" : "products"} found
              {debouncedSearch && ` for "${debouncedSearch}"`}
            </p>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
                <p className="text-white/60 text-sm">Loading products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-400 text-sm mb-2">Failed to load products</p>
                <button
                  onClick={loadProducts}
                  className="text-xs text-white/70 hover:text-white underline"
                >
                  Try again
                </button>
              </div>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-white/30" />
              </div>
              <p className="text-white/60 text-lg mb-2">No products found</p>
              <p className="text-white/40 text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !loading && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className="w-10 h-10 rounded-lg text-sm font-medium border transition-all"
                    style={{
                      backgroundColor: page === currentPage ? GOLD : "rgba(255,255,255,0.03)",
                      borderColor: page === currentPage ? "transparent" : "rgba(255,255,255,0.10)",
                      color: page === currentPage ? "#000000" : "rgba(255,255,255,0.70)",
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const image = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/products/placeholder.png";

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className="group relative rounded-2xl p-5 bg-white/[0.04] border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(900px 360px at 35% 15%, rgba(176,141,60,0.34), rgba(0,0,0,0) 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(176,141,60,0.25)",
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden rounded-xl bg-black/30 mb-4">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={image}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

          {/* Discount badge */}
          {product.discount_percentage > 0 && (
            <div className="absolute top-3 right-3">
              <div
                className="px-2 py-1 rounded-md text-xs font-bold text-black"
                style={{ backgroundColor: GOLD }}
              >
                {Math.round(product.discount_percentage)}% OFF
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative">
          <div className="text-[11px] text-white/55 uppercase tracking-wide">
            {product.subcategory_name || product.category_name}
          </div>
          <div className="mt-2 text-white text-sm font-semibold line-clamp-1">
            {product.title}
          </div>

          {/* Rating */}
          {product.review_count > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className="text-xs"
                    style={{
                      color: star <= Math.round(product.average_rating) ? "#facc15" : "rgba(255,255,255,0.20)",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-white/50">
                {product.average_rating.toFixed(1)} ({product.review_count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2 text-xs">
            <span className="text-white/70">Price •</span>
            <span className="text-white/85 font-semibold">
              {formatPrice(product.selling_price)}
            </span>
            {product.actual_price > product.selling_price && (
              <span className="text-white/35 line-through">
                {formatPrice(product.actual_price)}
              </span>
            )}
          </div>

          {/* Button */}
          <div className="mt-4">
            <div
              className="w-full rounded-lg px-4 py-2 text-xs font-semibold text-center border transition-all duration-300"
              style={{
                backgroundColor: hovered ? GOLD : "transparent",
                borderColor: hovered ? "transparent" : "rgba(255,255,255,0.25)",
                color: hovered ? "#000000" : "rgba(255,255,255,0.85)",
                boxShadow: hovered ? "0 14px 34px rgba(176,141,60,0.18)" : "none",
              }}
            >
              Shop now ↗
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}