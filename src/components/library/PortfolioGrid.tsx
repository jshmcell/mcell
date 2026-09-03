"use client";

import { useState } from "react";
import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { useImageViewer } from "@/components/ui/ImageViewer";
import { portfolioItems } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/**
 * 포트폴리오 갤러리 — 원본 /39 갤러리 위젯과 동일:
 * 3열(PC) / 2열(모바일), 셀 패딩 5px / 2.5px, 이미지 4:3 커버,
 * 이미지 위 중앙 흰색 14px 타이틀 항상 표시, 클릭 시 라이트박스(원본+이름 캡션).
 * 모바일은 4개만 보이고 더보기(76x39, #363636, 흰색 12px)로 나머지 표시.
 * 섹션 여백: 상 15px / 하 15px (PC), 상 8px + 더보기mt 8px + 하 7px (모바일).
 */
const MOBILE_VISIBLE = 4;

export default function PortfolioGrid() {
  const openViewer = useImageViewer();
  const [expanded, setExpanded] = useState(false);
  const viewerImages = portfolioItems.map((p) => ({
    src: p.full,
    alt: p.name,
    caption: { title: p.name, description: "" },
  }));

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[350px] px-0 pt-[8px] pb-[7px] md-header:max-w-[1260px] md-header:pt-[15px] md-header:pb-[15px]">
        <div className="grid grid-cols-2 md-header:grid-cols-3">
          {portfolioItems.map((item, i) => (
            <div
              key={item.name}
              className={cn(
                "p-[2.5px] md-header:p-[5px]",
                !expanded && i >= MOBILE_VISIBLE && "hidden md-header:block",
              )}
            >
              <Appear animation="fadeIn" duration={0.7} delay={(i % 3) * 0.1}>
                <button
                  type="button"
                  aria-label={`${item.name} 크게 보기`}
                  onClick={() => openViewer(viewerImages, i)}
                  className="relative block w-full cursor-pointer"
                >
                  <SmartImage
                    src={item.thumb}
                    alt={item.name}
                    width={408}
                    height={307}
                    className="block aspect-[4/3] w-full object-cover"
                    sizes="(min-width: 992px) 410px, 50vw"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-center text-[14px] leading-[22.4px] text-white">
                    {item.name}
                  </span>
                </button>
              </Appear>
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="mt-[8px] text-center md-header:hidden">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-block h-[39px] w-[76px] rounded-[2px] border border-[#363636] bg-[#363636] text-[12px] text-white"
            >
              더보기
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
