"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

const inputCls =
  "h-[46px] w-full border border-black/15 px-4 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-navy-700";

export default function FindAccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Enumeration-safe: 응답은 항상 성공처럼 처리 (원본도 존재 여부 노출 안 함)
      await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: "/find-account/reset",
      });
    } finally {
      setSubmitting(false);
      setSent(true);
    }
  }

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-20">
      <div className="mx-auto w-full max-w-[420px] bg-white px-6 py-10 md:px-12">
        <h1 className="text-center text-[24px] font-bold text-ink">
          아이디 · 비밀번호 찾기
        </h1>

        {sent ? (
          <div className="mt-8">
            <p className="text-center text-[14px] leading-6 text-ink">
              입력하신 이메일로 비밀번호 재설정 링크를 전송했습니다.
              <br />
              메일함을 확인해 주세요.
            </p>
            <Button
              type="button"
              className="mt-6 h-[46px] w-full"
              onClick={() => {
                router.push("/login");
                router.refresh();
              }}
            >
              로그인으로 돌아가기
            </Button>
          </div>
        ) : (
          <>
            <p className="mt-4 text-center text-[13px] leading-5 text-ink/60">
              가입 시 사용한 이메일을 입력하시면
              <br />
              비밀번호 재설정 링크를 보내드립니다.
            </p>
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
              <Button
                type="submit"
                disabled={submitting}
                className="h-[46px] w-full"
              >
                {submitting ? "처리 중..." : "인증메일 발송"}
              </Button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-[13px] text-ink/60">
          계정이 없으신가요?{" "}
          <a
            href="/signup"
            className="text-navy-900 underline-offset-4 hover:underline"
          >
            회원가입
          </a>
        </p>
      </div>
    </section>
  );
}
