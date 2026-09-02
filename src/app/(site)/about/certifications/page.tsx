import Image from "next/image";
import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import Reveal from "@/components/ui/Reveal";
import { certifications } from "@/data/certifications";

export const metadata: Metadata = {
  title: "인증서",
};

export default function CertificationsPage() {
  return (
    <>
      <SubHero groupLabel="About" title="인증서" currentHref="/about/certifications" />
      <section className="relative flex h-[300px] items-center justify-center overflow-hidden">
        <Image
          src="/assets/img/f9124d9afd25e.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </section>
      <section className="bg-white">
        <div className="container-site py-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => (
              <Reveal key={cert.thumb} delay={(i % 4) * 0.06}>
                <Image
                  src={cert.thumb}
                  alt="엠셀 인증서"
                  width={298}
                  height={415}
                  className="h-[415px] w-full border border-black/10 object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}