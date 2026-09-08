import { prisma } from "@/lib/prisma";
import { CONTENT_DEFS, type ContentGroup } from "@/lib/content-registry";
import PagesEditor, {
  type ContentValues,
} from "@/components/admin/PagesEditor";

/** /admin/pages — 페이지 콘텐츠 관리 (문구/이미지/영상, 언어별, 섹션 미리보기) */
export default async function AdminPagesPage({
  searchParams,
}: {
  searchParams: Promise<{ group?: string }>;
}) {
  const { group } = await searchParams;
  const activeGroup: ContentGroup =
    group === "shop" ||
    group === "partnership" ||
    group === "mcell" ||
    group === "about" ||
    group === "footer"
      ? group
      : "home";
  const defs = CONTENT_DEFS.filter((d) => d.group === activeGroup);

  const rows = await prisma.pageContent.findMany();
  const values: ContentValues = {};
  for (const r of rows) {
    const entry = (values[r.key] ??= {});
    if (r.locale === "en") entry.en = r.value;
    else entry.ko = r.value;
  }

  return <PagesEditor group={activeGroup} defs={defs} values={values} />;
}
