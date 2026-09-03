"use client";

import { cn } from "@/lib/cn";
import { useImageViewer } from "@/components/ui/ImageViewer";

interface InfiniteSliderProps {
  images: string[];
  /** 라이트박스 원본 (images와 1:1 대응) — 전달 시 클릭하면 뷰어로 크게 보기. 원본 갤러리 data-src에 해당 */
  fullImages?: string[];
  /** 한 사이클 시간(초) — 클수록 느림 */
  duration?: number;
  className?: string;
}

/**
 * 무한 슬라이드 — 원본 slide_05 갤러리(owl loop + autoplay)와 동일하게
 * 이미지를 이어 붙여 한 방향으로 계속 흐르는 마퀴. 원본처럼 클릭하면
 * 라이트박스(_lightbox_item)로 원본 이미지를 크게 보여준다.
 * 원본 계측 (하단 파트너 스트립, 뷰포트 비례):
 *   아이템 너비 = 50vw - 40px (모바일) / 20vw - 40px (PC, 992px+),
 *   이미지 4:3 + 거터 6px → 아이템 높이 자동 결정.
 *   실측: 375→148x114, 1280→216x166, 1845→329x248, 1920→344x262.
 */
export default function InfiniteSlider({
  images,
  fullImages,
  duration = 36,
  className,
}: InfiniteSliderProps) {
  const copies = 2;
  const openViewer = useImageViewer();
  const clickable = !!fullImages?.length;
  const viewerImages = (fullImages ?? images).map((src) => ({ src }));

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div
        className="flex w-max animate-[strip-slide_var(--strip-duration)_linear_infinite]"
        style={
          {
            "--strip-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }).map((_, copy) => (
          <div key={copy} className="flex" aria-hidden={copy > 0}>
            {images.map((src, i) => (
              <div
                key={`${copy}-${i}`}
                className="w-[calc(50vw-40px)] shrink-0 p-[6px] md-header:w-[calc(20vw-40px)]"
              >
                {clickable ? (
                  <button
                    type="button"
                    aria-label={`이미지 크게 보기 ${i + 1}`}
                    onClick={() => openViewer(viewerImages, i)}
                    className="block w-full cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </button>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={src}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
