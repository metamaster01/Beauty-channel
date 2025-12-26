"use client";

export default function Advertisement() {
  const items = [
    "Haircare",
    "Makeup",
    "Spa",
    "Selfcare",
    "Organic",
    "Skincare",
    "Haircare",
    "Makeup",
  ];

  return (
    <section className="w-full bg-[#0F0F0F] overflow-hidden py-4">
      <div className="relative flex whitespace-nowrap">
        {/* Marquee Track */}
        <div className="marquee flex items-center gap-10">
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-[#D6B35E] text-sm uppercase tracking-widest"
            >
              {/* Golden Icon */}
              <span className="text-[#D6B35E] text-lg">✹</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        .marquee {
          animation: marquee 35s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
