"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { partnership } from "@/data/partnership";
import { cn } from "@/lib/cn";

const inputCls =
  "h-[46px] w-full border border-black/15 px-4 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-navy-700";

export default function PartnershipForm() {
  const [type, setType] = useState<"OEM" | "ODM">("OEM");

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/assets/img/06285cdf4dddb.jpg)" }}
        />
        <div className="container-site relative py-20 text-center text-white">
          <Reveal>
            <p className="text-[20px] font-bold tracking-widest">{partnership.heading}</p>
            <h1 className="mt-4 text-[30px] font-bold">{partnership.title}</h1>
            <div className="mt-4 text-[15px] leading-7 text-white/85">
              {partnership.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-site py-20">
          <Reveal>
            <form className="mx-auto max-w-[840px]" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[14px] font-medium text-ink">업체명</span>
                  <input className={inputCls} placeholder="업체명을 입력해 주세요" disabled />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[14px] font-medium text-ink">
                    담당자(회사명)
                  </span>
                  <input className={inputCls} placeholder="담당자(회사명)을 입력해주세요" disabled />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[14px] font-medium text-ink">연락처</span>
                  <input className={inputCls} placeholder="연락처를 입력해 주세요" disabled />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[14px] font-medium text-ink">이메일</span>
                  <input className={inputCls} placeholder="이메일을 입력해 주세요" disabled />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[14px] font-medium text-ink">주소</span>
                  <input className={inputCls} placeholder="주소를 입력해 주세요" disabled />
                </label>

                <div className="sm:col-span-2">
                  <span className="mb-2 block text-[14px] font-medium text-ink">OEM/ODM</span>
                  <div className="flex gap-3">
                    {(["OEM", "ODM"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        className={cn(
                          "h-[46px] flex-1 border text-[14px] transition-colors",
                          type === t
                            ? "border-navy-900 bg-navy-900 text-white"
                            : "border-black/15 text-ink/70 hover:border-navy-700"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-[14px] font-medium text-ink">개발내용</span>
                  <textarea
                    rows={8}
                    className="w-full resize-none border border-black/15 p-4 text-[14px] outline-none transition-colors focus:border-navy-700"
                    disabled
                  />
                </label>
              </div>

              <div className="mt-10 text-center">
                <Button type="submit" disabled>
                  문의하기
                </Button>
                <p className="mt-3 text-[13px] text-ink/50">
                  문의 기능은 준비 중입니다. contact@mcell.co.kr 로 문의해 주세요.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}