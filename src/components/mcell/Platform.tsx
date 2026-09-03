"use client";

import SmartImage from "@/components/ui/SmartImage";
import Appear from "@/components/ui/Appear";
import { useImageViewer } from "@/components/ui/ImageViewer";
import { platform } from "@/data/mcell";

/** 기술의 확장 가능성 — 원본: 타이틀 블록 + 이미지 981x268 (클릭 시 라이트박스) */
export default function Platform() {
  const openViewer = useImageViewer();

  return (
    <section className="bg-white">
      <div className="container-site pt-[60px] pb-[290px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">
            {platform.heading}
          </p>
          <h2 className="text-[30px] font-bold text-ink">{platform.title}</h2>
          <p className="mt-[6px] text-[18px] leading-[2] text-ink">
            {platform.description}
          </p>
          <p aria-hidden className="leading-[2]">
            &nbsp;
          </p>
        </Appear>

        <Appear className="mt-0 block">
          <button
            type="button"
            aria-label="확장 로드맵 이미지 크게 보기"
            onClick={() =>
              openViewer([{ src: platform.image, alt: platform.title }])
            }
            className="mx-auto block cursor-pointer"
          >
            <SmartImage
              src={platform.image}
              alt={platform.title}
              width={981}
              height={268}
              className="mx-auto h-auto w-full max-w-[981px]"
              sizes="(min-width: 992px) 981px, 100vw"
            />
          </button>
        </Appear>
      </div>
    </section>
  );
}
