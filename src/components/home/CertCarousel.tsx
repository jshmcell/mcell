"use client";

import { useCallback, useEffect, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import useEmblaCarousel from "embla-carousel-react";
import Reveal from "@/components/ui/Reveal";
import { useImageViewerStore } from "@/lib/store";
import { certifications } from "@/data/home";

/** 라이트박스용 원본 이미지 목록 (인증서 전체) */
const viewerImages = certifications.images.map((img) => ({
  src: img.full,
  alt: "엠셀 인증서",
}));

export default function CertCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 12,
  });
  const [isPC, setIsPC] = useState(true);
  const [selected, setSelected] = useState(0);
  const openViewer = useImageViewerStore((s) => s.openViewer);
  const viewerOpen = useImageViewerStore((s) => s.open);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const update = () => setIsPC(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const perView = isPC ? 5 : 2;
  const pages = Math.ceil(certifications.images.length / perView);
  const activePage = Math.floor(selected / perView) % pages;

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // original: autoplay every 2s, 0.2s slide effect; pauses while the viewer is open
  useEffect(() => {
    if (!emblaApi || viewerOpen) return;
    const id = setInterval(() => emblaApi.scrollNext(), 2000);
    return () => clearInterval(id);
  }, [emblaApi, viewerOpen]);

  const goToPage = useCallback(
    (page: number) => {
      emblaApi?.scrollTo(page * perView);
    },
    [emblaApi, perView],
  );

  return (
    <section className="bg-white">
      <div className="container-site relative pb-[47px] pt-[48px] md-header:pb-[110px] md-header:pt-[110px]">
        <Reveal direction="fade" duration={0.7} className="my-[15px]">
          <div className="pt-[10px]">
            <h2 className="text-[20px] font-bold leading-[24px] text-navy-900 md-header:text-[30px] md-header:leading-[36px]">
              {certifications.title}
            </h2>
            <div className="mt-[10px] text-[15px] leading-[30px] text-ink md-header:text-[18px]">
              {certifications.description.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mb-[15px] mt-[15px] md-header:mt-[30px]">
          <div className="-mx-[5px] overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {certifications.images.map((img, i) => (
                <div
                  key={img.thumb}
                  className="min-w-0 shrink-0 grow-0 basis-[50%] p-[5px] md-header:basis-[252px]"
                >
                  <button
                    type="button"
                    aria-label="인증서 크게 보기"
                    onClick={() => openViewer(viewerImages, i)}
                    className="block w-full cursor-pointer border border-[#eee] bg-white"
                  >
                    <div className="relative h-[224px] w-full md-header:h-[320px]">
                      <SmartImage
                        src={img.thumb}
                        alt="엠셀 인증서"
                        fill
                        sizes="(max-width: 991px) 45vw, 17vw"
                        className="object-cover"
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* original: 8px circular dots, active #363636 */}
          <div className="flex h-[20px] items-center justify-center">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`인증서 ${i + 1}페이지`}
                onClick={() => goToPage(i)}
                className="flex h-[18px] w-[16px] cursor-pointer items-center justify-center"
              >
                <span
                  className={
                    i === activePage
                      ? "h-2 w-2 rounded-[30px] bg-[#363636]"
                      : "h-2 w-2 rounded-[30px] border border-[#ccc] bg-transparent"
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
