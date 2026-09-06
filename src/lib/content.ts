import { prisma } from "@/lib/prisma";

export { pickLines, pickText, type ContentRows } from "@/lib/content-resolve";

/** key → per-locale DB values (only keys that have overrides appear). */
export type DbContentRows = Record<string, { ko?: string; en?: string }>;

/**
 * 콘텐츠 오버라이드 조회 — 요청한 키들의 ko/en 값을 묶어서 반환.
 * 호출부는 pickText/pickLines 로 `en → ko → 데이터 파일 기본값` 폴백을 적용한다.
 */
export async function getContentRows(
  keys: string[],
): Promise<Record<string, { ko?: string; en?: string }>> {
  if (keys.length === 0) return {};
  const rows = await prisma.pageContent.findMany({
    where: { key: { in: keys } },
  });
  const out: Record<string, { ko?: string; en?: string }> = {};
  for (const r of rows) {
    const entry = (out[r.key] ??= {});
    if (r.locale === "en") entry.en = r.value;
    else entry.ko = r.value;
  }
  return out;
}
