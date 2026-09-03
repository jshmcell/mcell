"use client";

import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/lib/store";
import { navItems, company } from "@/data/site";
import { cn } from "@/lib/cn";
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from "@/lib/constants";
import MobileChipNav from "@/components/layout/MobileChipNav";
import { signOutAction } from "@/lib/actions/signout";

export type HeaderUser = {
  name: string;
  email: string;
  image: string | null;
};

export type HeaderSettings = {
  companyName: string;
};

export default function Header({
  user,
  settings,
}: {
  user?: HeaderUser | null;
  settings?: HeaderSettings | null;
}) {
  const companyName = settings?.companyName || company.name;
  return (
    <>
      {/* PC: always navy, in normal flow, sticks to top on scroll */}
      <div className="hidden md-header:block">
        <PcHeader user={user ?? null} companyName={companyName} />
      </div>
      {/* Mobile: white bar + navy chip nav, in normal flow */}
      <div className="md-header:hidden">
        <MobileHeader companyName={companyName} />
        <MobileChipNav />
      </div>
    </>
  );
}

function PcHeader({
  user,
  companyName,
}: {
  user: HeaderUser | null;
  companyName: string;
}) {
  const searchOpen = useUiStore((s) => s.searchOpen);
  const toggleSearch = useUiStore((s) => s.toggleSearch);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="sticky top-0 z-[1000] w-full bg-navy-900/90"
      style={{ height: HEADER_HEIGHT }}
    >
      <div className="container-wide flex h-full items-center">
        <Link href="/" className="shrink-0" aria-label={companyName}>
          <SmartImage
            src={company.logoWhite}
            alt={companyName}
            width={129}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <div className="w-6 shrink-0" aria-hidden />

        <nav className="flex h-10 items-center">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.label} className="group/nav relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-10 items-center px-[15px] text-[16px] text-white transition-colors duration-300 hover:text-[#c5c5c5]",
                    isActive(item.href) && "font-bold",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="dropdown-fade absolute left-[15px] top-full z-[1000] min-w-[160px] bg-white shadow-dropdown group-hover/nav:visible group-hover/nav:opacity-100">
                    {/* invisible hover-guard below the menu, as original */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-full h-[150px]"
                    />
                    {item.children.map((child) => (
                      <li key={child.href} className="relative">
                        <Link
                          href={child.href}
                          className={cn(
                            "block h-[42.6px] px-5 py-3 text-[13px] leading-[18.6px] text-ink-soft transition-colors duration-200 hover:bg-sky-hover hover:!text-white",
                            isActive(child.href) && "bg-sky-hover text-white",
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

        <div className="ml-auto flex items-center">
          <button
            type="button"
            aria-label="site search"
            onClick={() => toggleSearch()}
            className="flex h-10 items-center justify-center px-[14px] text-white transition-colors duration-300 hover:text-[#e2e2e2]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="10.5" cy="10.5" r="7.5" />
              <path d="M16.2 16.2L21 21" />
            </svg>
          </button>
          <div className="flex items-center text-[14px] text-white">
            {user ? (
              <>
                <Link
                  href="/account"
                  className="max-w-[120px] truncate transition-colors duration-300 hover:text-[#e5e5e5]"
                  title={user.name}
                >
                  {user.name}님
                </Link>
                <span
                  className="mx-[12.5px] inline-block h-[11px] w-px bg-[#f6f6f6]/60"
                  aria-hidden
                />
                <Link
                  href="/account"
                  className="transition-colors duration-300 hover:text-[#e5e5e5]"
                >
                  마이페이지
                </Link>
                <span
                  className="mx-[12.5px] inline-block h-[11px] w-px bg-[#f6f6f6]/60"
                  aria-hidden
                />
                <form action={signOutAction}>
                  <button
                    type="submit"
                    className="transition-colors duration-300 hover:text-[#e5e5e5]"
                  >
                    로그아웃
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="transition-colors duration-300 hover:text-[#e5e5e5]"
                >
                  로그인
                </Link>
                <span
                  className="mx-[12.5px] inline-block h-[11px] w-px bg-[#f6f6f6]/60"
                  aria-hidden
                />
                <Link
                  href="/signup"
                  className="transition-colors duration-300 hover:text-[#e5e5e5]"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {searchOpen && <SearchOverlay />}
    </header>
  );
}

function MobileHeader({ companyName }: { companyName: string }) {
  const toggleMobileMenu = useUiStore((s) => s.toggleMobileMenu);
  const toggleSearch = useUiStore((s) => s.toggleSearch);
  const searchOpen = useUiStore((s) => s.searchOpen);

  return (
    <header
      className="relative z-[1000] w-full bg-white"
      style={{ height: HEADER_HEIGHT_MOBILE }}
    >
      <div className="flex h-full items-center px-4">
        <button
          type="button"
          aria-label="MENU"
          onClick={() => toggleMobileMenu(true)}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-navy-600"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>

        <Link
          href="/"
          aria-label={companyName}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <SmartImage
            src={company.logoColor}
            alt={companyName}
            width={100}
            height={37}
            priority
            className="h-[37px] w-auto"
          />
        </Link>

        <button
          type="button"
          aria-label="site search"
          onClick={() => toggleSearch()}
          className="ml-auto flex h-9 items-center justify-center px-[10px] text-[#212121] transition-colors hover:text-[#999]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </div>

      {searchOpen && <SearchOverlay />}
    </header>
  );
}

function SearchOverlay() {
  const toggleSearch = useUiStore((s) => s.toggleSearch);
  return (
    <div className="fixed inset-0 z-[1001] flex items-start justify-center bg-navy-900/95 pt-40">
      <button
        type="button"
        aria-label="검색 닫기"
        onClick={() => toggleSearch(false)}
        className="absolute right-8 top-8 text-3xl text-white"
      >
        ×
      </button>
      <form
        action="/search"
        className="flex w-full max-w-[640px] items-center border-b border-white/40 pb-3"
      >
        <input
          name="keyword"
          autoFocus
          placeholder="Search"
          className="w-full bg-transparent text-2xl text-white outline-none placeholder:text-white/50"
        />
        <button type="submit" aria-label="검색" className="text-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </form>
    </div>
  );
}
