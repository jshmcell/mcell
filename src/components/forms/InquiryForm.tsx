"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { submitInquiry } from "@/lib/actions/inquiry";

/**
 * 파트너십 문의 폼 — 원본 /44 imweb 입력폼 위젯 동일 필드·스타일.
 * 실측: PC(992+) 2열 564px / 태블릿·모바일 1열에 절반 폭(322px) 인풋 스택,
 * 인풋 50px(768+)/34px(모바일), 라벨 17px(768+)/16px(모바일) + 필수 빨간 점,
 * 그룹 하단 40px(PC)/33px(태블릿)/15px(모바일), textarea rows=3 (78px),
 * 폼 패딩 50px(모바일·PC) / 42px+상하 0·23px(태블릿), 제출 버튼 #363636 20px/10-60px.
 * 제출 → DB (inquiry) — 관리자 문의 관리에서 확인.
 */
const inputCls =
  "h-[34px] md:h-[50px] w-full rounded-[3px] border border-black/10 bg-white px-[12px] py-[6px] text-[16px] text-[#212121] outline-none transition-colors placeholder:text-[#212121]/60 focus:border-navy-900 md:py-[10px] md:text-[15px]";

function Required() {
  return (
    <i
      aria-hidden
      className="ml-[5px] inline-block h-[5px] w-[5px] rounded-full bg-[#ff4d4d] align-[2px]"
    />
  );
}

export default function InquiryForm() {
  const [type, setType] = useState<"OEM" | "ODM">("OEM");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    const res = await submitInquiry({
      company: fd.get("company"),
      manager: fd.get("manager"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      address: fd.get("address") || undefined,
      oemType: type,
      content: fd.get("content") || undefined,
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.message ?? "접수 중 문제가 발생했습니다.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-[768px] px-[50px] py-[80px] text-center md-header:max-w-[1250px]">
        <p className="text-[18px] leading-7 text-ink">
          문의가 정상적으로 접수되었습니다.
          <br />
          담당자가 확인 후 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mx-auto max-w-[768px] px-[50px] py-[50px] text-left md:px-[42px] md:pt-0 md:pb-[23px] md-header:max-w-[1250px] md-header:px-[50px] md-header:py-[50px]"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-x-[14px] md-header:grid-cols-2 md-header:gap-x-[12px]">
        <div className="mb-[15px] md:mb-[28px] md:w-[calc(50%-7px)] md-header:mb-[40px] md-header:w-auto">
          <label className="block">
            <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
              업체명
              <Required />
            </span>
            <input
              name="company"
              className={inputCls}
              placeholder="업체명을 입력해 주세요"
              required
            />
          </label>
        </div>
        <div className="mb-[15px] md:mb-[28px] md:w-[calc(50%-7px)] md-header:mb-[40px] md-header:w-auto">
          <label className="block">
            <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
              담당자(회사명)
              <Required />
            </span>
            <input
              name="manager"
              className={inputCls}
              placeholder="담당자(회사명)을 입력해주세요"
              required
            />
          </label>
        </div>
        <div className="mb-[15px] md:mb-[28px] md:w-[calc(50%-7px)] md-header:mb-[40px] md-header:w-auto">
          <label className="block">
            <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
              연락처
              <Required />
            </span>
            <input
              name="phone"
              type="tel"
              className={inputCls}
              placeholder="연락처를 입력해 주세요"
              required
            />
          </label>
        </div>
        <div className="mb-[15px] md:mb-[28px] md:w-[calc(50%-7px)] md-header:mb-[40px] md-header:w-auto">
          <label className="block">
            <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
              이메일
              <Required />
            </span>
            <input
              name="email"
              type="email"
              className={inputCls}
              placeholder="이메일을 입력해 주세요"
              required
            />
          </label>
        </div>
        <div className="mb-[15px] md:mb-[28px] md:w-[calc(50%-7px)] md-header:mb-[40px] md-header:w-auto">
          <label className="block">
            <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
              주소
            </span>
            <input name="address" className={inputCls} placeholder="주소를 입력해 주세요" />
          </label>
        </div>

        <div className="mb-[15px] md:mb-[61px] md:w-[calc(50%-7px)] md-header:mb-[40px] md-header:w-auto">
          <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
            OEM/ODM
          </span>
          <div className="flex flex-col gap-[8px] md:h-auto md:flex-row md:justify-start">
            {(["OEM", "ODM"] as const).map((t) => (
              <label
                key={t}
                className="flex h-[34px] cursor-pointer items-center md:mr-[12px] md:h-[30px] md:w-[112px]"
              >
                <input
                  type="radio"
                  name="oem-odm"
                  checked={type === t}
                  onChange={() => setType(t)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full border transition-colors md:h-[14px] md:w-[14px]",
                    type === t
                      ? "border-[#363636] bg-white"
                      : "border-[#c8c8c8] bg-white",
                  )}
                >
                  {type === t && (
                    <span className="h-[7px] w-[7px] rounded-full bg-[#363636]" />
                  )}
                </span>
                <span className="pl-[21px] text-[16px] text-ink md:text-[17px]">
                  {t}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-[15px] md-header:col-span-2 md:mb-[33px] md-header:mb-[40px]">
          <label className="block">
            <span className="mb-[5px] block text-[16px] leading-[26px] font-normal text-ink md:text-[17px] md:leading-[20px] md-header:leading-[27px]">
              개발내용
            </span>
            <textarea
              name="content"
              rows={3}
              className="min-h-[82px] w-full resize-y rounded-[3px] border border-black/10 bg-white px-[12px] py-[6px] text-[16px] text-[#212121] outline-none transition-colors focus:border-navy-900 md:min-h-[78px] md:text-[15px]"
            />
          </label>
        </div>
      </div>

      {error && (
        <p className="mb-4 text-center text-[13px] text-[#ff4d4d]">{error}</p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-block h-[51px] rounded-[2px] bg-[#363636] px-[60px] py-[10px] text-[20px] leading-[28px] font-normal text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "접수 중..." : "문의하기"}
        </button>
      </div>
    </form>
  );
}