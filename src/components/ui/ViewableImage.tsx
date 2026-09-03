"use client";

import SmartImage from "@/components/ui/SmartImage";
import { useImageViewerStore } from "@/lib/store";
import type { ViewerImage } from "@/lib/store";
import { cn } from "@/lib/cn";

type ViewableImageProps = Omit<
  React.ComponentProps<typeof SmartImage>,
  "onClick" | "wrapperClassName"
> & {
  /** 클릭 시 뷰어에 표시할 이미지 목록 (기본: 이 이미지 하나) */
  viewerImages?: ViewerImage[];
  viewerIndex?: number;
  wrapperClassName?: string;
};

/**
 * 클릭하면 전역 이미지 뷰어를 여는 이미지.
 * 뷰어 목록을 넘기지 않으면 이 이미지 하나만 표시한다.
 */
export default function ViewableImage({
  viewerImages,
  viewerIndex = 0,
  className,
  wrapperClassName,
  ...rest
}: ViewableImageProps) {
  const openViewer = useImageViewerStore((s) => s.openViewer);
  const src = (rest as { src?: string }).src ?? "";

  return (
    <button
      type="button"
      aria-label="이미지 크게 보기"
      onClick={() => openViewer(viewerImages ?? [{ src, alt: rest.alt }], viewerIndex)}
      className={cn("block cursor-pointer", wrapperClassName)}
    >
      <SmartImage className={className} {...rest} />
    </button>
  );
}
