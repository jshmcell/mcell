"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";

const STATUSES = ["new", "in_progress", "done"] as const;

export async function setInquiryStatus(id: string, status: string) {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    return { ok: false, message: "잘못된 상태입니다." };
  }
  try {
    await prisma.inquiry.update({ where: { id }, data: { status } });
    revalidatePath("/admin/inquiries");
    return { ok: true };
  } catch (e) {
    console.error("setInquiryStatus failed:", e);
    return { ok: false, message: "처리 중 오류가 발생했습니다." };
  }
}