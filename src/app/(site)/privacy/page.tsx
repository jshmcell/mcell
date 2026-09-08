import { Fragment } from "react";
import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "개인정보처리방침" : "Privacy Policy" };
}

const CONTENT = {
  ko: {
    heroTitle: "개인정보처리방침",
    sections: [
      { heading: "1. 개인정보의 처리 목적", text: "회사는 문의 대응, 서비스 제공 및 안내를 위한 목적으로 최소한의 개인정보를 처리합니다." },
      { heading: "2. 처리하는 개인정보 항목", text: "이름, 연락처, 이메일 주소 등 문의 및 서비스 이용에 필요한 정보" },
      { heading: "3. 보유 및 이용 기간", text: "개인정보는 수집·이용 목적 달성 후 지체 없이 파기하며, 관련 법령에 따라 보존이 필요한 경우 예외로 합니다." },
      { heading: "4. 문의처", text: "E-mail: contact@mcell.co.kr" },
    ],
  },
  en: {
    heroTitle: "Privacy Policy",
    sections: [
      { heading: "1. Purpose of Processing Personal Information", text: "The Company processes a minimal amount of personal information for the purposes of responding to inquiries and providing services and information." },
      { heading: "2. Personal Information Processed", text: "Information necessary for inquiries and service use, such as name, contact number and email address" },
      { heading: "3. Retention and Use Period", text: "Personal information is destroyed without delay once the purpose of collection and use is achieved, except where retention is required by applicable law." },
      { heading: "4. Contact", text: "E-mail: contact@mcell.co.kr" },
    ],
  },
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  const c = CONTENT[locale];
  return (
    <>
      <SubHero
        groupLabel="엠셀"
        title={c.heroTitle}
        currentHref="/privacy"
        locale={locale}
      />
      <section className="bg-white">
        <div className="container-site py-16">
          <div className="mx-auto max-w-[840px] space-y-4 text-[15px] leading-7 text-ink/85">
            {c.sections.map((s) => (
              <Fragment key={s.heading}>
                <h2 className="pt-4 text-[20px] font-bold text-ink first:pt-0">
                  {s.heading}
                </h2>
                <p>{s.text}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
