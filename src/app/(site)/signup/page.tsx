"use client";

import { useState } from "react";
import AgreementBox from "@/components/auth/AgreementBox";
import Checkbox from "@/components/auth/Checkbox";
import PasswordInput from "@/components/auth/PasswordInput";
import Button from "@/components/ui/Button";
import { signupPolicyAgreement, signupPrivacyAgreement } from "@/data/auth";
import { PASSWORD_HINT } from "@/lib/auth-schemas";
import { checkEmailAvailability, signUpWithConsent } from "@/lib/actions/auth";

const inputCls =
  "h-[46px] w-full border border-black/15 px-4 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-navy-700";

export default function SignupPage() {
  // Steps live in React state only (no searchparams) — refresh/deep-link
  // always lands on the agreement step, so the gate is structurally unskippable.
  const [step, setStep] = useState<"agreement" | "form">("agreement");

  // ── Agreement step state ────────────────────────────────────────────────
  const [allAgree, setAllAgree] = useState(false);
  const [policyAgree, setPolicyAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [age14Agree, setAge14Agree] = useState(false);

  // ── Form step state ─────────────────────────────────────────────────────
  const [email, setEmail] = useState("");
  const [emailChecked, setEmailChecked] = useState<null | boolean>(null);
  const [emailChecking, setEmailChecking] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const allRequiredAgreed = policyAgree && privacyAgree && age14Agree;

  function toggleAll(checked: boolean) {
    setAllAgree(checked);
    setPolicyAgree(checked);
    setPrivacyAgree(checked);
    setAge14Agree(checked);
  }

  async function handleEmailBlur() {
    if (!email.trim()) {
      setEmailChecked(null);
      return;
    }
    setEmailChecking(true);
    const res = await checkEmailAvailability(email.trim());
    setEmailChecked(res.available === true);
    setEmailChecking(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.set("email", email.trim());
      fd.set("password", password);
      fd.set("passwordConfirm", passwordConfirm);
      fd.set("name", name.trim());
      fd.set("policyAgree", String(policyAgree));
      fd.set("privacyAgree", String(privacyAgree));
      fd.set("age14Agree", String(age14Agree));

      const res = await signUpWithConsent(null, fd);
      // Action redirects on success; a returned value means failure.
      if (res && !res.ok) {
        setSubmitError(res.message ?? "가입 처리 중 문제가 발생했습니다.");
        setFieldErrors(res.fieldErrors ?? {});
      }
    } finally {
      setSubmitting(false);
    }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const passwordValid =
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);
  const formValid =
    emailValid &&
    emailChecked !== false &&
    passwordValid &&
    password === passwordConfirm &&
    name.trim().length > 0;

  return (
    <section className="bg-[#f7f7f7] py-10 md:py-20">
      <div className="mx-auto w-full max-w-[480px] bg-white px-6 py-10 md:px-12">
        <h1 className="text-center text-[24px] font-bold text-ink">회원가입</h1>

        {step === "agreement" ? (
          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              setStep("form");
            }}
          >
            {/* check-all — 원본 "이용약관, 개인정보 수집 및 이용에 모두 동의합니다." */}
            <div className="border-b border-black/10 pb-5">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={allAgree}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
                <span
                  aria-hidden
                  className="flex h-[18px] w-[18px] shrink-0 items-center justify-center border border-black/30 bg-white text-white transition-colors peer-checked:border-navy-900 peer-checked:bg-navy-900"
                >
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3 opacity-0 peer-checked:opacity-100"
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
                <span className="text-[14px] font-medium text-ink">
                  이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                </span>
              </label>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <Checkbox
                  label="이용약관 동의"
                  requiredLabel
                  checked={policyAgree}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPolicyAgree(e.target.checked)
                  }
                />
                <AgreementBox
                  sections={signupPolicyAgreement}
                  className="mt-2"
                />
              </div>

              <div>
                <Checkbox
                  label="개인정보 수집 및 이용 동의"
                  requiredLabel
                  checked={privacyAgree}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrivacyAgree(e.target.checked)
                  }
                />
                <AgreementBox
                  sections={signupPrivacyAgreement}
                  className="mt-2"
                />
              </div>

              <Checkbox
                label="만 14세 이상입니다."
                requiredLabel
                checked={age14Agree}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAge14Agree(e.target.checked)
                }
              />
            </div>

            <div className="mt-8 flex gap-2">
              <Button
                type="button"
                variant="ghost"
                className="h-[46px] flex-1 border border-black/15 px-4 text-sm text-ink hover:bg-black/5"
                onClick={() => window.history.back()}
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={!allRequiredAgreed}
                className="h-[46px] flex-1"
              >
                가입하기
              </Button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-ink">
                  이메일
                  <em className="ml-1 inline-block h-[5px] w-[5px] rounded-full bg-[#ff4d4d] align-[2px] not-italic" />
                </span>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="이메일"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailChecked(null);
                  }}
                  onBlur={handleEmailBlur}
                />
              </label>
              {/* live 중복확인 — green ✓ "사용 가능" like the original */}
              {emailChecking ? (
                <p className="mt-1 text-[12px] text-ink/50">확인 중...</p>
              ) : emailChecked === true ? (
                <p className="mt-1 text-[12px] text-[#1a9c46]">
                  사용 가능한 이메일입니다.
                </p>
              ) : emailChecked === false ? (
                <p className="mt-1 text-[12px] text-[#ff4d4d]">
                  이미 가입된 이메일입니다.
                </p>
              ) : (
                fieldErrors.email && (
                  <p className="mt-1 text-[12px] text-[#ff4d4d]">
                    {fieldErrors.email}
                  </p>
                )
              )}
            </div>

            <div>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-ink">
                  비밀번호
                </span>
                <PasswordInput
                  className={inputCls}
                  placeholder="비밀번호"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {fieldErrors.password ? (
                <p className="mt-1 text-[12px] text-[#ff4d4d]">
                  {fieldErrors.password}
                </p>
              ) : (
                <p className="mt-1 text-[12px] text-ink/50">{PASSWORD_HINT}</p>
              )}
            </div>

            <div>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-ink">
                  비밀번호 확인
                </span>
                <PasswordInput
                  className={inputCls}
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  autoComplete="new-password"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </label>
              {passwordConfirm.length > 0 && password !== passwordConfirm && (
                <p className="mt-1 text-[12px] text-[#ff4d4d]">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            <div>
              <label className="block">
                <span className="mb-1 block text-[13px] font-medium text-ink">
                  이름
                  <em className="ml-1 inline-block h-[5px] w-[5px] rounded-full bg-[#ff4d4d] align-[2px] not-italic" />
                </span>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="이름을 입력하세요"
                  value={name}
                  autoComplete="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {fieldErrors.name && (
                <p className="mt-1 text-[12px] text-[#ff4d4d]">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {submitError && (
              <p className="rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              disabled={!formValid || submitting}
              className="h-[46px] w-full"
            >
              {submitting ? "처리 중..." : "가입하기"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
