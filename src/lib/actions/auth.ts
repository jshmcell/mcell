"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { checkEmailSchema, signupSchema } from "@/lib/auth-schemas";
import { AGREEMENT_VERSIONS } from "@/data/auth";

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !out[key]) {
      out[key] = issue.message;
    }
  }
  return out;
}

/**
 * Live 중복확인 for the signup form (green ✓ / red ✗ like the original).
 * Note: intentionally reveals account existence for UX parity with the original site.
 */
export async function checkEmailAvailability(
  email: string,
): Promise<ActionState & { available?: boolean }> {
  const parsed = checkEmailSchema.safeParse({ email });
  if (!parsed.success) {
    return { ok: false, message: zodFieldErrors(parsed.error).email };
  }
  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });
  return { ok: true, available: !existing };
}

/**
 * Signup: consent-gated (server-enforced — cannot be skipped from the client),
 * then delegates to Better Auth signUpEmail (auto sign-in via nextCookies).
 */
export async function signUpWithConsent(
  _prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    name: formData.get("name"),
    consent: {
      policyAgree: formData.get("policyAgree") === "true",
      privacyAgree: formData.get("privacyAgree") === "true",
      age14Agree: formData.get("age14Agree") === "true",
    },
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "입력값을 확인해 주세요.",
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }
  const input = parsed.data;

  try {
    const emailExists = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });
    if (emailExists) {
      return {
        ok: false,
        fieldErrors: { email: "이미 가입된 이메일입니다." },
      };
    }

    await auth.api.signUpEmail({
      body: {
        email: input.email,
        password: input.password,
        name: input.name,
      },
      headers: await headers(),
    });

    const user = await prisma.user.findUnique({
      where: { email: input.email },
      select: { id: true },
    });
    if (!user) {
      return {
        ok: false,
        message:
          "가입 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    const requestHeaders = await headers();
    const ip =
      requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    await prisma.userConsent.createMany({
      data: (
        [
          ["policy", AGREEMENT_VERSIONS.policy],
          ["privacy", AGREEMENT_VERSIONS.privacy],
          ["age14", AGREEMENT_VERSIONS.age14],
        ] as const
      ).map(([type, version]) => ({
        userId: user.id,
        type,
        version,
        ip,
      })),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return { ok: false, message: error.message };
    }
    return {
      ok: false,
      message: "가입 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  redirect("/");
}
