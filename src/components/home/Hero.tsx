"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/home";

export default function Hero() {
  const slide = heroSlides[0];

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={slide.bg}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/45" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 px-5 py-40 text-center text-white"
      >
        <Image
          src={slide.logo}
          alt="엠셀"
          width={161}
          height={0}
          className="mx-auto h-auto"
          priority
        />
        <p className="mt-10 text-[20px]">{slide.tagline}</p>
        <h1 className="mt-2 text-[36px] font-bold leading-[1.2]">{slide.title}</h1>
        <p className="mt-3 text-[18px] leading-[2]">{slide.description}</p>
      </motion.div>
    </section>
  );
}