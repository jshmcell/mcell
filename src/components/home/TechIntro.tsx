import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { techIntro } from "@/data/home";

export default function TechIntro() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${techIntro.bg})` }}
      />
      <div className="container-site relative grid items-center gap-10 py-24 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-[30px] font-bold leading-[1.35] text-navy-900 lg:text-[30px]">
            {techIntro.title}
          </h2>
          <div className="mt-5 text-[18px] leading-8">
            {techIntro.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.15}>
          <Image
            src={techIntro.image}
            alt={techIntro.title}
            width={447}
            height={0}
            className="h-auto w-full max-w-[447px]"
          />
        </Reveal>
      </div>
    </section>
  );
}