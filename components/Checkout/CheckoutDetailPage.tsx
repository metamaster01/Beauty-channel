"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronRight, Loader2, Tag, CheckCircle2, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const GOLD = "#B08D3C";
const FREE_DELIVERY_THRESHOLD = 1000;
const DELIVERY_CHARGE = 5;

type Product = {
  id: string;
  title: string;
  slug: string;
  selling_price: number;
  actual_price: number;
  images: string[];
  stock: number;
};

type PromoCode = {
  id: string;
  code: string;
  discount_type: "flat" | "percent";
  discount_value: number;
  min_order: number;
  expires_at: string;
  is_active: boolean;
};

type CustomerDetails = {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CheckoutPage({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<string | null>(null);

  const [variantPrice, setVariantPrice] = useState<number | null>(null);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    full_name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">(
    "razorpay",
  );
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const productId = searchParams.get("product_id");
    const urlQuantity = searchParams.get("quantity");
    const urlVariant = searchParams.get("variant");
    const urlPrice = searchParams.get("price");

    if (urlQuantity) setQuantity(parseInt(urlQuantity));
    if (urlVariant) setVariant(urlVariant);
    if (urlPrice) setVariantPrice(parseFloat(urlPrice));

    if (productId) {
      loadProduct(productId);
    } else {
      loadProductBySlug(slug);
    }
  }, [searchParams, slug]);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push(`/auth/login?redirect=/checkout/${slug}`);
      return;
    }

    setUser(session.user);
  }

  async function loadProduct(productId: string) {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("id, title, slug, selling_price, actual_price, images, stock")
        .eq("id", productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err: any) {
      console.error("Error loading product:", err);
      alert("Failed to load product");
      router.push("/products");
    } finally {
      setLoading(false);
    }
  }

  async function loadProductBySlug(productSlug: string) {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("id, title, slug, selling_price, actual_price, images, stock")
        .eq("slug", productSlug)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err: any) {
      console.error("Error loading product:", err);
      alert("Failed to load product");
      router.push("/products");
    } finally {
      setLoading(false);
    }
  }

  async function loadUserProfile() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email, phone, address")
        .eq("id", user.id)
        .single();

      if (data) {
        setCustomerDetails((prev) => ({
          ...prev,
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          phone: data.phone || "",
          ...(data.address && typeof data.address === "object"
            ? data.address
            : {}),
        }));
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }

  async function applyPromoCode() {
    if (!product) return;

    try {
      setApplyingPromo(true);
      setPromoError("");

      const { data, error } = await supabase
        .from("promo_codes")
        .select("*")
        .eq("code", promoCode.toUpperCase())
        .eq("is_active", true)
        .single();

      if (error || !data) {
        setPromoError("Invalid promo code");
        return;
      }

      if (new Date(data.expires_at) < new Date()) {
        setPromoError("Promo code has expired");
        return;
      }

      const subtotal = product.selling_price * quantity;
      if (subtotal < data.min_order) {
        setPromoError(
          `Minimum order of ${formatPrice(data.min_order)} required`,
        );
        return;
      }

      setAppliedPromo(data);
      setPromoCode("");
    } catch (err) {
      setPromoError("Failed to apply promo code");
    } finally {
      setApplyingPromo(false);
    }
  }

  function removePromoCode() {
    setAppliedPromo(null);
    setPromoError("");
  }

  // function calculatePricing() {
  //   if (!product) return { subtotal: 0, delivery: 0, discount: 0, total: 0 };

  //   const subtotal = product.selling_price * quantity;
  //   let delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  //   let discount = 0;

  //   if (appliedPromo) {
  //     if (appliedPromo.discount_type === "flat") {
  //       discount = appliedPromo.discount_value;
  //     } else if (appliedPromo.discount_type === "percent") {
  //       discount = (subtotal * appliedPromo.discount_value) / 100;
  //     }
  //   }

  //   const total = subtotal + delivery - discount;

  //   return { subtotal, delivery, discount, total };
  // }

  function calculatePricing() {
    if (!product) return { subtotal: 0, delivery: 0, discount: 0, total: 0 };

    // 🔥 USE VARIANT PRICE IF AVAILABLE
    const pricePerUnit = variantPrice || product.selling_price;
    const subtotal = pricePerUnit * quantity;

    let delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
    let discount = 0;

    if (appliedPromo) {
      if (appliedPromo.discount_type === "flat") {
        discount = appliedPromo.discount_value;
      } else if (appliedPromo.discount_type === "percent") {
        discount = (subtotal * appliedPromo.discount_value) / 100;
      }
    }

    const total = subtotal + delivery - discount;

    return { subtotal, delivery, discount, total };
  }

  function validateForm(): boolean {
    const newErrors: any = {};

    if (!customerDetails.full_name.trim())
      newErrors.full_name = "Name is required";
    if (!customerDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!customerDetails.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(customerDetails.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!customerDetails.address_line1.trim())
      newErrors.address_line1 = "Address is required";
    if (!customerDetails.city.trim()) newErrors.city = "City is required";
    if (!customerDetails.state.trim()) newErrors.state = "State is required";
    if (!customerDetails.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(customerDetails.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //   async function handlePlaceOrder() {
  //     if (!validateForm()) {
  //       alert("Please fill all required fields correctly");
  //       return;
  //     }

  //     if (!product || !user) return;

  //     try {
  //       setProcessingOrder(true);

  //       const pricing = calculatePricing();

  //       const { data: order, error: orderError } = await supabase
  //         .from("orders")
  //         .insert({
  //           user_id: user.id,
  //           total_amount: pricing.total,
  //           subtotal: pricing.subtotal,
  //           delivery_charges: pricing.delivery,
  //           discount_amount: pricing.discount,
  //           promo_code_used: appliedPromo?.code || null,
  //           payment_method: paymentMethod,
  //           payment_status: paymentMethod === "cod" ? "pending" : "pending",
  //           order_status: "placed",
  //           address: customerDetails,
  //         })
  //         .select()
  //         .single();

  //       if (orderError) throw orderError;

  //       const { error: itemError } = await supabase.from("order_items").insert({
  //         order_id: order.id,
  //         product_id: product.id,
  //         quantity: quantity,
  //         price: product.selling_price,
  //         variant: variant,
  //       });

  //       if (itemError) throw itemError;

  //       if (paymentMethod === "cod") {
  //         router.push(`/order-confirmation/${order.id}`);
  //       } else {
  //         initiateRazorpayPayment(order, pricing.total);
  //       }
  //     } catch (err: any) {
  //       console.error("Error placing order:", err);
  //       alert(err.message || "Failed to place order");
  //     } finally {
  //       setProcessingOrder(false);
  //     }
  //   }

  async function handlePlaceOrder() {
    if (!validateForm()) {
      alert("Please fill all required fields correctly");
      return;
    }

    if (!product || !user) return;

    try {
      setProcessingOrder(true);

      const pricing = calculatePricing();

      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: pricing.total,
          subtotal: pricing.subtotal,
          delivery_charges: pricing.delivery,
          discount_amount: pricing.discount,
          promo_code_used: appliedPromo?.code || null,
          payment_method: paymentMethod,
          payment_status: "pending",
          order_status: "placed",
          address: customerDetails,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order item
      const { error: itemError } = await supabase.from("order_items").insert({
        order_id: order.id,
        product_id: product.id,
        quantity: quantity,
        price: variantPrice || product.selling_price, // 🔥 USE VARIANT PRICE
        variant: variant,
      });

      if (itemError) throw itemError;

      if (paymentMethod === "cod") {
        // COD - Direct to confirmation
        router.push(`/order-confirmation/${order.id}`);
      } else {
        // Razorpay - Create payment order first
        await initiateRazorpayPayment(order, pricing.total);
      }
    } catch (err: any) {
      console.error("Error placing order:", err);
      alert(err.message || "Failed to place order");
    } finally {
      setProcessingOrder(false);
    }
  }

  //   async function initiateRazorpayPayment(order: any, amount: number) {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     script.onload = () => {
  //       const options = {
  //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //         amount: amount * 100,
  //         currency: "INR",
  //         name: "Beauty Channel",
  //         description: `Order #${order.id.substring(0, 8)}`,
  //         handler: async function (response: any) {
  //           try {
  //             await supabase
  //               .from("orders")
  //               .update({
  //                 razorpay_payment_id: response.razorpay_payment_id,
  //                 payment_status: "paid",
  //               })
  //               .eq("id", order.id);

  //             router.push(`/order-confirmation/${order.id}`);
  //           } catch (err) {
  //             alert("Payment successful but failed to update order");
  //           }
  //         },
  //         prefill: {
  //           name: customerDetails.full_name,
  //           email: customerDetails.email,
  //           contact: customerDetails.phone,
  //         },
  //         theme: {
  //           color: GOLD,
  //         },
  //       };

  //       const razorpay = new (window as any).Razorpay(options);
  //       razorpay.open();
  //     };
  //   }

  async function initiateRazorpayPayment(order: any, amount: number) {
    try {
      // Call backend API to create Razorpay order
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
          orderId: order.id,
          notes: {
            orderId: order.id,
            userId: user.id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }

      const { orderId: razorpayOrderId } = await response.json();

      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "Beauty Channel",
          description: `Order #${order.id.substring(0, 8)}`,
          order_id: razorpayOrderId,
          handler: async function (response: any) {
            try {
              // Verify payment on backend
              const verifyResponse = await fetch("/api/payment/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: order.id,
                }),
              });

              if (!verifyResponse.ok) {
                throw new Error("Payment verification failed");
              }

              // Payment verified successfully
              router.push(`/order-confirmation/${order.id}`);
            } catch (err) {
              console.error("Payment verification error:", err);
              alert(
                "Payment successful but verification failed. Please contact support.",
              );
            }
          },
          prefill: {
            name: customerDetails.full_name,
            email: customerDetails.email,
            contact: customerDetails.phone,
          },
          theme: {
            color: GOLD,
          },
          modal: {
            ondismiss: function () {
              setProcessingOrder(false);
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();

        razorpay.on("payment.failed", function (response: any) {
          console.error("Payment failed:", response.error);
          alert("Payment failed. Please try again.");
          setProcessingOrder(false);
        });
      };

      script.onerror = () => {
        alert("Failed to load payment gateway. Please try again.");
        setProcessingOrder(false);
      };
    } catch (err: any) {
      console.error("Error initiating payment:", err);
      alert("Failed to initiate payment. Please try again.");
      setProcessingOrder(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-white/60 animate-spin" />
          <p className="text-white/60 text-sm">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Product not found</p>
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

  const pricing = calculatePricing();
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/products/placeholder.png";

  return (
    <div className="min-h-screen bg-black">
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
              <Link
                href={`/products/${product.slug}`}
                className="text-white/60 hover:text-white transition-colors"
              >
                {product.title}
              </Link>
              <ChevronRight className="w-4 h-4 text-white/40" />
              <span className="text-white font-medium">Checkout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information Form - Import and use from Part1 */}
              <CustomerDetailsForm
                details={customerDetails}
                setDetails={setCustomerDetails}
                errors={errors}
              />

              {/* Payment Method - Import and use from Part2 */}
              <PaymentMethodSelector
                selectedMethod={paymentMethod}
                setSelectedMethod={setPaymentMethod}
                totalAmount={pricing.total}
              />

              {/* Mobile Place Order Button */}
              <div className="lg:hidden">
                <button
                  onClick={handlePlaceOrder}
                  disabled={processingOrder || product.stock === 0}
                  className="w-full px-6 py-4 rounded-lg font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: GOLD }}
                >
                  {processingOrder ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order • ${formatPrice(pricing.total)}`
                  )}
                </button>
              </div>
            </div>

            {/* Right Column - Order Summary - Import and use from Part2 */}
            <div className="lg:col-span-1">
              <OrderSummary
                product={product}
                productImage={productImage}
                quantity={quantity}
                setQuantity={setQuantity}
                variant={variant}
                variantPrice={variantPrice}
                pricing={pricing}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                appliedPromo={appliedPromo}
                promoError={promoError}
                applyingPromo={applyingPromo}
                onApplyPromo={applyPromoCode}
                onRemovePromo={removePromoCode}
                onPlaceOrder={handlePlaceOrder}
                processingOrder={processingOrder}
                stockAvailable={product.stock}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import components from Part1 and Part2 files
// Or copy them here inline - I'll include them inline below for completeness:

function CustomerDetailsForm({ details, setDetails, errors }: any) {
  const handleChange = (field: string, value: string) => {
    setDetails({ ...details, [field]: value });
  };

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Contact Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={details.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
              errors.full_name ? "border-red-500" : "border-white/10"
            } text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all`}
            placeholder="Enter your full name"
          />
          {errors.full_name && (
            <p className="mt-1 text-xs text-red-400">{errors.full_name}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={details.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.email ? "border-red-500" : "border-white/10"
              } text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={details.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.phone ? "border-red-500" : "border-white/10"
              } text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all`}
              placeholder="10-digit phone"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={details.address_line1}
            onChange={(e) => handleChange("address_line1", e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
              errors.address_line1 ? "border-red-500" : "border-white/10"
            } text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all`}
            placeholder="Street address, house no."
          />
          {errors.address_line1 && (
            <p className="mt-1 text-xs text-red-400">{errors.address_line1}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Address Line 2
          </label>
          <input
            type="text"
            value={details.address_line2}
            onChange={(e) => handleChange("address_line2", e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all"
            placeholder="Apartment, suite, etc. (optional)"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={details.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.city ? "border-red-500" : "border-white/10"
              } text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all`}
              placeholder="City"
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-400">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={details.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.state ? "border-red-500" : "border-white/10"
              } text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all`}
              placeholder="State"
            />
            {errors.state && (
              <p className="mt-1 text-xs text-red-400">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={details.pincode}
              onChange={(e) => handleChange("pincode", e.target.value)}
              className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                errors.pincode ? "border-red-500" : "border-white/10"
              } text-white placeholder-white/40 focus:border-yellow-600/50 transition-all`}
              placeholder="6-digit PIN"
            />
            {errors.pincode && (
              <p className="mt-1 text-xs text-red-400">{errors.pincode}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethodSelector({
  selectedMethod,
  setSelectedMethod,
  totalAmount,
}: any) {
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>

      <div className="space-y-4">
        <button
          onClick={() => setSelectedMethod("razorpay")}
          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
            selectedMethod === "razorpay"
              ? "border-yellow-600 bg-yellow-600/10"
              : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                selectedMethod === "razorpay"
                  ? "border-yellow-600"
                  : "border-white/30"
              }`}
            >
              {selectedMethod === "razorpay" && (
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white mb-1">
                Online Payment (UPI, Card, Net Banking)
              </div>
              <div className="text-sm text-white/60">
                Pay securely using Razorpay
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
                  UPI
                </span>
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
                  Cards
                </span>
                <span className="text-xs px-2 py-1 rounded bg-white/10 text-white/80">
                  Net Banking
                </span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setSelectedMethod("cod")}
          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
            selectedMethod === "cod"
              ? "border-yellow-600 bg-yellow-600/10"
              : "border-white/10 bg-white/5 hover:border-white/20"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                selectedMethod === "cod"
                  ? "border-yellow-600"
                  : "border-white/30"
              }`}
            >
              {selectedMethod === "cod" && (
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white mb-1">
                Cash on Delivery (COD)
              </div>
              <div className="text-sm text-white/60 mb-2">
                Pay when you receive the product
              </div>

              {selectedMethod === "cod" && (
                <div className="mt-3 p-3 rounded-lg bg-yellow-600/20 border border-yellow-600/30">
                  <p className="text-xs text-yellow-200 leading-relaxed">
                    <strong>Note:</strong> You will pay{" "}
                    {formatPrice(totalAmount)} in cash when the order is
                    delivered to you.
                  </p>
                </div>
              )}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

function OrderSummary({
  product,
  productImage,
  quantity,
  setQuantity,
  variant,
  variantPrice,
  pricing,
  promoCode,
  setPromoCode,
  appliedPromo,
  promoError,
  applyingPromo,
  onApplyPromo,
  onRemovePromo,
  onPlaceOrder,
  processingOrder,
  stockAvailable,
}: any) {
  return (
    <div className="sticky top-6">
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>

        <div className="mb-6">
          <div className="flex gap-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
              <Image
                src={productImage}
                alt={product.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">
                {product.title}
              </h3>
              {variant && (
                <p className="text-white/60 text-xs mb-1">Size: {variant}</p>
              )}
              {/* <p className="text-white/80 text-sm font-semibold">
                {formatPrice(product.selling_price)}
              </p> */}
              <p className="text-white/80 text-sm font-semibold">
                {formatPrice(variantPrice || product.selling_price)}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                >
                  -
                </button>
                <span className="text-white font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(stockAvailable, quantity + 1))
                  }
                  disabled={quantity >= stockAvailable}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 pb-6 border-b border-white/10">
          {!appliedPromo ? (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                <Tag className="w-4 h-4 inline mr-1" />
                Have a promo code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-yellow-600/50 transition-all text-sm"
                />
                <button
                  onClick={onApplyPromo}
                  disabled={!promoCode.trim() || applyingPromo}
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: GOLD, color: "#000" }}
                >
                  {applyingPromo ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
              {promoError && (
                <p className="mt-2 text-xs text-red-400">{promoError}</p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/20 border border-green-500/30">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-green-400">
                    {appliedPromo.code}
                  </p>
                  <p className="text-xs text-green-300/80">
                    {appliedPromo.discount_type === "flat"
                      ? `₹${appliedPromo.discount_value} off`
                      : `${appliedPromo.discount_value}% off`}
                  </p>
                </div>
              </div>
              <button
                onClick={onRemovePromo}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Subtotal</span>
            <span className="text-white font-medium">
              {formatPrice(pricing.subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Delivery</span>
            <span className="text-white font-medium">
              {pricing.delivery === 0 ? (
                <span className="text-green-400">FREE</span>
              ) : (
                formatPrice(pricing.delivery)
              )}
            </span>
          </div>
          {pricing.discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Discount</span>
              <span className="text-green-400 font-medium">
                -{formatPrice(pricing.discount)}
              </span>
            </div>
          )}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-white font-bold text-lg">
              {formatPrice(pricing.total)}
            </span>
          </div>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={processingOrder || stockAvailable === 0}
          className="hidden lg:flex w-full px-6 py-4 rounded-lg font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2"
          style={{ backgroundColor: GOLD }}
        >
          {processingOrder ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>

        {pricing.delivery > 0 && (
          <p className="mt-4 text-xs text-white/60 text-center">
            Add {formatPrice(1000 - pricing.subtotal)} more for FREE delivery
          </p>
        )}
      </div>
    </div>
  );
}
