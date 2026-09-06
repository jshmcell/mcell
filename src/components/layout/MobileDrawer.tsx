"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/lib/store";
import { LocaleMenu, useLocale } from "@/i18n/client";
import { chromeDict } from "@/i18n/chrome";
import {
  localizeHref,
  localizedNavItems,
  stripLocalePrefix,
} from "@/i18n/config";
import { cn } from "@/lib/cn";
import { signOutAction } from "@/lib/actions/signout";
import type { HeaderUser } from "@/components/layout/Header";

export default function MobileDrawer({ user }: { user?: HeaderUser | null }) {
  const open = useUiStore((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const pathname = usePathname();
  const locale = useLocale();
  const t = chromeDict[locale];
  const navItems = localizedNavItems[locale];
  const [expanded, setExpanded] = useState<string | null>(null);
  // 현재 페이지 정확히 일치 항목만 하이라이트 (PC 헤더와 동일 규칙)
  const isActive = (href: string) => stripLocalePrefix(pathname ?? "/") === href;

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
          {user ? (
            <>
              <p className="text-[14px] text-white">
                {user.name}
                {t.header.helloSuffix}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Link
                  href={localizeHref("/account", locale)}
                  onClick={() => toggleMobileMenu(false)}
                  className="inline-block rounded-sm border border-white/20 px-3 py-1.5 text-[12px] text-white"
                >
                  {t.header.mypage}
                </Link>
                {user.isAdmin && (
                  <Link
                    href={localizeHref("/admin", locale)}
                    onClick={() => toggleMobileMenu(false)}
                    className="inline-block rounded-sm border border-white/20 bg-white/10 px-3 py-1.5 text-[12px] font-bold text-white"
                  >
                    {t.header.admin}
                  </Link>
                )}
                <form action={signOutAction}>
                  <button
                    type="submit"
                    onClick={() => toggleMobileMenu(false)}
                    className="inline-block rounded-sm border border-white/20 px-3 py-1.5 text-[12px] text-white"
                  >
                    {t.header.logout}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <p className="text-[14px] text-white">{t.header.needLogin}</p>
              <Link
                href={localizeHref("/login", locale)}
                onClick={() => toggleMobileMenu(false)}
                className="mt-2 inline-block rounded-sm border border-white/20 px-3 py-1.5 text-[12px] text-white"
              >
                {t.header.login}
              </Link>
            </>
          )}
        </div>

        <nav className="flex-1 pt-[10px]">
          <ul>
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const isOpen = expanded === item.href;
              return (
                <li key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={localizeHref(item.href, locale)}
                      onClick={() => toggleMobileMenu(false)}
                      className={cn(
                        "flex-1 px-5 py-[9px] text-[22px] text-white",
                        isActive(item.href) && "font-bold",
                      )}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        aria-label={`${item.label} ${t.header.openSubmenu}`}
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.href)}
                        className="flex h-12 w-12 items-center justify-center text-white"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={cn(
                            "transition-transform",
                            isOpen && "rotate-180",
                          )}
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
                            href={localizeHref(child.href, locale)}
                            onClick={() => toggleMobileMenu(false)}
                            className={cn(
                              "block py-2 pl-[30px] pr-[50px] text-[21px] text-white",
                              isActive(child.href) && "font-bold",
                            )}
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

        <div className="sticky bottom-0 left-0 flex w-full items-center justify-between bg-navy-900 px-5">
          <LocaleMenu />
          <button
            type="button"
            aria-label={t.header.closeMenu}
            onClick={() => toggleMobileMenu(false)}
            className="flex h-12 items-center justify-center gap-1.5 text-[16px] text-white"
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
          {t.close}
          </button>
        </div>
      </aside>
    </div>
  );
}
