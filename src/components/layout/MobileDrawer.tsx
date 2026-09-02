"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUiStore } from "@/lib/store";
import { navItems } from "@/data/site";
import { cn } from "@/lib/cn";

export default function MobileDrawer() {
  const open = useUiStore((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleMobileMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleMobileMenu]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1001] md-header:hidden">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => toggleMobileMenu(false)}
        aria-hidden
      />
      <aside className="absolute left-0 top-0 flex h-full w-[300px] flex-col overflow-y-auto bg-navy-900">
        <div className="border-b border-white/20 px-5 py-5">
          <p className="text-[14px] text-white">로그인이 필요합니다.</p>
          <Link
            href="/login"
            onClick={() => toggleMobileMenu(false)}
            className="mt-2 inline-block rounded-sm border border-white/20 px-3 py-1.5 text-[12px] text-white"
          >
            로그인
          </Link>
        </div>

        <nav className="flex-1 pt-[10px]">
          <ul>
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const isOpen = expanded === item.label;
              return (
                <li key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => toggleMobileMenu(false)}
                      className="flex-1 px-5 py-[9px] text-[22px] text-white"
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`${item.label} 하위메뉴 열기`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="flex h-12 w-12 items-center justify-center text-white"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={cn("transition-transform", isOpen && "rotate-180")}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {hasChildren && isOpen && (
                    <ul className="mb-[14px]">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => toggleMobileMenu(false)}
                            className="block py-2 pl-[30px] pr-[50px] text-[21px] text-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => toggleMobileMenu(false)}
          className="sticky bottom-0 left-0 flex h-12 w-full items-center justify-center gap-1.5 bg-navy-900 text-[16px] text-white"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          닫기
        </button>
      </aside>
    </div>
  );
}