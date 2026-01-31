// app/products/[slug]/page.tsx

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Products from "@/components/product";
import ProductDetailPage from "@/components/ProductPage/ProductDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <ProductDetailPage slug={slug} />;
      <Products />
      <Footer />
    </div>
  );
}

// Optional: Generate metadata for SEO
// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   // You can fetch product data here for SEO
//   return {
//     title: `Product - Beauty Channel`,
//     description: `View product details`,
//   };
// }
