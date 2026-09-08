"use client";

import SmartImage from "@/components/ui/SmartImage";
import { useImageViewerStore } from "@/lib/store";
import { useLocale } from "@/i18n/client";
import type { Certification } from "@/data/certifications";

/** 인증서 갤러리 — 원본: 4열(PC)/2열(모바일·태블릿), 이미지 클릭 시 이미지 뷰어 */
export default function CertGallery({ items }: { items: Certification[] }) {
  const openViewer = useImageViewerStore((s) => s.openViewer);
  const locale = useLocale();
  const certName = locale === "ko" ? "엠셀 인증서" : "MCell certificate";
  const viewerImages = items.map((cert) => ({
    src: cert.full,
    alt: certName,
  }));

  return (
    <div className="grid grid-cols-2 gap-x-[10px] gap-y-[16px] md-header:grid-cols-4 md-header:gap-x-5 md-header:gap-y-10">
      {items.map((cert, i) => (
        <button
          key={cert.thumb}
          type="button"
          onClick={() => openViewer(viewerImages, i)}
          aria-label={
            locale === "ko"
              ? `인증서 ${i + 1} 크게 보기`
              : `View certificate ${i + 1} larger`
          }
          className="cursor-pointer"
        >
          <SmartImage
            src={cert.thumb}
            alt={certName}
            width={298}
            height={397}
            className="aspect-[3/4] w-full border border-[#eeeeee] object-cover"
            sizes="(min-width: 992px) 25vw, 50vw"
          />
        </button>
      ))}
    </div>
  );
}
