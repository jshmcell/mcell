import { prisma } from "@/lib/prisma";
import { CONTENT_KEYS } from "@/lib/content-keys";
import PagesContentPanel from "@/components/admin/PagesContentPanel";

/** /admin/pages — 페이지 문구 관리 (DB 오버라이드) */
export default async function AdminPagesPage() {
  const rows = await prisma.pageContent.findMany();
  const values: Record<string, string> = {};
  for (const r of rows) values[r.key] = r.value;

  return (
    <PagesContentPanel
      defs={CONTENT_KEYS.map((k) => ({ key: k.key, label: k.label }))}
      values={values}
    />
  );
}