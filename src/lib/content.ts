import { prisma } from "@/lib/prisma";

/**
 * 페이지 콘텐츠 오버라이드 조회 — key → value.
 * 값이 없는 키는 결과에 포함되지 않으므로 호출부가
 * `overrides[key] || dataFile기본값` 패턴으로 사용한다.
 */
export async function getPageContents(
  keys: string[],
): Promise<Record<string, string>> {
  if (keys.length === 0) return {};
  const rows = await prisma.pageContent.findMany({
    where: { key: { in: keys } },
  });
  const out: Record<string, string> = {};
  for (const r of rows) out[r.key] = r.value;
  return out;
}