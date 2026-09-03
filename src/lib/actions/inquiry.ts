"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/session";

const inquirySchema = z.object({
  company: z.string().trim().min(1, "업체명을 입력해 주세요.").max(200),
  manager: z.string().trim().min(1, "담당자를 입력해 주세요.").max(100),
  phone: z.string().trim().min(1, "연락처를 입력해 주세요.").max(50),
  email: z
    .string()
    .trim()
    .email("올바른 이메일 형식이 아닙니다.")
    .max(254),
  address: z.string().trim().max(500).optional(),
  oemType: z.enum(["OEM", "ODM"]),
  content: z.string().trim().max(5000).optional(),
});

export type InquiryResult = { ok: boolean; message?: string };

/** 제휴/문의 접수 (비로그인 허용, 로그인 시 userId 연결) */
export async function submitInquiry(
  input: unknown,
): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값을 확인해 주세요." };
  }

  const session = await getServerSession();
  let userId: string | null = null;
  if (session?.user?.email) {
    const u = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    userId = u?.id ?? null;
  }

  const requestHeaders = await headers();
  void requestHeaders; // 향후 레이트리밋용

  await prisma.inquiry.create({
    data: {
      type: "partnership",
      company: parsed.data.company,
      manager: parsed.data.manager,
      phone: parsed.data.phone,
      email: parsed.data.email,
      address: parsed.data.address || null,
      oemType: parsed.data.oemType,
      content: parsed.data.content || null,
      userId,
    },
  });

  return { ok: true };
}