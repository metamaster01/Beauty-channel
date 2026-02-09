



// import { supabase } from "@/lib/supabase";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// type PageProps = {
//   params: Promise<{ slug: string }>;
// };

// export default async function ServicePage({ params }: PageProps) {
//   const { slug } = await params; // 🔥 VERY IMPORTANT (Next 16 fix)

//   const { data: s, error } = await supabase
//     .from("services")
//     .select("*")
//     .eq("slug", slug)
//     .single();

//   if (error || !s) return notFound();

//   return (
//     <section className="bg-black text-white">

//       {/* HERO */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         <div>
//           <p className="text-sm text-gray-400 mb-3">Home / Services</p>

//           <h1 className="text-4xl md:text-6xl font-[PP Neue Montreal] mb-4">
//             {s.hero_title}
//           </h1>

//           <p className="text-[#B08D3C] mb-6">{s.hero_subtitle}</p>

//           <p className="text-gray-300 max-w-xl mb-8">{s.hero_desc}</p>

//           <a
//             href={`/booking?service=${s.slug}`}
//             className="bg-[#B08D3C] text-black px-8 py-3 rounded-full"
//           >
//             Book an Appointment
//           </a>
//         </div>

//         <div className="relative w-full h-[420px] rounded-3xl overflow-hidden">
//           <Image src={s.hero_image} alt={s.hero_title} fill className="object-cover" />
//         </div>
//       </div>

//       {/* ABOUT */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         <div>
//           <h2 className="text-[#B08D3C] mb-3">{s.about_title}</h2>
//           <p className="text-gray-300">{s.about_desc}</p>
//         </div>

//         <div>
//           <h3 className="mb-4">Why Choose Our Services?</h3>
//           <ul className="space-y-2">
//             {s.why_points.map((p: string) => (
//               <li key={p}>• {p}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* GALLERY */}
//       <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
//         <div className="relative w-full h-[320px] rounded-2xl overflow-hidden">
//           <Image src={s.gallery_image} alt="" fill className="object-cover" />
//         </div>
//       </div>

//       {/* SERVICE CARDS */}
//       <div className="bg-[#B08D3C] py-24">
//         <div className="max-w-7xl mx-auto px-6 md:px-12">
//           <h2 className="text-black text-3xl mb-10">Our {s.hero_title}</h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {s.cards.map((c: any) => (
//               <div key={c.no} className="bg-black text-white p-6 rounded-xl">
//                 <p className="text-[#B08D3C] text-sm">{c.no}</p>
//                 <h3 className="mb-2">{c.title}</h3>
//                 <p className="text-gray-300 text-sm">{c.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ServiceLayout from "@/components/ServiceLayout";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  const { data: s, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !s) return notFound();

  return <ServiceLayout service={s} />;
}
