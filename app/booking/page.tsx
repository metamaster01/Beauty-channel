// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { createClient } from "@supabase/supabase-js";
// import { Facebook, Instagram, Twitter } from "lucide-react";
// import Navbar from "@/components/navbar";
// import BeautyMarquee from "@/components/beautymarquee";
// import { useSearchParams } from "next/navigation";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// const serviceOptions = [
//   "Hair Care",
//   "Skin Treatments",
//   "Makeup Artistry",
//   "Nails & Hand–Foot Care",
//   "Spa & Wellness",
//   "Bridal & Pre-Bridal Packages",
// ];

// export default function BookingPage() {
//   const searchParams = useSearchParams();
//   const serviceFromUrl = searchParams.get("service");

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     datetime: "",
//     note: "",
//     services: [] as string[],
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // 🔥 Toggle service chip
//   const toggleService = (service: string) => {
//     setForm((prev) => {
//       const exists = prev.services.includes(service);
//       return {
//         ...prev,
//         services: exists
//           ? prev.services.filter((s) => s !== service)
//           : [...prev.services, service],
//       };
//     });
//   };

//   // 🔥 Auto select from slug
//   useEffect(() => {
//     if (serviceFromUrl) {
//       const match = serviceOptions.find((s) =>
//         s.toLowerCase().includes(serviceFromUrl.toLowerCase())
//       );
//       if (match) {
//         setForm((prev) => ({
//           ...prev,
//           services: prev.services.includes(match)
//             ? prev.services
//             : [...prev.services, match],
//         }));
//       }
//     }
//   }, [serviceFromUrl]);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     const { error } = await supabase.from("bookings").insert([
//       {
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         datetime: form.datetime,
//         note: form.note,
//         services: form.services, // 👈 array
//       },
//     ]);

//     setLoading(false);

//     if (!error) {
//       setSuccess(true);
//       setForm({
//         name: "",
//         email: "",
//         phone: "",
//         datetime: "",
//         note: "",
//         services: [],
//       });
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <section className="relative min-h-screen bg-[#0B0B0B] text-white overflow-hidden">

//         {/* ===== HERO HEADER ===== */}
//         <div className=" w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-10">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="w-full"
//           >
//             <p className="text-sm text-gray-400 mb-2">Home / Booking page</p>

//             <h1 className="text-4xl md:text-6xl font-[PP Neue Montreal] leading-tight mb-4">
//               BOOK YOUR APPOINTMENT
//             </h1>

//             <p className="text-gray-300 max-w-xl">
//               One place to book all our beauty services—simple, quick, and personalized.
//             </p>
//           </motion.div>
//         </div>

//         {/* GOLD GLOW */}
//         <div className="absolute inset-0 -z-10">
//           <motion.div
//             className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-[#B08D3C]/20 blur-[200px] rounded-full"
//             animate={{ y: [0, 40, 0], x: [0, -40, 0] }}
//             transition={{ duration: 20, repeat: Infinity }}
//           />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

//           {/* ===== LEFT FORM CARD ===== */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7 }}
//             className="bg-gray backdrop-blur-xl rounded-3xl p-4 md:p-6 lg:-mr-52 lg:-mt-12 z-10 max-w-[700px] shadow-2xl border border-white/10"
//           >
//             <p className="text-sm text-gray-400 mb-4">Home / Booking</p>

//             <h2 className="text-3xl md:text-4xl font-[PP Neue Montreal] leading-tight mb-6">
//               GET IN TOUCH WITH US. <br /> WE’RE HERE TO ASSIST YOU.
//             </h2>

//             {/* SOCIAL */}
//             <div className="flex gap-4 mb-8">
//               {[Facebook, Instagram, Twitter].map((Icon, i) => (
//                 <div
//                   key={i}
//                   className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B08D3C] hover:text-black transition"
//                 >
//                   <Icon size={16} />
//                 </div>
//               ))}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 py-3 outline-none" required />
//               <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" className="w-full bg-transparent border-b border-white/20 py-3 outline-none" required />
//               <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number (optional)" className="w-full bg-transparent border-b border-white/20 py-3 outline-none" />

//               {/* MULTI SERVICES */}
//               <div>
//                 <p className="text-sm text-gray-400 mb-2">Select Services</p>
//                 <div className="flex flex-wrap gap-2">
//                   {serviceOptions.map((s) => (
//                     <button
//                       key={s}
//                       type="button"
//                       onClick={() => toggleService(s)}
//                       className={`px-4 py-2 rounded-full border text-sm transition
//                         ${
//                           form.services.includes(s)
//                             ? "bg-[#B08D3C] text-black border-[#B08D3C]"
//                             : "border-white/20 text-white hover:bg-white/10"
//                         }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3 outline-none text-gray-400" required />

//               <textarea name="note" value={form.note} onChange={handleChange} placeholder="Special Note" rows={3} className="w-full bg-transparent border-b border-white/20 py-3 outline-none resize-none" />

//               <button type="submit" disabled={loading} className="mt-4 inline-flex items-center gap-2 bg-[#B08D3C] text-black px-6 py-3 rounded-full hover:scale-105 transition">
//                 {loading ? "Booking..." : "Book Now →"}
//               </button>

//               {success && <p className="text-green-400 text-sm mt-3">Booking submitted successfully 💛</p>}
//             </form>
//           </motion.div>

//           {/* ===== RIGHT IMAGE ===== */}
//           <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative w-full h-[460px] md:h-[620px] lg:h-[760px]">
//             <div className="absolute inset-0 rounded-3xl bg-[#B08D3C] translate-x-1 translate-y-0 mb-8" />
//             <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl -translate-y-8">
//               <Image src="/contactimg.png" alt="Contact Model" fill className="object-cover scale-x-[-1]" />
//             </div>
//           </motion.div>
//         </div>

//         <BeautyMarquee />
//       </section>
//     </>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Navbar from "@/components/navbar";
import BeautyMarquee from "@/components/beautymarquee";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const serviceOptions = [
  "Hair Care",
  "Skin Treatments",
  "Makeup Artistry",
  "Nails & Hand–Foot Care",
  "Spa & Wellness",
  "Bridal & Pre-Bridal Packages",
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const serviceFromUrl = searchParams.get("service");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    datetime: "",
    note: "",
    services: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  /* auto select service from slug */
  useEffect(() => {
    if (serviceFromUrl) {
      const match = serviceOptions.find((s) =>
        s.toLowerCase().includes(serviceFromUrl.toLowerCase())
      );
      if (match && !form.services.includes(match)) {
        setForm((prev) => ({
          ...prev,
          services: [...prev.services, match],
        }));
      }
    }
  }, [serviceFromUrl]);

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* Razorpay */
  const openPayment = (id: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: 49900,
      currency: "INR",
      name: "Neelu Beauty",
      description: "Service Booking",
      handler: async (response: any) => {
        await supabase
          .from("bookings")
          .update({
            status: "paid",
            payment_id: response.razorpay_payment_id,
          })
          .eq("id", id);

        alert("Payment successful 💛");
      },
      theme: { color: "#B08D3C" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          datetime: form.datetime,
          note: form.note,
          services: form.services,
          status: "pending",
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (!error && data) {
      setSuccess(true);
      setBookingId(data.id);
      openPayment(data.id);
    }
  };

  const cancelBooking = async () => {
    if (!bookingId) return;

    await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", bookingId);

    alert("Booking cancelled ❌");
    setBookingId(null);
    setSuccess(false);
  };

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen bg-[#0B0B0B] text-white overflow-hidden">

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-gray-400 mb-2">Home / Booking</p>
            <h1 className="text-4xl md:text-6xl font-[PP Neue Montreal] mb-4">
              BOOK YOUR APPOINTMENT
            </h1>
            <p className="text-gray-300 max-w-xl">
              One place to book all our premium beauty services.
            </p>
          </motion.div>
        </div>

        {/* FORM + IMAGE */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/10 max-w-[700px]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 py-3" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 py-3" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-transparent border-b border-white/20 py-3" />

              {/* SERVICES */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Select Services</p>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={`px-4 py-2 rounded-full border text-sm transition ${
                        form.services.includes(s)
                          ? "bg-[#B08D3C] text-black"
                          : "border-white/20 text-white hover:bg-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 py-3" required />
              <textarea name="note" value={form.note} onChange={handleChange} placeholder="Special Note" rows={3} className="w-full bg-transparent border-b border-white/20 py-3" />

              <button type="submit" disabled={loading} className="bg-[#B08D3C] text-black px-6 py-3 rounded-full">
                {loading ? "Processing..." : "Proceed to Payment →"}
              </button>

              {success && (
                <button onClick={cancelBooking} type="button" className="block text-red-400 text-sm mt-4 underline">
                  Cancel Booking
                </button>
              )}

            </form>
          </motion.div>

          {/* IMAGE */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="relative h-[760px]">
            <div className="absolute inset-0 bg-[#B08D3C] rounded-3xl" />
            <Image src="/contactimg.png" alt="" fill className="object-cover rounded-3xl scale-x-[-1]" />
          </motion.div>
        </div>

        <BeautyMarquee />
      </section>
    </>
  );
}
