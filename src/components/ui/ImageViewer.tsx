"use client";

import { useEffect, useRef, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { cn } from "@/lib/cn";
import { useImageViewerStore, ZOOM_MAX, type ViewerImage } from "@/lib/store";

/** 편의 훅 — openImageViewer(images, index) */
export function useImageViewer() {
  return useImageViewerStore((s) => s.openViewer);
}

const BTN =
  "flex items-center justify-center text-white/80 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30";

/**
 * 전역 이미지 뷰어 — 앱의 클릭 가능한 이미지 어디서든 사용.
 * 열기: openImageViewer(images, index) (lib/store)
 * 닫기: ESC · 배경 클릭 · X 버튼
 * 버튼: 이전/다음(이미지 2장 이상), 확대/축소(50–400%, 휠·더블클릭·키보드 지원), 닫기.
 * 100% 초과 시 드래그로 이동.
 */
export default function ImageViewer() {
  const open = useImageViewerStore((s) => s.open);
  const images = useImageViewerStore((s) => s.images);
  const index = useImageViewerStore((s) => s.index);
  const zoom = useImageViewerStore((s) => s.zoom);
  const offset = useImageViewerStore((s) => s.offset);
  const close = useImageViewerStore((s) => s.closeViewer);
  const next = useImageViewerStore((s) => s.next);
  const prev = useImageViewerStore((s) => s.prev);
  const zoomIn = useImageViewerStore((s) => s.zoomIn);
  const zoomOut = useImageViewerStore((s) => s.zoomOut);
  const setOffset = useImageViewerStore((s) => s.setOffset);

  const surfaceRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const [dragging, setDragging] = useState(false);

  const multi = images.length > 1;
  const current: ViewerImage | undefined = images[index];

  // body scroll lock + keyboard
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev, zoomIn, zoomOut]);

  // wheel zoom (React onWheel is passive — attach natively)
  useEffect(() => {
    if (!open) return;
    const el = surfaceRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) zoomIn();
      else zoomOut();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, zoomIn, zoomOut]);

  // drag-to-pan while zoomed
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setOffset({
      x: dragStart.current.ox + (e.clientX - dragStart.current.x),
      y: dragStart.current.oy + (e.clientY - dragStart.current.y),
    });
  };
  const endDrag = () => setDragging(false);

  if (!open || !current) return null;

  return (
    <div
      ref={surfaceRef}
      role="dialog"
      aria-modal="true"
      aria-label="이미지 크게 보기"
      className="fixed inset-0 z-[3000] select-none bg-black/90"
      onClick={close}
    >
      {/* image + caption */}
      <div
        className={cn(
          "absolute inset-0 flex touch-none items-center justify-center p-6 pb-28 md-header:p-20 md-header:pb-32",
          zoom > 1 && (dragging ? "cursor-grabbing" : "cursor-grab"),
        )}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => (zoom > 1 ? zoomOut() : zoomIn())}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transition: dragging ? "none" : "transform 200ms ease-out",
          }}
        >
          <SmartImage
            src={current.src}
            alt={current.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-contain"
            wrapperClassName="bg-transparent"
          />
        </div>
      </div>

      {/* caption */}
      {current.caption && (
        <div className="pointer-events-none absolute bottom-20 left-1/2 w-full max-w-[720px] -translate-x-1/2 px-6 text-center md-header:bottom-24">
          {current.caption.title && (
            <p className="text-[16px] font-bold text-white">
              {current.caption.title}
            </p>
          )}
          {current.caption.description && (
            <p className="mt-2 text-[13px] leading-5 whitespace-pre-line text-white/70">
              {current.caption.description}
            </p>
          )}
        </div>
      )}

      {/* close */}
      <button
        type="button"
        aria-label="닫기"
        onClick={close}
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-white"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* prev / next */}
      {multi && (
        <>
          <button
            type="button"
            aria-label="이전 이미지"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md-header:left-6"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="다음 이미지"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white/80 transition-colors hover:text-white md-header:right-6"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* counter + zoom controls */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-2 py-1.5">
        {multi && (
          <span className="px-3 text-[14px] text-white/80" aria-live="polite">
            {index + 1} / {images.length}
          </span>
        )}
        <span className="mx-1 h-5 w-px bg-white/20" aria-hidden />
        <button
          type="button"
          aria-label="축소"
          onClick={(e) => {
            e.stopPropagation();
            zoomOut();
          }}
          disabled={zoom <= 1}
          className={cn(BTN, "h-9 w-9")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M8 11h6" />
          </svg>
        </button>
        <span className="w-[48px] text-center text-[13px] tabular-nums text-white/80">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          aria-label="확대"
          onClick={(e) => {
            e.stopPropagation();
            zoomIn();
          }}
          disabled={zoom >= ZOOM_MAX}
          className={cn(BTN, "h-9 w-9")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M8 11h6M11 8v6" />
            <path d="M16.5 16.5 21 21" />
          </svg>
        </button>
      </div>
    </div>
  );
}
