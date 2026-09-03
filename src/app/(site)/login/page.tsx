"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

const inputCls =
  "h-[46px] w-full border border-black/15 px-4 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-navy-700";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 원본: 로그인상태유지 기본 체크됨
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: authError } = await authClient.signIn.email({
      email: email.trim(),
      password,
      callbackURL: "/",
      rememberMe,
    });
    setSubmitting(false);
    if (authError) {
      // Enumeration-safe: 원본과 동일하게 원인을 구분하지 않는 메시지
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-20">
      <div className="mx-auto w-full max-w-[420px] bg-white px-6 py-10 md:px-12">
        <h1 className="text-center text-[24px] font-bold text-ink">로그인</h1>

        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          <input
            type="email"
            className={inputCls}
            placeholder="이메일"
            value={email}
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            className={inputCls}
            placeholder="비밀번호"
            value={password}
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 로그인상태유지 — 원본 기본 체크 */}
          <label className="flex cursor-pointer items-center gap-2 pt-1">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span
              aria-hidden
              className="flex h-[16px] w-[16px] shrink-0 items-center justify-center border border-black/30 bg-white text-white transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-[10px] w-[10px] opacity-0 peer-checked:opacity-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M2 6.5 5 9.5 10 3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[13px] text-ink">로그인상태유지</span>
          </label>

          {error && (
            <p className="rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="h-[46px] w-full"
          >
            {submitting ? "처리 중..." : "로그인"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[13px] text-ink/60">
          계정이 없으신가요?{" "}
          <a
            href="/signup"
            className="text-navy-900 underline-offset-4 hover:underline"
          >
            회원가입
          </a>
        </p>
        <p className="mt-2 text-center text-[13px] text-ink/50">
          <a
            href="/find-account"
            className="underline-offset-4 hover:underline"
          >
            아이디 · 비밀번호 찾기
          </a>
        </p>
      </div>
    </section>
  );
}
