import { cn } from "@/lib/cn";

interface InfiniteSliderProps {
  images: string[];
  /** 아이템 높이(px) */
  itemHeight?: number;
  /** 아이템 너비(px) */
  itemWidth?: number;
  /** 한 사이클 시간(초) — 클수록 느림 */
  duration?: number;
  className?: string;
}

/**
 * 무한 슬라이드 — 원본 slide_05 갤러리(owl loop + autoplay)와 동일하게
 * 이미지를 이어 붙여 한 방향으로 계속 흐르는 마퀴. 리스트를 2회 렌더링해 -50% 루프.
 */
export default function InfiniteSlider({
  images,
  itemHeight = 166,
  itemWidth = 216,
  duration = 36,
  className,
}: InfiniteSliderProps) {
  const copies = 2;

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden>
      <div
        className="flex w-max animate-[strip-slide_var(--strip-duration)_linear_infinite]"
        style={
          {
            "--strip-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {Array.from({ length: copies }).map((_, copy) => (
          <div key={copy} className="flex">
            {images.map((src, i) => (
              <div
                key={`${copy}-${i}`}
                className="shrink-0 p-[6px]"
                style={{ width: itemWidth }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-[154px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
