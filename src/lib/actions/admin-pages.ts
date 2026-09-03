"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";
import { CONTENT_KEYS } from "@/lib/content-keys";

export type ContentResult = { ok: boolean; message?: string };

export async function savePageContent(
  key: string,
  value: string,
): Promise<ContentResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };

  const def = CONTENT_KEYS.find((k) => k.key === key);
  if (!def) return { ok: false, message: "알 수 없는 콘텐츠 키입니다." };
  if (value.length > 5000) return { ok: false, message: "값이 너무 깁니다." };

  await prisma.pageContent.upsert({
    where: { key },
    update: { value, updatedBy: actor.email },
    create: { key, value, updatedBy: actor.email },
  });

  for (const p of def.revalidate) revalidatePath(p);
  revalidatePath("/admin/pages");
  return { ok: true };
}