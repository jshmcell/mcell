"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type AppearAnimation = "fadeIn" | "fadeInUp" | "zoomIn";

interface AppearProps {
  children: React.ReactNode;
  /** 원본 imweb 위젯 등장 애니메이션 (기본 fadeInUp) */
  animation?: AppearAnimation;
  duration?: number;
  delay?: number;
  /** 모바일(992px 미만)에서는 원본 모바일 위젯이 애니메이션 없이 바로 보이므로 생략 */
  disableOnMobile?: boolean;
  className?: string;
}

/**
 * 원본 imweb 위젯의 "나타나기" 효과 — 뷰포트에 들어올 때 한 번 재생 (wow.js 방식).
 * 재생 전에는 visibility: hidden, 지연 시간 동안은 from 상태(투명)를 유지한다.
 */
export default function Appear({
  children,
  animation = "fadeInUp",
  duration = 1.2,
  delay = 0.3,
  disableOnMobile = false,
  className,
}: AppearProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [pc, setPc] = useState(true);

  useEffect(() => {
    if (!disableOnMobile) return;
    const mq = window.matchMedia("(min-width: 992px)");
    const update = () => setPc(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [disableOnMobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = shown && !(disableOnMobile && !pc);

  return (
    <div
      ref={ref}
      className={cn(!shown && "wg-appear-pending", className)}
      style={
        animate
          ? { animation: `${animation} ${duration}s ease ${delay}s both` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
