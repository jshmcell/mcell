import { cn } from "@/lib/cn";

interface SubPageBannerProps {
  image: string;
  /** 원본: 연혁/인증서/Contact 배너에는 rgba(0,0,0,0.45) 오버레이가 있고 About 배너에는 없음 */
  overlay?: boolean;
  /** 높이 오버라이드 (기본: 290px 모바일 / 245px 태블릿 / 300px PC) */
  heightClassName?: string;
}

/**
 * 서브페이지 배너 (원본: 300px PC / ~245px 태블릿 / ~285px 모바일,
 * PC에서 background-attachment: fixed 시차 스크롤)
 */
export default function SubPageBanner({
  image,
  overlay = false,
  heightClassName,
}: SubPageBannerProps) {
  return (
    <section className="relative">
      <div
        role="img"
        aria-label=""
        className={cn(
          "bg-cover bg-center bg-no-repeat md-header:bg-fixed",
          heightClassName ??
            "h-[290px] md:h-[245px] md-header:h-[300px]",
        )}
        style={{ backgroundImage: `url(${image})` }}
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-black/45" />
      )}
    </section>
  );
}
