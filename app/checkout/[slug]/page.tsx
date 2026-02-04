// app/checkout/[slug]/page.tsx

import CheckoutPage from "@/components/Checkout/CheckoutDetailPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CheckoutPage slug={slug} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `Checkout - Beauty Channel`,
    description: `Complete your purchase`,
  };
}