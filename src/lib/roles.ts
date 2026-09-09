import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/session";

export type Actor = {
  id: string;
  email: string;
  name: string;
  role: "NORMAL" | "ADMIN";
  isSuperuser: boolean;
  isAdmin: boolean;
};

/**
 * 슈퍼유저 판별: DB role이 아니라 SUPERUSER_EMAIL env와 일치하는 이메일.
 * (env = 단일 진실 소스; 슈퍼유저는 관리자 승격/강등 모두 가능)
 */
export function isSuperuserEmail(email: string | null | undefined) {
  const su = process.env.SUPERUSER_EMAIL?.trim().toLowerCase();
  return !!su && !!email && email.trim().toLowerCase() === su;
}

/** 현재 로그인 사용자의 DB row (role 포함) or null. */
export async function getCurrentUserRow() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  return user;
}

/**
 * 서버 컴포넌트/액션용 관리자 게이트 (admin = role ADMIN or 슈퍼유저).
 * react cache()로 요청당 1회만 Prisma 조회한다 (뉴스/관리 페이지가 3회씩 호출하던 것 디듀프).
 */
export const getActor = cache(async (): Promise<Actor | null> => {
  const user = await getCurrentUserRow();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isSuperuser: isSuperuserEmail(user.email),
    isAdmin: user.role === "ADMIN" || isSuperuserEmail(user.email),
  };
});
