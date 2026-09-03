import Link from "next/link";
import { prisma } from "@/lib/prisma";

const cardCls =
  "rounded-[4px] border border-black/10 bg-white p-5";
const numCls = "mt-1 text-[26px] font-bold text-navy-900";

/** /admin — 통계 현황 */
export default async function AdminHomePage() {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [users, admins, newUsersThisMonth, inquiries, newInquiries, posts, unpublished] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.boardPost.count(),
      prisma.boardPost.count({ where: { published: false } }),
    ]);

  const stats = [
    { label: "총 회원", value: users, sub: `이번 달 신규 ${newUsersThisMonth}` },
    { label: "관리자", value: admins, sub: "일반회원 외 권한" },
    { label: "문의", value: inquiries, sub: `미처리 ${newInquiries}` },
    { label: "게시물", value: posts, sub: `숨김 ${unpublished}` },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={cardCls}>
            <p className="text-[13px] text-ink/60">{s.label}</p>
            <p className={numCls}>{s.value}</p>
            <p className="mt-1 text-[12px] text-ink/50">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">바로가기</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            <li>
              <Link href="/admin/users" className="text-navy-900 hover:underline">
                회원 관리
              </Link>
              <span className="text-ink/50"> — 권한 변경 (NORMAL ↔ ADMIN)</span>
            </li>
            <li>
              <Link href="/admin/inquiries" className="text-navy-900 hover:underline">
                문의 관리
              </Link>
              <span className="text-ink/50"> — 접수된 모든 폼 데이터</span>
            </li>
            <li>
              <Link href="/admin/boards" className="text-navy-900 hover:underline">
                게시판 관리
              </Link>
              <span className="text-ink/50"> — 공지/소식/카달로그/포트폴리오 CRUD</span>
            </li>
            <li>
              <Link href="/admin/pages" className="text-navy-900 hover:underline">
                페이지 콘텐츠
              </Link>
              <span className="text-ink/50"> — 홈/회사 소개 등 문구 관리</span>
            </li>
          </ul>
        </div>
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">안내</h2>
          <p className="mt-3 text-[13px] leading-6 text-ink/70">
            슈퍼관리자는 SUPERUSER_EMAIL 로 지정되며 관리자 임명/해제가 모두 가능합니다.
            <br />
            일반 관리자는 임명만 가능합니다 (강등 불가).
            <br />
            게시물 CRUD와 문의 상태 변경은 각 관리 페이지에서 수행합니다.
          </p>
        </div>
      </div>
    </div>
  );
}