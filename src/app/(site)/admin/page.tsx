import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getLocale } from "@/i18n/server";
import { adminDict } from "@/i18n/admin";
import { localizeHref } from "@/i18n/config";

const cardCls =
  "rounded-[4px] border border-black/10 bg-white p-5";
const numCls = "mt-1 text-[26px] font-bold text-navy-900";

/** /admin — 통계 현황 */
export default async function AdminHomePage() {
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const [users, admins, newUsersThisMonth, inquiries, newInquiries, posts, unpublished, locale] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.boardPost.count(),
      prisma.boardPost.count({ where: { published: false } }),
      getLocale(),
    ]);
  const t = adminDict[locale].dashboard;

  const stats = [
    { label: t.totalUsers, value: users, sub: t.newThisMonth(newUsersThisMonth) },
    { label: t.admins, value: admins, sub: t.adminsSub },
    { label: t.inquiries, value: inquiries, sub: t.unprocessed(newInquiries) },
    { label: t.posts, value: posts, sub: t.hidden(unpublished) },
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
          <h2 className="text-[15px] font-bold text-ink">{t.quickLinks}</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {t.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={localizeHref(l.href, locale)}
                  className="text-navy-900 hover:underline"
                >
                  {l.label}
                </Link>
                <span className="text-ink/50"> — {l.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={cardCls}>
          <h2 className="text-[15px] font-bold text-ink">{t.notice}</h2>
          <div className="mt-3 text-[13px] leading-6 text-ink/70">
            {t.noticeLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
