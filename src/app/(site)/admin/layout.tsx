import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getActor } from "@/lib/roles";

export const metadata: Metadata = {
  title: "관리자 대시보드",
  robots: { index: false },
};

const tabs = [
  { href: "/admin", label: "현황", exact: true },
  { href: "/admin/users", label: "회원 관리" },
  { href: "/admin/inquiries", label: "문의 관리" },
  { href: "/admin/boards", label: "게시판 관리" },
  { href: "/admin/pages", label: "페이지 콘텐츠" },
  { href: "/admin/settings", label: "사이트 설정" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actor = await getActor();
  if (!actor) redirect("/login");
  if (!actor.isAdmin) redirect("/account");

  const label = actor.isSuperuser ? "슈퍼관리자" : "관리자";

  return (
    <div className="min-h-[calc(100vh-108px)] bg-[#f7f7f7]">
      <div className="container-site py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold text-ink">관리자 대시보드</h1>
            <p className="mt-1 text-[13px] text-ink/60">
              {actor.name} ({label}) · {actor.email}
            </p>
          </div>
          <Link
            href="/account"
            className="text-[13px] text-ink/60 underline-offset-4 hover:underline"
          >
            마이페이지로 돌아가기
          </Link>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2 border-b border-black/10 pb-3">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-[3px] border border-black/10 bg-white px-4 py-2 text-[13px] text-ink transition-colors hover:border-navy-700 hover:text-navy-900"
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}