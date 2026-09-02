"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { industries } from "@/data/home";

export default function Industries() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-[#f5f4f4]">
      <div className="container-site py-20">
        <Reveal>
          <h2 className="text-[30px] font-bold leading-[1.4] text-navy-900">
            {industries.title}
            <br />
            {industries.subtitle}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <Link
                href="/shop"
                className="group relative block h-[397px] overflow-hidden"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <Image
                  src={item.label === "Mobility" && hovered !== i ? item.thumb : item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-end bg-black/0 p-8 transition-colors duration-500 group-hover:bg-black/30">
                  <div className="text-left">
                    <h3 className="text-[32px] font-bold text-ink">{item.label}</h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={industries.moreHref}
            className="inline-block rounded bg-ink px-8 py-3 text-[14px] text-white transition-colors hover:bg-navy-900"
          >
            {industries.moreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}