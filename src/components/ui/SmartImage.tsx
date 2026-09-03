"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SmartImageProps = Omit<ImageProps, "onLoad" | "onLoadingComplete"> & {
  /** 로딩 스켈레톤 래퍼에 추가할 클래스 */
  wrapperClassName?: string;
};

/**
 * next/image 래퍼 — 로딩 중 스켈레톤+스피너를 보여주고, 로드가 끝나면 이미지를 드러낸다.
 *
 * 나중에 이미지가 외부 스토리지(S3 등)로 옮겨가 커져도 호출부는 그대로 두고
 * 이 컴포넌트 내부(진행률 표시 방식, 로더 구현)만 바꾸면 된다.
 *
 * - 레이아웃은 기존 <Image>와 동일하게 유지: fill 사용 시 래퍼가 absolute inset-0,
 *   그 외에는 인라인 블록으로 축소(w-full 클래스가 있으면 block w-full).
 * - 로드가 빠르면 스켈레톤이 뜨기 전에 지나가도록 150ms 지연 등장.
 * - 이미지 자체의 opacity 클래스(호버 크로스페이드 등)는 건드리지 않는다.
 */
export default function SmartImage({
  className,
  wrapperClassName,
  alt = "",
  priority,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [skeletonGone, setSkeletonGone] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fill = "fill" in rest && rest.fill;
  const cls = className ?? "";
  const fluid = /\bw-full\b/.test(cls);
  const centered = /\bmx-auto\b/.test(cls) && !fluid;

  // 하이드레이션 전에 이미 로드된 캐시 이미지 처리
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded && !failed) return;
    const t = setTimeout(() => setSkeletonGone(true), 400);
    return () => clearTimeout(t);
  }, [loaded, failed]);

  return (
    <div
      aria-busy={(!loaded && !failed) || undefined}
      className={cn(
        "overflow-hidden",
        // fill: 절대 배치 — relative 를 섞으면 Tailwind 유틸 순서상 relative 가 이겨서 래퍼가 무너진다
        fill
          ? "absolute inset-0"
          : cn(
              "relative",
              fluid
                ? "block w-full"
                : centered
                  ? "mx-auto block w-fit"
                  : "inline-block",
            ),
        wrapperClassName,
      )}
    >
      <Image
        ref={imgRef}
        alt={alt}
        priority={priority}
        className={cn(className)}
        onError={() => setFailed(true)}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
      {!skeletonGone && !failed && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 z-[1] grid place-items-center bg-[#f1f1f1] transition-opacity duration-300",
            loaded
              ? "pointer-events-none opacity-0"
              : "skeleton-in opacity-100",
          )}
        >
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-navy-900/15 border-t-navy-900" />
        </div>
      )}
    </div>
  );
}
