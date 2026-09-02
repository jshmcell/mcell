"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/lib/store";
import { navItems, company } from "@/data/site";
import { cn } from "@/lib/cn";
import { HEADER_HEIGHT } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const searchOpen = useUiStore((s) => s.searchOpen);
  const toggleSearch = useUiStore((s) => s.toggleSearch);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-navy-900/90" : "bg-transparent"
      )}
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="container-site flex h-full items-center justify-between">
        <Link href="/" className="relative shrink-0" aria-label={company.name}>
          <Image
            src={company.logoWhite}
            alt={company.name}
            width={161}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center lg:flex">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-[40px] items-center px-[15px] text-[16px] text-white transition-colors duration-300 hover:text-[#c5c5c5]",
                    isActive(item.href) && "font-bold"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && openDropdown === item.label && (
                  <ul
                    className="absolute left-[15px] top-full z-50 min-w-[160px] bg-white py-1 shadow-dropdown"
                    style={{ marginTop: 0 }}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block px-5 py-3 text-[13px] text-ink-soft transition-colors duration-200 hover:bg-sky-hover hover:!text-white",
                            isActive(child.href) && "bg-sky-hover text-white"
                          )}
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

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="site search"
            onClick={() => toggleSearch()}
            className="flex h-[34px] w-[34px] items-center justify-center bg-accent text-white transition-colors hover:opacity-90"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          <div className="hidden items-center gap-2 text-[14px] text-white lg:flex">
            <Link href="/login" className="transition-colors hover:text-[#e5e5e5]">
              로그인
            </Link>
            <span className="inline-block h-[11px] w-px bg-white/20" />
            <Link href="/signup" className="transition-colors hover:text-[#e5e5e5]">
              회원가입
            </Link>
          </div>
          <button
            type="button"
            aria-label="MENU"
            onClick={() => toggleMobileMenu(true)}
            className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && <SearchOverlay />}
    </header>
  );
}

function SearchOverlay() {
  const toggleSearch = useUiStore((s) => s.toggleSearch);
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy-900/95 pt-40">
      <button
        type="button"
        aria-label="검색 닫기"
        onClick={() => toggleSearch(false)}
        className="absolute right-8 top-8 text-3xl text-white"
      >
        ×
      </button>
      <form action="/search" className="flex w-full max-w-[640px] items-center border-b border-white/40 pb-3">
        <input
          name="keyword"
          autoFocus
          placeholder="Search"
          className="w-full bg-transparent text-2xl text-white outline-none placeholder:text-white/50"
        />
        <button type="submit" aria-label="검색" className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </form>
    </div>
  );
}