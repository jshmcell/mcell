import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/lib/session";

export type Role = "NORMAL" | "ADMIN";

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

/** 서버 컴포넌트/액션용 관리자 게이트 (admin = role ADMIN or 슈퍼유저). */
export async function getActor() {
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
}

export class ForbiddenError extends Error {
  constructor(message = "권한이 없습니다.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireAdmin() {
  const actor = await getActor();
  if (!actor) throw new ForbiddenError();
  if (!actor.isAdmin) throw new ForbiddenError();
  return actor;
}

export async function requireSuperuser() {
  const actor = await getActor();
  if (!actor) throw new ForbiddenError();
  if (!actor.isSuperuser) throw new ForbiddenError();
  return actor;
}

/** 페이지용: 관리자가 아니면 홈으로 (throw 대신 redirect는 호출부에서) */
export async function getAdminOrNull() {
  const actor = await getActor();
  return actor?.isSuperuser ? actor : null;
}