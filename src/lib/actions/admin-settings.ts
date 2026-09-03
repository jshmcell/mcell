"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";
import { SITE_SETTING_DEF_MAP } from "@/lib/site-settings";

export type SettingsResult = { ok: boolean; message?: string };

export async function saveSiteSetting(
  key: string,
  value: string,
): Promise<SettingsResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };

  const def = SITE_SETTING_DEF_MAP[key];
  if (!def) return { ok: false, message: "알 수 없는 설정 키입니다." };
  if (value.length > 5000) return { ok: false, message: "값이 너무 깁니다." };

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value, updatedBy: actor.email },
    create: {
      key,
      group: def.group,
      label: def.label,
      kind: def.kind,
      value,
      updatedBy: actor.email,
    },
  });

  // 회사/연락처/소셜은 모든 페이지의 헤더·푸터에 렌더링되므로 전역 재검증.
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { ok: true };
}
