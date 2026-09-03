"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/site";
import { cn } from "@/lib/cn";
import { CHIPNAV_HEIGHT } from "@/lib/constants";

/** mobile-only horizontally scrollable top-level nav strip (original: .mobile_carousel_nav) */
export default function MobileChipNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="모바일 메뉴"
      className="w-full bg-navy-900 md-header:hidden"
      style={{ height: CHIPNAV_HEIGHT }}
    >
      <div className="h-full overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex h-full items-center px-[15px]">
          {navItems.map((item) => {
            // 현재 페이지 정확히 일치 항목만 하이라이트 (PC 헤더와 동일 규칙)
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-full items-center px-[13px] text-[14px]",
                  active
                    ? "font-bold text-white"
                    : "text-[#dbdbdb] transition-colors hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}