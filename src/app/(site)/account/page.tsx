import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubHero from "@/components/subpage/SubHero";
import Button, { ButtonLink } from "@/components/ui/Button";
import { getActor } from "@/lib/roles";
import { prisma } from "@/lib/prisma";
import { signOutAction } from "@/lib/actions/signout";

export const metadata: Metadata = {
  title: "마이페이지",
};

const itemCls =
  "flex min-h-[50px] items-center justify-between border-b border-black/10 py-3 text-[14px]";

const itemLabelCls = "shrink-0 text-ink/60";

export default async function AccountPage() {
  const actor = await getActor();
  if (!actor) redirect("/login");

  // 내 문의 접수 이력 (파트너십 등)
  const myInquiries = await prisma.inquiry.findMany({
    where: { userId: actor.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <>
      <SubHero groupLabel="엠셀" title="마이페이지" currentHref="/account" />
      <section className="bg-white">
        <div className="container-site py-10 md:py-16">
          <div className="mx-auto max-w-[720px]">
            {/* 프로필 카드 */}
            <div className="flex items-center gap-5">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f0f0f0] text-[24px] font-bold text-navy-900">
                {actor.name.charAt(0) || "?"}
              </div>
              <div>
                <p className="text-[20px] font-bold text-ink">
                  {actor.name}님, 안녕하세요.
                </p>
                <p className="mt-1 text-[14px] text-ink/60">{actor.email}</p>
                <p className="mt-1 inline-block rounded-[3px] bg-navy-900/10 px-2 py-0.5 text-[12px] text-navy-900">
                  {actor.isSuperuser ? "슈퍼관리자" : actor.role === "ADMIN" ? "관리자" : "일반회원"}
                </p>
              </div>
            </div>

            {/* 대시보드 진입 (관리자만) */}
            {actor.isAdmin && (
              <div className="mt-8">
                <ButtonLink href="/admin" className="h-[46px] px-8">
                  관리자 대시보드
                </ButtonLink>
              </div>
            )}

            {/* 프로필 정보 */}
            <div className="mt-10">
              <h2 className="mb-3 text-[16px] font-bold text-ink">내 정보</h2>
              <div>
                <div className={itemCls}>
                  <span className={itemLabelCls}>이름</span>
                  <span>{actor.name}</span>
                </div>
                <div className={itemCls}>
                  <span className={itemLabelCls}>이메일</span>
                  <span>{actor.email}</span>
                </div>
                <div className={itemCls}>
                  <span className={itemLabelCls}>권한</span>
                  <span>
                    {actor.isSuperuser ? "슈퍼관리자" : actor.role === "ADMIN" ? "관리자" : "일반회원"}
                  </span>
                </div>
              </div>
            </div>

            {/* 내 문의 내역 */}
            <div className="mt-10">
              <h2 className="mb-3 text-[16px] font-bold text-ink">내 문의 내역</h2>
              {myInquiries.length === 0 ? (
                <p className="text-[14px] text-ink/50">문의 내역이 없습니다.</p>
              ) : (
                <ul className="divide-y divide-black/10">
                  {myInquiries.map((q) => (
                    <li key={q.id} className="flex items-center justify-between py-3 text-[14px]">
                      <span className="truncate text-ink">
                        [{q.type}] {q.company || q.manager || q.email || q.id}
                      </span>
                      <span className="shrink-0 text-[12px] text-ink/50">
                        {q.createdAt.toISOString().slice(0, 10)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 계정 관리 */}
            <div className="mt-10 flex gap-2">
              <form action={signOutAction}>
                <Button type="submit" variant="ghost" className="h-[46px] border border-black/15 px-6 text-sm text-ink hover:bg-black/5">
                  로그아웃
                </Button>
              </form>
              <Link
                href="/find-account"
                className="flex h-[46px] items-center px-6 text-sm text-ink/60 underline-offset-4 hover:underline"
              >
                비밀번호 변경은 로그아웃 후 찾기 이용
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}