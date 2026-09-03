"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";
import { PASSWORD_HINT } from "@/lib/auth-schemas";

const inputCls =
  "h-[46px] w-full border border-black/15 px-4 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-navy-700";

export default function ResetPasswordPage() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const passwordValid =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const formValid = !!token && passwordValid && password === passwordConfirm;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: authError } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    setSubmitting(false);
    if (authError) {
      setError(
        authError.status === 400
          ? "링크가 만료되었거나 올바르지 않습니다. 처음부터 다시 시도해 주세요."
          : "처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
      return;
    }
    setDone(true);
  }

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-20">
      <div className="mx-auto w-full max-w-[420px] bg-white px-6 py-10 md:px-12">
        <h1 className="text-center text-[24px] font-bold text-ink">
          비밀번호 재설정
        </h1>

        {done ? (
          <div className="mt-8">
            <p className="text-center text-[14px] leading-6 text-ink">
              비밀번호가 재설정되었습니다.
              <br />새 비밀번호로 로그인해 주세요.
            </p>
            <Button
              type="button"
              className="mt-6 h-[46px] w-full"
              onClick={() => {
                router.push("/login");
                router.refresh();
              }}
            >
              로그인하러 가기
            </Button>
          </div>
        ) : !token ? (
          <p className="mt-8 text-center text-[14px] leading-6 text-ink">
            올바르지 않은 접근입니다.
            <br />
            <a
              href="/find-account"
              className="text-navy-900 underline-offset-4 hover:underline"
            >
              비밀번호 찾기
            </a>
            에서 다시 시도해 주세요.
          </p>
        ) : (
          <>
            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
              <div>
                <PasswordInput
                  className={inputCls}
                  placeholder="새 비밀번호"
                  value={password}
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="mt-1 text-[12px] text-ink/50">{PASSWORD_HINT}</p>
              </div>
              <div>
                <PasswordInput
                  className={inputCls}
                  placeholder="새 비밀번호 확인"
                  value={passwordConfirm}
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                {passwordConfirm.length > 0 && password !== passwordConfirm && (
                  <p className="mt-1 text-[12px] text-[#ff4d4d]">
                    비밀번호가 일치하지 않습니다.
                  </p>
                )}
              </div>

              {error && (
                <p className="rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={!formValid || submitting}
                className="h-[46px] w-full"
              >
                {submitting ? "처리 중..." : "비밀번호 변경"}
              </Button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
