import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "회원가입",
};

const inputCls =
  "h-[46px] w-full border border-black/15 px-4 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-navy-700";

export default function SignupPage() {
  return (
    <section className="bg-[#f7f7f7] py-28">
      <div className="mx-auto w-full max-w-[420px] bg-white p-10">
        <h1 className="text-center text-[24px] font-bold text-ink">회원가입</h1>
        <form className="mt-8 space-y-3">
          <input className={inputCls} placeholder="아이디" disabled />
          <input
            className={inputCls}
            type="password"
            placeholder="비밀번호"
            disabled
          />
          <input
            className={inputCls}
            type="password"
            placeholder="비밀번호 확인"
            disabled
          />
          <input className={inputCls} placeholder="이름" disabled />
          <input className={inputCls} placeholder="이메일" disabled />
          <Button type="submit" disabled className="w-full">
            회원가입
          </Button>
        </form>
        <p className="mt-6 text-center text-[13px] text-ink/60">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="text-navy-900 underline-offset-4 hover:underline"
          >
            로그인
          </Link>
        </p>
        <p className="mt-2 text-center text-[13px] text-ink/50">
          회원 기능은 준비 중입니다.
        </p>
      </div>
    </section>
  );
}
