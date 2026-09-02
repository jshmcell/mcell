"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/lib/store";
import { navItems } from "@/data/site";
import { cn } from "@/lib/cn";

export default function MobileDrawer() {
  const open = useUiStore((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => toggleMobileMenu(false)}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 flex h-full w-[300px] flex-col bg-white">
        <div className="flex h-[60px] items-center justify-end px-4">
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={() => toggleMobileMenu(false)}
            className="text-2xl text-ink"
          >
            ×
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-black/5">
                <Link
                  href={item.href}
                  onClick={() => toggleMobileMenu(false)}
                  className={cn(
                    "block px-6 py-4 text-[15px] font-medium text-ink",
                    pathname.startsWith(item.href) && "text-accent"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="pb-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => toggleMobileMenu(false)}
                          className="block px-9 py-2.5 text-[13px] text-ink-soft"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4 border-t border-black/5 px-6 py-4 text-[14px]">
          <Link href="/login" onClick={() => toggleMobileMenu(false)}>
            로그인
          </Link>
          <Link href="/signup" onClick={() => toggleMobileMenu(false)}>
            회원가입
          </Link>
        </div>
      </aside>
    </div>
  );
}