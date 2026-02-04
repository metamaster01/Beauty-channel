// app/order-confirmation/[orderId]/page.tsx

import OrderConfirmationPage from "@/components/Checkout/OrderConfirmation";

export default async function Page({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return <OrderConfirmationPage orderId={orderId} />;
}

export async function generateMetadata({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return {
    title: `Order Confirmation - Beauty Channel`,
    description: `Your order has been successfully placed`,
  };
}