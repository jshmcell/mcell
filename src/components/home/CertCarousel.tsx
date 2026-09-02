"use client";

import Image from "next/image";
import emblaCarousel from "embla-carousel-react";
import Reveal from "@/components/ui/Reveal";
import { certifications } from "@/data/home";

export default function CertCarousel() {
  const [emblaRef] = emblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });

  return (
    <section className="bg-white">
      <div className="container-site py-20">
        <Reveal>
          <h2 className="text-[30px] font-bold text-navy-900">{certifications.title}</h2>
          <div className="mt-4 text-[18px] leading-8">
            {certifications.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 pb-5">
              {certifications.images.map((img) => (
                <div
                  key={img.thumb}
                  className="min-w-0 shrink-0 basis-[252px] border border-black/10"
                >
                  <Image
                    src={img.thumb}
                    alt="엠셀 인증서"
                    width={252}
                    height={332}
                    className="h-[332px] w-full object-cover"
                    sizes="252px"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}