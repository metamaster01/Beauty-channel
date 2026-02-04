"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Package, Loader2, ShoppingBag } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const GOLD = "#B08D3C";

type Order = {
  id: string;
  user_id: string;
  total_amount: number;
  subtotal: number;
  delivery_charges: number;
  discount_amount: number;
  promo_code_used: string | null;
  payment_method: string;
  payment_status: string;
  order_status: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  address: any;
  created_at: string;
};

type OrderItem = {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  variant: string | null;
  products: {
    id: string;
    title: string;
    slug: string;
    images: string[];
  };
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OrderConfirmationPage({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  async function loadOrderDetails() {
    try {
      setLoading(true);
      setError(null);

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select(`
          *,
          products (
            id,
            title,
            slug,
            images
          )
        `)
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData || []);
    } catch (err: any) {
      console.error("Error loading order:", err);
      setError(err.message || "Failed to load order details");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
          <p className="text-gray-600 text-sm">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || "Order not found"}</p>
          <Link href="/products" className="text-gray-700 hover:text-gray-900 underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Success Header with Green Background */}
      <div className="bg-gradient-to-b from-green-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12 text-center">
          {/* Animated Success Icon - Lofi Style */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              {/* Ping animation */}
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
              <div className="absolute inset-0 bg-green-300 rounded-full animate-pulse opacity-50" 
                style={{ animationDuration: '2s' }} 
              />
              {/* Main icon */}
              <div className="relative bg-green-500 rounded-full p-6 shadow-lg">
                <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Thank You for Shopping with Us!
          </h1>
          <p className="text-xl text-gray-700 mb-3">
            Your order has been successfully placed
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 shadow-sm">
            <span className="text-sm text-gray-600">Order ID:</span>
            <span className="font-mono font-bold text-gray-900">
              {order.id.substring(0, 13).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice Box - Centered */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-12">
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-8 sm:p-10 shadow-lg">
          {/* Invoice Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-gray-200 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Invoice</h2>
              <p className="text-sm text-gray-600">
                Date: {formatDate(order.created_at)}
              </p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-green-100 text-green-700 border border-green-300">
                <Package className="w-5 h-5" />
                {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Order Items
            </h3>
            <div className="space-y-4">
              {orderItems.map((item) => {
                const productImage =
                  item.products.images && item.products.images.length > 0
                    ? item.products.images[0]
                    : "/products/placeholder.png";

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white border-2 border-gray-200 flex-shrink-0">
                      <Image
                        src={productImage}
                        alt={item.products.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-2 text-lg line-clamp-2">
                        {item.products.title}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {item.variant && (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-semibold text-gray-900">{item.variant}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">Qty:</span>
                          <span className="font-semibold text-gray-900">{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-lg mb-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-8 pb-8 border-b-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Price Breakdown</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-700 text-base">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700 text-base">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {order.delivery_charges === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      formatPrice(order.delivery_charges)
                    )}
                  </span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex items-center justify-between text-green-600 text-base">
                    <span className="font-medium">
                      Discount
                      {order.promo_code_used && (
                        <span className="ml-2 text-xs font-mono bg-green-100 px-2 py-1 rounded border border-green-300">
                          {order.promo_code_used}
                        </span>
                      )}
                    </span>
                    <span className="font-bold">-{formatPrice(order.discount_amount)}</span>
                  </div>
                )}
                <div className="pt-3 mt-3 border-t-2 border-gray-300 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold" style={{ color: GOLD }}>
                    {formatPrice(order.total_amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-8 pb-8 border-b-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Payment Method</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment (Razorpay)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Payment Status</p>
                  <p className="font-bold text-gray-900">
                    <span
                      className={`inline-flex px-3 py-1 rounded-lg text-sm font-bold ${
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                    >
                      {order.payment_status.charAt(0).toUpperCase() +
                        order.payment_status.slice(1)}
                    </span>
                  </p>
                </div>
                {order.razorpay_payment_id && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Payment ID</p>
                    <p className="font-mono text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                      {order.razorpay_payment_id}
                    </p>
                  </div>
                )}
                {order.razorpay_order_id && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Razorpay Order ID</p>
                    <p className="font-mono text-sm text-gray-900 bg-white px-3 py-2 rounded border border-gray-300">
                      {order.razorpay_order_id}
                    </p>
                  </div>
                )}
                {order.payment_method === "cod" && (
                  <div className="sm:col-span-2">
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                      <p className="text-sm text-yellow-900 font-semibold">
                        💰 <strong>Note:</strong> Please keep{" "}
                        <span className="font-bold text-lg">{formatPrice(order.total_amount)}</span>{" "}
                        ready in cash when your order is delivered.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="font-bold text-gray-900 text-lg mb-2">{order.address.full_name}</p>
              <p className="text-gray-700 mb-1">{order.address.address_line1}</p>
              {order.address.address_line2 && (
                <p className="text-gray-700 mb-1">{order.address.address_line2}</p>
              )}
              <p className="text-gray-700 mb-3">
                {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>
              <div className="pt-3 border-t border-gray-300">
                <p className="text-gray-700 mb-1">
                  <span className="text-sm font-semibold text-gray-600">Phone:</span>{" "}
                  <span className="font-semibold">{order.address.phone}</span>
                </p>
                <p className="text-gray-700">
                  <span className="text-sm font-semibold text-gray-600">Email:</span>{" "}
                  <span className="font-semibold">{order.address.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:brightness-110 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: GOLD }}
          >
            Explore More Products
          </Link>
          <Link
            href="/my-orders"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-800 transition-all text-lg shadow-lg hover:shadow-xl"
          >
            Track Your Order
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-10 text-center bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-base text-gray-700 mb-2">
            📧 You will receive an order confirmation email shortly.
          </p>
          <p className="text-base text-gray-700">
            Need help?{" "}
            <Link href="/contact" className="text-gray-900 hover:underline font-bold">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}