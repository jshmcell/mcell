import { prisma } from "@/lib/prisma";
import InquiriesStatusControls from "@/components/admin/InquiriesStatusControls";

const statusLabels: Record<string, string> = {
  new: "미처리",
  in_progress: "처리중",
  done: "완료",
};

/** /admin/inquiries — 접수된 모든 폼 데이터 */
export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const where =
    status && ["new", "in_progress", "done"].includes(status)
      ? { status }
      : undefined;

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <div className="flex gap-2">
        {[
          { key: "", label: "전체" },
          { key: "new", label: "미처리" },
          { key: "in_progress", label: "처리중" },
          { key: "done", label: "완료" },
        ].map((f) => (
          <a
            key={f.key}
            href={f.key ? `/admin/inquiries?status=${f.key}` : "/admin/inquiries"}
            className={
              (status ?? "") === f.key
                ? "rounded-[3px] bg-navy-900 px-4 py-2 text-[13px] text-white"
                : "rounded-[3px] border border-black/10 bg-white px-4 py-2 text-[13px] text-ink hover:border-navy-700"
            }
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {inquiries.map((q) => (
          <div key={q.id} className="rounded-[4px] border border-black/10 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-[3px] bg-navy-900/10 px-2 py-0.5 text-[12px] text-navy-900">
                  {q.type}
                </span>
                <span
                  className={
                    q.status === "new"
                      ? "rounded-[3px] bg-[#ff4d4d]/10 px-2 py-0.5 text-[12px] text-[#ff4d4d]"
                      : q.status === "in_progress"
                        ? "rounded-[3px] bg-[#d97706]/10 px-2 py-0.5 text-[12px] text-[#d97706]"
                        : "rounded-[3px] bg-[#1a9c46]/10 px-2 py-0.5 text-[12px] text-[#1a9c46]"
                  }
                >
                  {statusLabels[q.status] ?? q.status}
                </span>
              </div>
              <span className="text-[12px] text-ink/50">
                {q.createdAt.toISOString().slice(0, 16).replace("T", " ")}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 text-[13px] sm:grid-cols-2">
              <p><span className="text-ink/50">업체명: </span>{q.company ?? "—"}</p>
              <p><span className="text-ink/50">담당자: </span>{q.manager ?? "—"}</p>
              <p><span className="text-ink/50">연락처: </span>{q.phone ?? "—"}</p>
              <p><span className="text-ink/50">이메일: </span>{q.email ?? "—"}</p>
              <p className="sm:col-span-2"><span className="text-ink/50">주소: </span>{q.address ?? "—"}</p>
              <p><span className="text-ink/50">OEM/ODM: </span>{q.oemType ?? "—"}</p>
            </div>
            {q.content && (
              <p className="mt-3 whitespace-pre-wrap rounded-[3px] bg-black/[0.02] p-3 text-[13px] leading-6 text-ink">
                {q.content}
              </p>
            )}

            <div className="mt-4">
              <InquiriesStatusControls id={q.id} status={q.status} />
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <p className="rounded-[4px] border border-black/10 bg-white p-8 text-center text-[14px] text-ink/50">
            문의 내역이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}