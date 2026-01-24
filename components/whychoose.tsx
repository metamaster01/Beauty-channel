"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  easeIn,
  easeInOut,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionProps,
} from "framer-motion";

type WhyCard = {
  title: string;
  description: string;
};

const TOP_CARDS: WhyCard[] = [
  {
    title: "Expert Hands",
    description: "Stylists with years of experience in hair, skin, makeup, and nails.",
  },
  {
    title: "Luxury Care",
    description: "Soft ambience, premium tools, and high-standard hygiene for a spa-like feel.",
  },
  {
    title: "Tailored Beauty",
    description: "We understand your unique style and customize services to suit you.",
  },
];

export default function WhyChoose() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const rawImgY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 12, reduce ? 0 : -12]);
  const imgY = useSpring(rawImgY, { stiffness: 120, damping: 22, mass: 0.7 });

  const rawImgScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.0]);
  const imgScale = useSpring(rawImgScale, { stiffness: 120, damping: 22, mass: 0.7 });

  const container = {
    hidden: {},
    visible: {
      transition: reduce
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.14, delayChildren: 0.08 },
    },
  };

  const heading = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 14,
      filter: reduce ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: easeIn },
    },
  };

  const cardIn = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 24,
      scale: reduce ? 1 : 0.94,
      rotateX: reduce ? 0 : 10,
      rotateY: reduce ? 0 : -5,
      filter: reduce ? "blur(0px)" : "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: easeInOut },
    },
  };

  const imageWrap = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 22,
      scale: reduce ? 1 : 0.97,
      rotate: reduce ? 0 : -1,
      filter: reduce ? "blur(0px)" : "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 1.0, ease: easeInOut },
    },
  };

  const shine = {
    hidden: { x: "-120%", opacity: 0 },
    visible: {
      x: "120%",
      opacity: reduce ? 0 : 1,
      transition: { duration: 1.15, ease: easeInOut, delay: 0.2 },
    },
  };

  const floatIconProps: MotionProps | undefined = reduce
    ? undefined
    : {
        animate: { y: [0, -3, 0] },
        transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <div ref={wrapRef}>
      {/* Background like your screenshot */}
      <section className="bg-[#B08D3C]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <motion.div
            className="text-center"
            variants={heading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Why choose us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              A beauty destination made for your comfort and confidence.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 [perspective:1200px]"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
          >
            {TOP_CARDS.map((c) => (
              <motion.div
                key={c.title}
                variants={cardIn}
                style={{ transformStyle: "preserve-3d" }}
              >
                <WhyCardBox
                  title={c.title}
                  description={c.description}
                  floatIconProps={floatIconProps}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Image card like screenshot (light container) */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-white lg:col-span-2"
              variants={imageWrap}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10" />

              <motion.div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                variants={shine}
              />

              <div className="relative h-[240px] w-full sm:h-[320px] lg:h-full lg:min-h-[260px]">
                <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                  <Image
                    src="/salon1.png"
                    alt="Salon interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    priority={false}
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              variants={cardIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              style={{ transformStyle: "preserve-3d" }}
              className="lg:col-span-1"
            >
              <WhyCardBox
                className="h-full"
                title="A Trusted Experience"
                description="Thousands of clients rely on us for important events, daily grooming, and complete transformations."
                floatIconProps={floatIconProps}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhyCardBox({
  title,
  description,
  className = "",
  floatIconProps,
}: {
  title: string;
  description: string;
  className?: string;
  floatIconProps?: MotionProps;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        rotate: -0.6,
        scale: 1.03,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.99 }}
      className={[
        "group relative overflow-hidden rounded-2xl p-5 text-white shadow-sm sm:p-6",
        "min-h-[140px] sm:min-h-[165px]",
        className,
      ].join(" ")}
      style={{
        backgroundColor: "#0B0B0B",
        boxShadow: "0 10px 25px rgba(0,0,0,0.20), 0 2px 8px rgba(0,0,0,0.14)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-12 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.16), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.10), transparent 42%)",
        }}
      />

      <motion.div
        {...(floatIconProps ?? {})}
        className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-neutral-900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M7 17L17 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 7H17V14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <div className="pt-10">
        <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/90">{description}</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/15" />
    </motion.div>
  );
}
