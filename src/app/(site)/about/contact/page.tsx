import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <SubHero groupLabel="About" title="Contact Us" currentHref="/about/contact" />
      <section className="bg-white">
        <div className="container-site space-y-16 py-20">
          {contact.offices.map((office) => (
            <Reveal key={office.name}>
              <SectionHeading title={office.name} />
              <div className="mt-8 overflow-hidden border border-black/10">
                <iframe
                  src={office.mapSrc}
                  title={`${office.name} 위치`}
                  className="h-[420px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-right">
                <a
                  href={office.directions}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] text-ink/70 underline-offset-4 hover:text-navy-900 hover:underline"
                >
                  경로 찾기(새 탭에서 열기)
                </a>
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}