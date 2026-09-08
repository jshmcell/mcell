import { Fragment } from "react";
import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import { getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "이용약관" : "Terms of Service" };
}

const CONTENT = {
  ko: {
    heroTitle: "이용약관",
    sections: [
      { heading: "제 1 조 (목적)", text: "본 약관은 엠셀(이하 \"회사\")이 운영하는 웹사이트의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다." },
      { heading: "제 2 조 (약관의 효력과 변경)", text: "본 약관은 웹사이트에 게시함으로써 효력이 발생하며, 회사는 필요한 경우 약관을 변경할 수 있습니다." },
      { heading: "제 3 조 (회원의 의무)", text: "회원은 관련 법령과 본 약관, 공지사항을 준수해야 하며, 회사의 업무에 방해가 되는 행위를 해서는 안 됩니다." },
    ],
  },
  en: {
    heroTitle: "Terms of Service",
    sections: [
      { heading: "Article 1 (Purpose)", text: "These terms are intended to define the rights, duties and responsibilities between the Company (MCell) and members regarding the use of the website operated by MCell." },
      { heading: "Article 2 (Effect and Changes of the Terms)", text: "These terms take effect when posted on the website, and the Company may revise the terms when necessary." },
      { heading: "Article 3 (Obligations of Members)", text: "Members must comply with applicable laws, these terms and posted notices, and must not engage in conduct that interferes with the Company's operations." },
    ],
  },
};

export default async function PolicyPage() {
  const locale = await getLocale();
  const c = CONTENT[locale];
  return (
    <>
      <SubHero
        groupLabel="엠셀"
        title={c.heroTitle}
        currentHref="/policy"
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
