"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";
import {
  CONTENT_DEF_MAP,
  MAX_LENGTH,
  isAllowedMediaUrl,
} from "@/lib/content-registry";

export type ContentResult = { ok: boolean; message?: string };

/**
 * 페이지 콘텐츠 저장 — text/textarea/image/video는 언어별(ko/en) 저장,
 * url(링크)은 언어 공통이므로 양쪽 locale에 동일 값으로 저장한다.
 */
export async function savePageContent(
  key: string,
  locale: "ko" | "en",
  value: string,
): Promise<ContentResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };

  const def = CONTENT_DEF_MAP[key];
  if (!def) return { ok: false, message: "알 수 없는 콘텐츠 키입니다." };
  if (locale !== "ko" && locale !== "en") {
    return { ok: false, message: "알 수 없는 언어입니다." };
  }

  const v = value.trim();
  if (v.length > MAX_LENGTH[def.kind]) {
    return { ok: false, message: "값이 너무 깁니다." };
  }
  if (v && (def.kind === "image" || def.kind === "video" || def.kind === "url")) {
    if (!isAllowedMediaUrl(v)) {
      return { ok: false, message: "URL 형식이 올바르지 않습니다." };
    }
  }

  // 빈 값 = 오버라이드 삭제 (기본값으로 복귀)
  const locales =
    def.kind === "url" || def.kind === "historyList" || def.kind === "officeList"
      ? (["ko", "en"] as const)
      : ([locale] as const);
  if (!v) {
    await prisma.pageContent.deleteMany({
      where: { key, locale: { in: [...locales] } },
    });
  } else {
    for (const loc of locales) {
      await prisma.pageContent.upsert({
        where: { key_locale: { key, locale: loc } },
        update: { value: v, updatedBy: actor.email },
        create: { key, locale: loc, value: v, updatedBy: actor.email },
      });
    }
  }

  for (const p of def.revalidate) revalidatePath(p);
  // 재작성(rewrite) 기반 /en 경로까지 확실히 무효화 — 루트 레이아웃 전체 재검증
  revalidatePath("/", "layout");
  revalidatePath("/admin/pages");
  revalidatePath("/en/admin/pages");
  return { ok: true };
}
