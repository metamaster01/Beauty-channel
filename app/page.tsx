import Hero from "@/components/hero";
import WhyChoose from "@/components/whychoose";
import Image from "next/image";

export default function Home() {
  return (
     <main className="min-h-screen bg-white overflow-x-hidden">
      <Hero/>
      <WhyChoose/>
      </main>
  );
}
