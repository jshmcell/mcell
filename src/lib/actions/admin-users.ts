"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";

export type ActionResult = { ok: boolean; message?: string };

/**
 * 권한 변경 규칙 (요구사항):
 * - 관리자: NORMAL → ADMIN 승격만 가능 (강등 불가)
 * - 슈퍼유저: 승격/강등 모두 가능, 단 자기 자신은 강등 불가 (계정 잠금 방지)
 */
export async function setUserRole(
  targetEmail: string,
  role: "NORMAL" | "ADMIN",
): Promise<ActionResult> {
  const suEmail = process.env.SUPERUSER_EMAIL?.trim().toLowerCase();
  const target = targetEmail.trim().toLowerCase();

  const actor = await getActor();
  if (!actor) return { ok: false, message: "로그인이 필요합니다." };
  if (!actor.isAdmin) return { ok: false, message: "권한이 없습니다." };

  if (target === suEmail) {
    return { ok: false, message: "슈퍼관리자 계정은 변경할 수 없습니다." };
  }

  const targetUser = await prisma.user.findUnique({ where: { email: target } });
  if (!targetUser) return { ok: false, message: "사용자를 찾을 수 없습니다." };

  // 승격
  if (role === "ADMIN") {
    await prisma.user.update({
      where: { email: target },
      data: { role: "ADMIN" },
    });
    revalidatePath("/admin/users");
    return { ok: true };
  }

  // 강등: 슈퍼유저만 가능
  if (!actor.isSuperuser) {
    return { ok: false, message: "강등은 슈퍼관리자만 가능합니다." };
  }
  if (actor.email === target) {
    return { ok: false, message: "자기 자신은 강등할 수 없습니다." };
  }
  await prisma.user.update({
    where: { email: target },
    data: { role: "NORMAL" },
  });
  revalidatePath("/admin/users");
  return { ok: true };
}