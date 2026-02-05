// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ChevronRight, Heart, ShoppingCart, Loader2 } from "lucide-react";
// import { getProductBySlug } from "@/lib/supabase/products";
// import { supabase } from "@/lib/supabase/client";

// const GOLD = "#B08D3C";

// type ProductVariant = {
//   size?: string;
//   shade?: string;
//   color?: string;
//   code?: string;
//   price: number;
//   stock: number;
// };

// type Product = {
//   id: string;
//   title: string;
//   slug: string;
//   category_name: string;
//   category_slug: string;
//   subcategory_name: string;
//   description: string;
//   features: string[];
//   actual_price: number;
//   selling_price: number;
//   discount_percentage: number;
//   stock: number;
//   variants: ProductVariant[];
//   images: string[];
//   materials_info: string;
//   ingredients: string;
//   how_to_use: string;
//   skin_type: string;
//   average_rating: number;
//   review_count: number;
//   reviews?: Review[];
//   rating_distribution?: {
//     5: number;
//     4: number;
//     3: number;
//     2: number;
//     1: number;
//   };
// };

// type Review = {
//   id: string;
//   user_id: string;
//   rating: number;
//   comment: string;
//   created_at: string;
//   user: {
//     full_name: string;
//     email: string;
//   };
// };

// function formatPrice(amount: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// export default function ProductDetailPage({ slug }: { slug: string }) {
//   const router = useRouter();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<any>(null);

//   // UI States
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [addingToCart, setAddingToCart] = useState(false);
//   const [addingToWishlist, setAddingToWishlist] = useState(false);

//   // Check authentication
//   useEffect(() => {
//     checkUser();
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   // Fetch product
//   useEffect(() => {
//     loadProduct();
//   }, [slug]);

//   // Check if in wishlist
//   useEffect(() => {
//     if (user && product) {
//       checkWishlistStatus();
//     }
//   }, [user, product]);

//   async function checkUser() {
//     const { data: { session } } = await supabase.auth.getSession();
//     setUser(session?.user || null);
//   }

//   async function loadProduct() {
//     try {
//       setLoading(true);
//       setError(null);

//       const result = await getProductBySlug(slug);

//       if (result.error) {
//         throw new Error(result.error);
//       }

//       if (!result.data) {
//         throw new Error("Product not found");
//       }

//       setProduct(result.data as Product);
//     } catch (err: any) {
//       console.error("Error loading product:", err);
//       setError(err.message || "Failed to load product");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function checkWishlistStatus() {
//     if (!user || !product) return;

//     try {
//       const { data, error } = await supabase
//         .from("wishlist")
//         .select("id")
//         .eq("user_id", user.id)
//         .eq("product_id", product.id)
//         .maybeSingle();

//       setIsInWishlist(!!data);
//     } catch (err) {
//       setIsInWishlist(false);
//     }
//   }

//   async function handleAddToCart() {
//     if (!user) {
//       router.push(`/auth/login?redirect=/products/${slug}`);
//       return;
//     }

//     if (!product) return;

//     try {
//       setAddingToCart(true);

//       const { data: existingItem } = await supabase
//         .from("cart_items")
//         .select("id, quantity")
//         .eq("user_id", user.id)
//         .eq("product_id", product.id)
//         .maybeSingle();

//       if (existingItem) {
//         const { error } = await supabase
//           .from("cart_items")
//           .update({ quantity: existingItem.quantity + quantity })
//           .eq("id", existingItem.id);

//         if (error) throw error;
//       } else {
//         const { error } = await supabase
//           .from("cart_items")
//           .insert({
//             user_id: user.id,
//             product_id: product.id,
//             quantity: quantity,
//             variant: selectedVariant,
//           });

//         if (error) throw error;
//       }

//       alert("Added to cart successfully!");
//     } catch (err: any) {
//       console.error("Error adding to cart:", err);
//       alert(err.message || "Failed to add to cart");
//     } finally {
//       setAddingToCart(false);
//     }
//   }

//   async function handleToggleWishlist() {
//     if (!user) {
//       router.push(`/auth/login?redirect=/products/${slug}`);
//       return;
//     }

//     if (!product) return;

//     try {
//       setAddingToWishlist(true);

//       if (isInWishlist) {
//         const { error } = await supabase
//           .from("wishlist")
//           .delete()
//           .eq("user_id", user.id)
//           .eq("product_id", product.id);

//         if (error) throw error;
//         setIsInWishlist(false);
//       } else {
//         const { error } = await supabase
//           .from("wishlist")
//           .insert({
//             user_id: user.id,
//             product_id: product.id,
//           });

//         if (error) throw error;
//         setIsInWishlist(true);
//       }
//     } catch (err: any) {
//       console.error("Error updating wishlist:", err);
//       alert(err.message || "Failed to update wishlist");
//     } finally {
//       setAddingToWishlist(false);
//     }
//   }

//   function handleBuyNow() {
//     if (!user) {
//       router.push(`/auth/login?redirect=/products/${slug}`);
//       return;
//     }

//     router.push(`/checkout/${slug}?quantity=${quantity}${selectedVariant ? `&variant=${selectedVariant}` : ""}`);
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
//           <p className="text-white/60 text-sm">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-400 text-lg mb-4">{error || "Product not found"}</p>
//           <Link href="/products" className="text-white/70 hover:text-white underline">
//             Back to products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const displayImages = product.images.length > 0 ? product.images : ["/products/placeholder.png"];

//   return (
//     <div className="min-h-screen bg-black mt-20 py-10">
//       {/* Background Effects */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage:
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
//         <div
//           className="absolute inset-0"
//           style={{
//             boxShadow: "inset 0 0 200px rgba(0,0,0,0.9)",
//           }}
//         />
//       </div>

//       <div className="relative z-10">
//         {/* Breadcrumb */}
//         <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">
//             <div className="flex items-center gap-2 text-sm flex-wrap">
//               <Link href="/" className="text-white/60 hover:text-white transition-colors">
//                 Home
//               </Link>
//               <ChevronRight className="w-4 h-4 text-white/40" />
//               <Link href="/products" className="text-white/60 hover:text-white transition-colors">
//                 Products
//               </Link>
//               <ChevronRight className="w-4 h-4 text-white/40" />
//               <span className="text-white font-medium">Product description</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
//           {/* Product Header */}
//           <div className="mb-8">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
//               {product.title}
//             </h1>
//             <p className="text-white/60 text-sm sm:text-base mb-3">{product.description}</p>
//             <div className="flex items-center gap-3">
//               {product.stock > 0 ? (
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
//                   In stock
//                 </span>
//               ) : (
//                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
//                   Out of stock
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Product Images and Details - Responsive Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
//             {/* Left Side - Images */}
//             <div className="space-y-4">
//               {/* Main Image */}
//               <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
//                 <Image
//                   src={displayImages[selectedImage]}
//                   alt={product.title}
//                   fill
//                   sizes="(max-width: 1024px) 100vw, 50vw"
//                   className="object-cover"
//                   priority
//                 />
//               </div>

//               {/* Thumbnail Images */}
//               {displayImages.length > 1 && (
//                 <div className="grid grid-cols-3 gap-3">
//                   {displayImages.slice(0, 3).map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
//                         selectedImage === index
//                           ? "border-yellow-600"
//                           : "border-white/10 hover:border-white/30"
//                       }`}
//                     >
//                       <Image
//                         src={image}
//                         alt={`${product.title} ${index + 1}`}
//                         fill
//                         sizes="200px"
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Right Side - Product Info */}
//             <div className="space-y-6">
//               {/* Features */}
//               {/* {product.features && product.features.length > 0 && (
//                 <div>
//                   <h3 className="text-xl font-semibold text-white mb-3">Features</h3>
//                   <ul className="space-y-2">
//                     {product.features.map((feature, index) => (
//                       <li key={index} className="flex items-start gap-2 text-white/70 text-sm">
//                         <span className="text-yellow-600 mt-1">•</span>
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )} */}

//               {/* Price */}
//               <div className="border-t border-white/10 pt-6">
//                 <h3 className="text-lg font-semibold text-white mb-3">Price</h3>
//                 <div className="flex items-baseline gap-3 flex-wrap">
//                   <span className="text-3xl font-bold text-white">
//                     {formatPrice(product.selling_price)}
//                   </span>
//                   {product.actual_price > product.selling_price && (
//                     <>
//                       <span className="text-xl text-white/40 line-through">
//                         {formatPrice(product.actual_price)}
//                       </span>
//                       <span className="text-sm text-white/60">
//                         (MRP incl. of all taxes)
//                       </span>
//                     </>
//                   )}
//                 </div>
//                 {product.discount_percentage > 0 && (
//                   <div className="mt-2">
//                     <span
//                       className="inline-block px-2 py-1 rounded text-xs font-bold text-black"
//                       style={{ backgroundColor: GOLD }}
//                     >
//                       {Math.round(product.discount_percentage)}% OFF
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Available Sizes/Variants */}
//               {product.variants && product.variants.length > 0 && (
//                 <div className="border-t border-white/10 pt-6">
//                   <h3 className="text-lg font-semibold text-white mb-3">Available Sizes</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {product.variants.map((variant, index) => {
//                       const variantLabel = variant.size || variant.shade || variant.color || `Option ${index + 1}`;
//                       const isSelected = selectedVariant === variantLabel;
//                       return (
//                         <button
//                           key={index}
//                           onClick={() => setSelectedVariant(variantLabel)}
//                           disabled={variant.stock === 0}
//                           className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
//                             variant.stock === 0
//                               ? "opacity-50 cursor-not-allowed"
//                               : ""
//                           }`}
//                           style={{
//                             backgroundColor: isSelected ? GOLD : "rgba(255,255,255,0.05)",
//                             borderColor: isSelected ? "transparent" : "rgba(255,255,255,0.10)",
//                             color: isSelected ? "#000000" : "rgba(255,255,255,0.85)",
//                           }}
//                         >
//                           {variantLabel}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               {/* Quantity Selector - Mobile Friendly */}
//               <div className="border-t border-white/10 pt-6">
//                 <h3 className="text-lg font-semibold text-white mb-3">Quantity</h3>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
//                   >
//                     -
//                   </button>
//                   <span className="text-white font-medium w-12 text-center">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                     disabled={quantity >= product.stock}
//                     className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons - Mobile Responsive */}
//               <div className="border-t border-white/10 pt-6 space-y-3">
//                 {/* Add to Cart & Wishlist */}
//                 <div className="flex gap-3">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={addingToCart || product.stock === 0}
//                     className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
//                   >
//                     {addingToCart ? (
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                     ) : (
//                       <>
//                         <ShoppingCart className="w-5 h-5" />
//                         <span className="hidden sm:inline">Add To Cart</span>
//                         <span className="sm:hidden">Cart</span>
//                       </>
//                     )}
//                   </button>

//                   <button
//                     onClick={handleToggleWishlist}
//                     disabled={addingToWishlist}
//                     className={`px-4 py-3 rounded-lg border transition-all ${
//                       isInWishlist
//                         ? "bg-red-500/20 border-red-500/30 text-red-400"
//                         : "bg-white/10 border-white/20 text-white hover:bg-white/20"
//                     }`}
//                   >
//                     {addingToWishlist ? (
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                     ) : (
//                       <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
//                     )}
//                   </button>
//                 </div>

//                 {/* Buy Now */}
//                 <button
//                   onClick={handleBuyNow}
//                   disabled={product.stock === 0}
//                   className="w-full px-6 py-3 rounded-lg font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{ backgroundColor: GOLD }}
//                 >
//                   Shop Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Product Details Sections - Responsive */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//             {/* Left Column */}
//             <div className="space-y-8">
//               {product.materials_info && (
//                 <div>
//                   <h2 className="text-2xl font-semibold text-white mb-4">
//                     Materials, Care and origin
//                   </h2>

//                   <div className="mb-6">
//                     <h3 className="text-lg font-semibold text-white mb-3">Skin Science</h3>
//                     <p className="text-white/70 text-sm leading-relaxed">
//                       {product.materials_info}
//                     </p>
//                   </div>

//                   {product.ingredients && (
//                     <div className="mb-6">
//                       <h3 className="text-lg font-semibold text-white mb-3">Ingredients</h3>
//                       <p className="text-white/70 text-sm leading-relaxed">
//                         {product.ingredients}
//                       </p>
//                     </div>
//                   )}

//                   {product.how_to_use && (
//                     <div>
//                       <h3 className="text-lg font-semibold text-white mb-3">How to Use</h3>
//                       <p className="text-white/70 text-sm leading-relaxed">
//                         {product.how_to_use}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Right Column */}
//             <div className="space-y-8">
//               {product.features && product.features.length > 0 && (
//                 <div>
//                   <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
//                   <ul className="space-y-3">
//                     {product.features.map((feature, index) => (
//                       <li key={index} className="flex items-start gap-3 text-white/70 text-sm">
//                         <span className="text-yellow-600 mt-1">•</span>
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {product.skin_type && (
//                 <div>
//                   <h3 className="text-lg font-semibold text-white mb-3">Suitable For</h3>
//                   <p className="text-white/70 text-sm">{product.skin_type}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Ratings and Reviews */}
//           <div className="border-t border-white/10 pt-12">
//             <h2 className="text-2xl font-semibold text-white mb-8">Ratings & Review</h2>

//             {!product.review_count || product.review_count === 0 ? (
//               <p className="text-white/60 text-center py-12">No reviews yet. Be the first to review this product!</p>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//                   {/* Overall Rating */}
//                   <div className="lg:col-span-1">
//                     <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
//                       <div className="text-center">
//                         <div className="text-6xl font-bold text-white mb-2">
//                           {product.average_rating.toFixed(1)}
//                         </div>
//                         <div className="flex items-center justify-center gap-1 mb-2">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <span
//                               key={star}
//                               className="text-2xl"
//                               style={{
//                                 color: star <= Math.round(product.average_rating) ? "#facc15" : "rgba(255,255,255,0.20)",
//                               }}
//                             >
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                         <p className="text-white/60 text-sm">{product.review_count} Ratings</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Rating Distribution */}
//                   <div className="lg:col-span-2">
//                     {product.rating_distribution && (
//                       <div className="space-y-3">
//                         {[5, 4, 3, 2, 1].map((star) => {
//                           const count = product.rating_distribution![star as keyof typeof product.rating_distribution];
//                           const percentage = product.review_count > 0 ? (count / product.review_count) * 100 : 0;

//                           return (
//                             <div key={star} className="flex items-center gap-3">
//                               <div className="flex items-center gap-1 w-12">
//                                 <span className="text-yellow-400 text-sm">★</span>
//                                 <span className="text-white/70 text-sm">{star}</span>
//                               </div>
//                               <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
//                                 <div
//                                   className="h-full rounded-full transition-all"
//                                   style={{
//                                     width: `${percentage}%`,
//                                     backgroundColor: GOLD,
//                                   }}
//                                 />
//                               </div>
//                               <span className="text-white/60 text-sm w-12 text-right">{count}</span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Reviews List */}
//                 {product.reviews && product.reviews.length > 0 && (
//                   <div className="space-y-6">
//                     <h3 className="text-xl font-semibold text-white">Customer Reviews</h3>
//                     <div className="space-y-4">
//                       {product.reviews.map((review) => {
//                         const reviewDate = new Date(review.created_at).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         });

//                         return (
//                           <div key={review.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
//                             <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
//                               <div>
//                                 <div className="flex items-center gap-2 mb-1 flex-wrap">
//                                   <span className="text-white font-medium">{review.user.full_name || "Anonymous"}</span>
//                                   <span className="text-white/40 text-xs">•</span>
//                                   <span className="text-white/40 text-xs">{reviewDate}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                   {[1, 2, 3, 4, 5].map((star) => (
//                                     <span
//                                       key={star}
//                                       className="text-sm"
//                                       style={{
//                                         color: star <= review.rating ? "#facc15" : "rgba(255,255,255,0.20)",
//                                       }}
//                                     >
//                                       ★
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                             <p className="text-white/70 text-sm leading-relaxed">{review.comment}</p>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getProductBySlug } from "@/lib/supabase/products";
import { supabase } from "@/lib/supabase/client";

const GOLD = "#B08D3C";

type ProductVariant = {
  size?: string;
  shade?: string;
  color?: string;
  code?: string;
  price: number;
  stock: number;
  actual_value: number;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  category_name: string;
  category_slug: string;
  subcategory_name: string;
  description: string;
  features: string[];
  actual_price: number;
  selling_price: number;
  discount_percentage: number;
  stock: number;
  variants: ProductVariant[];
  images: string[];
  materials_info: string;
  ingredients: string;
  how_to_use: string;
  skin_type: string;
  average_rating: number;
  review_count: number;
  reviews?: Review[];
  rating_distribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
};

type Review = {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    full_name: string;
    email: string;
  };
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const variantSectionRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // UI States
  const [selectedImage, setSelectedImage] = useState(0);
  // const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  // Validation states
  const [showVariantError, setShowVariantError] = useState(false);

  const currentPrice = selectedVariant
    ? selectedVariant.price
    : product?.selling_price || 0;
  const currentStock = selectedVariant
    ? selectedVariant.stock
    : product?.stock || 0;

  const MRPprice = selectedVariant
    ? selectedVariant.actual_value : product?.actual_price || 0;

  // Check authentication
  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch product
  useEffect(() => {
    loadProduct();
  }, [slug]);

  // Check if in wishlist
  useEffect(() => {
    if (user && product) {
      checkWishlistStatus();
    }
  }, [user, product]);

  useEffect(() => {
    if (
      product &&
      product.variants &&
      product.variants.length > 0 &&
      !selectedVariant
    ) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user || null);
  }

  async function loadProduct() {
    try {
      setLoading(true);
      setError(null);

      const result = await getProductBySlug(slug);

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.data) {
        throw new Error("Product not found");
      }

      setProduct(result.data as Product);
    } catch (err: any) {
      console.error("Error loading product:", err);
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  }

  async function checkWishlistStatus() {
    if (!user || !product) return;

    try {
      const { data } = await supabase
        .from("wishlist")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      setIsInWishlist(!!data);
    } catch (err) {
      setIsInWishlist(false);
    }
  }

  // Validate variant selection
  function validateVariantSelection(): boolean {
    if (!product) return false;

    // If product has variants, one must be selected
    if (product.variants && product.variants.length > 0) {
      if (!selectedVariant) {
        setShowVariantError(true);
        // Scroll to variant section
        variantSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        // Auto-hide error after 3 seconds
        setTimeout(() => setShowVariantError(false), 3000);
        return false;
      }
    }

    return true;
  }

  async function handleAddToCart() {
    // Check login
    if (!user) {
      router.push(`/auth/login?redirect=/products/${slug}`);
      return;
    }

    if (!product) return;

    // Validate variant selection
    if (!validateVariantSelection()) {
      return;
    }

    try {
      setAddingToCart(true);

      const { data: existingItem } = await supabase
        .from("cart")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

      if (existingItem) {
        const { error } = await supabase
          .from("cart")
          .update({
            quantity: existingItem.quantity + quantity,
            variant: selectedVariant,
          })
          .eq("id", existingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("cart").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: quantity,
          variant: selectedVariant,
        });

        if (error) throw error;
      }

      alert("Added to cart successfully!");
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      alert(err.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleToggleWishlist() {
    if (!user) {
      router.push(`/auth/login?redirect=/products/${slug}`);
      return;
    }

    if (!product) return;

    try {
      setAddingToWishlist(true);

      if (isInWishlist) {
        const { error } = await supabase
          .from("wishlist")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", product.id);

        if (error) throw error;
        setIsInWishlist(false);
      } else {
        const { error } = await supabase.from("wishlist").insert({
          user_id: user.id,
          product_id: product.id,
        });

        if (error) throw error;
        setIsInWishlist(true);
      }
    } catch (err: any) {
      console.error("Error updating wishlist:", err);
      alert(err.message || "Failed to update wishlist");
    } finally {
      setAddingToWishlist(false);
    }
  }

  // function handleBuyNow() {
  //   // Check login
  //   if (!user) {
  //     router.push(`/auth/login?redirect=/products/${slug}`);
  //     return;
  //   }

  //   if (!product) return;

  //   // Validate variant selection
  //   if (!validateVariantSelection()) {
  //     return;
  //   }

  //   // Build checkout URL with query parameters
  //   const params = new URLSearchParams({
  //     product_id: product.id,
  //     quantity: quantity.toString(),
  //   });

  //   if (selectedVariant) {
  //     params.append("variant", selectedVariant);
  //   }

  //   // Navigate to checkout page
  //   router.push(`/checkout/${slug}?${params.toString()}`);
  // }

  function handleBuyNow() {
  if (!user) {
    router.push(`/auth/login?redirect=/products/${slug}`);
    return;
  }

  if (!product) return;

  if (!validateVariantSelection()) {
    return;
  }

  const params = new URLSearchParams({
    product_id: product.id,
    quantity: quantity.toString(),
    price: currentPrice.toString(), // 🔥 ADD THIS LINE
  });

  if (selectedVariant) {
    const variantLabel = selectedVariant.size || selectedVariant.shade || selectedVariant.color || "";
    params.append('variant', variantLabel);
  }

  router.push(`/checkout/${slug}?${params.toString()}`);
}


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
          <p className="text-white/60 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">
            {error || "Product not found"}
          </p>
          <Link
            href="/products"
            className="text-white/70 hover:text-white underline"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const displayImages =
    product.images.length > 0 ? product.images : ["/products/placeholder.png"];

  return (
    <div className="min-h-screen bg-black mt-18 py-10">
      {/* Background Effects */}
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
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link
                href="/"
                className="text-white/60 hover:text-white transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <Link
                href="/products"
                className="text-white/60 hover:text-white transition-colors"
              >
                Products
              </Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white font-medium">
                Product description
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
          {/* Product Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {product.title}
            </h1>
            <p className="text-white/60 text-sm sm:text-base mb-3">
              {product.description}
            </p>
            <div className="flex items-center gap-3">
              {/* {product.stock > 0 ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  In stock
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                  Out of stock
                </span>
              )} */}

              {currentStock > 0 ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  In stock ({currentStock} available)
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                  Out of stock
                </span>
              )}
            </div>
          </div>

          {/* Product Images and Details - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src={displayImages[selectedImage]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Images */}
              {displayImages.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {displayImages.slice(0, 3).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-yellow-600"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-6">
              {/* Features */}
              {/* {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-white/70 text-sm"
                      >
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Price */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Price</h3>
                <div className="flex items-baseline gap-3 flex-wrap">
                  {/* <span className="text-3xl font-bold text-white">
                    {formatPrice(product.selling_price)}
                  </span> */}
                  <span className="text-3xl font-bold text-white">
                    {formatPrice(currentPrice)}
                  </span>

                  {MRPprice > currentPrice && (
                      <>
                        <span className="text-xl text-white/40 line-through">
                          {formatPrice(MRPprice)}
                        </span>
                      <span className="text-sm text-white/60">
                        (MRP incl. of all taxes)
                      </span>
                    </>
                  )}
                </div>
                {product.discount_percentage > 0 && (
                  <div className="mt-2">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-bold text-black"
                      style={{ backgroundColor: GOLD }}
                    >
                      {Math.round(((MRPprice - currentPrice) / MRPprice) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Available Sizes/Variants - WITH ERROR HIGHLIGHTING */}
              {product.variants && product.variants.length > 0 && (
                <div
                  ref={variantSectionRef}
                  className={`border-t border-white/10 pt-6 transition-all duration-300 ${
                    showVariantError
                      ? "ring-2 ring-red-500/50 rounded-lg p-4 -m-4"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">
                      Available Sizes
                      <span className="text-red-500 ml-1">*</span>
                    </h3>
                    {showVariantError && (
                      <div className="flex items-center gap-2 text-red-400 text-sm animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        <span>Please select a size</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, index) => {
                      const variantLabel =
                        variant.size ||
                        variant.shade ||
                        variant.color ||
                        `Option ${index + 1}`;
                      const isSelected = selectedVariant === variant;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setShowVariantError(false);
                          }}
                          disabled={variant.stock === 0}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                            variant.stock === 0
                              ? "opacity-50 cursor-not-allowed"
                              : showVariantError && !isSelected
                                ? "ring-2 ring-red-500/50 animate-pulse"
                                : ""
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? GOLD
                              : "rgba(255,255,255,0.05)",
                            borderColor: isSelected
                              ? "transparent"
                              : showVariantError
                                ? "rgba(239, 68, 68, 0.5)"
                                : "rgba(255,255,255,0.10)",
                            color: isSelected
                              ? "#000000"
                              : "rgba(255,255,255,0.85)",
                          }}
                        >
                          <div className="text-center">
                            <div className="font-semibold">
                              {variant.size || variant.shade || variant.color}
                            </div>
                            <div className="text-xs mt-0.5 opacity-80">
                              {formatPrice(variant.price)}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector - Mobile Friendly */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    -
                  </button>
                  <span className="text-white font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(currentStock, quantity + 1))
                    }
                    disabled={quantity >= currentStock}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons - Mobile Responsive */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                {/* Add to Cart & Wishlist */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart || product.stock === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {addingToCart ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span className="hidden sm:inline">Add To Cart</span>
                        <span className="sm:hidden">Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    disabled={addingToWishlist}
                    className={`px-4 py-3 rounded-lg border transition-all ${
                      isInWishlist
                        ? "bg-red-500/20 border-red-500/30 text-red-400"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                  >
                    {addingToWishlist ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Heart
                        className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
                      />
                    )}
                  </button>
                </div>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full px-6 py-3 rounded-lg font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: GOLD }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Sections - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="space-y-8">
              {product.materials_info && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Materials, Care and origin
                  </h2>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Skin Science
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {product.materials_info}
                    </p>
                  </div>

                  {product.ingredients && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Ingredients
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {product.ingredients}
                      </p>
                    </div>
                  )}

                  {product.how_to_use && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        How to Use
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {product.how_to_use}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {product.features && product.features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Features
                  </h2>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/70 text-sm"
                      >
                        <span className="text-yellow-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.skin_type && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Suitable For
                  </h3>
                  <p className="text-white/70 text-sm">{product.skin_type}</p>
                </div>
              )}
            </div>
          </div>

          {/* Ratings and Reviews */}
          <div className="border-t border-white/10 pt-12">
            <h2 className="text-2xl font-semibold text-white mb-8">
              Ratings & Review
            </h2>

            {!product.review_count || product.review_count === 0 ? (
              <p className="text-white/60 text-center py-12">
                No reviews yet. Be the first to review this product!
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  {/* Overall Rating */}
                  <div className="lg:col-span-1">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-white mb-2">
                          {product.average_rating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className="text-2xl"
                              style={{
                                color:
                                  star <= Math.round(product.average_rating)
                                    ? "#facc15"
                                    : "rgba(255,255,255,0.20)",
                              }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-white/60 text-sm">
                          {product.review_count} Ratings
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating Distribution */}
                  <div className="lg:col-span-2">
                    {product.rating_distribution && (
                      <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count =
                            product.rating_distribution![
                              star as keyof typeof product.rating_distribution
                            ];
                          const percentage =
                            product.review_count > 0
                              ? (count / product.review_count) * 100
                              : 0;

                          return (
                            <div key={star} className="flex items-center gap-3">
                              <div className="flex items-center gap-1 w-12">
                                <span className="text-yellow-400 text-sm">
                                  ★
                                </span>
                                <span className="text-white/70 text-sm">
                                  {star}
                                </span>
                              </div>
                              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: GOLD,
                                  }}
                                />
                              </div>
                              <span className="text-white/60 text-sm w-12 text-right">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Reviews List */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">
                      Customer Reviews
                    </h3>
                    <div className="space-y-4">
                      {product.reviews.map((review) => {
                        const reviewDate = new Date(
                          review.created_at,
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });

                        return (
                          <div
                            key={review.id}
                            className="bg-white/5 rounded-xl p-5 border border-white/10"
                          >
                            <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-white font-medium">
                                    {review.user.full_name || "Anonymous"}
                                  </span>
                                  <span className="text-white/40 text-xs">
                                    •
                                  </span>
                                  <span className="text-white/40 text-xs">
                                    {reviewDate}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                      key={star}
                                      className="text-sm"
                                      style={{
                                        color:
                                          star <= review.rating
                                            ? "#facc15"
                                            : "rgba(255,255,255,0.20)",
                                      }}
                                    >
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
