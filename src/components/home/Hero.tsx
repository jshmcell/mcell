"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/home";

export default function Hero() {
  const slide = heroSlides[0];

  return (
    <>
      {/* PC variant */}
      <section className="relative hidden overflow-hidden md-header:block">
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
          className="relative z-10 pb-[166px] pt-[174px] text-center text-white"
        >
          <Image
            src={slide.logo}
            alt="엠셀"
            width={161}
            height={0}
            className="mx-auto h-auto"
            priority
          />
          <p className="mt-[29px] text-[20px] leading-[26px]">{slide.tagline}</p>
          <h1 className="mt-[10px] text-[36px] font-bold leading-[48px]">{slide.title}</h1>
          <p className="mt-[9px] text-[18px] leading-[30px]">{slide.description}</p>
        </motion.div>
      </section>

      {/* Mobile variant */}
      <section className="relative overflow-hidden md-header:hidden">
        <div className="absolute inset-0">
          <Image
            src={slide.bgMobile ?? slide.bg}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative z-10 py-[30px] text-center text-white"
        >
          <Image
            src={slide.logo}
            alt="엠셀"
            width={161}
            height={0}
            className="mx-auto h-auto"
            priority
          />
          <p className="mt-[24px] text-[20px]">{slide.tagline}</p>
          <h1 className="mt-[6px] whitespace-pre-line text-[22px] font-bold leading-[2]">{slide.titleMobile ?? slide.title}</h1>
          <p className="mt-[6px] whitespace-pre-line text-[14px] leading-[2]">{slide.descriptionMobile ?? slide.description}</p>
        </motion.div>
      </section>
    </>
  );
}