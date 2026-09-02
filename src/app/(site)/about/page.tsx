import Image from "next/image";
import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import Reveal from "@/components/ui/Reveal";
import { ceo } from "@/data/about";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      <SubHero groupLabel="About" title="About Us" currentHref="/about" />
      <section className="relative flex h-[300px] items-center justify-center overflow-hidden">
        <Image
          src={ceo.banner.bg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </section>
      <section className="bg-white">
        <div className="container-site py-20 text-center">
          <Reveal>
            <h2 className="text-[30px] font-bold text-navy-900">{ceo.banner.title}</h2>
            <p className="mt-6 text-[18px] leading-9 text-ink">{ceo.banner.quote}</p>
            <div className="mx-auto mt-10 max-w-[840px] space-y-4 text-[16px] leading-8 text-ink/85">
              <p>
                안녕하십니까. 엠셀은 탄소나노튜브 발열 기술을 기반으로 스마트 섬유 소재를 개발하는
                기업입니다.
              </p>
              <p>
                더 얇고, 더 가볍고, 더 안전한 열전달 구조로 고정밀 발열 솔루션을 제공하며, 산업 전반의
                혁신을 이끌어가고 있습니다.
              </p>
              <p>앞으로도 지속적인 기술 개발과 품질 혁신으로 보답하겠습니다. 감사합니다.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="relative overflow-hidden">
        <Image
          src={contact.banner.bg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="container-site relative py-20 text-center text-white">
          <Reveal>
            <div className="text-[22px] font-bold leading-9">
              {contact.banner.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}