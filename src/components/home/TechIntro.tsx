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
      {/* imweb rows carry 15px gutters; PC: 80px pad + 15+15 gutter = 110px each side */}
      <div className="container-site relative pb-[42px] pt-[47px] md-header:pb-[110px] md-header:pt-[110px]">
        <div className="my-[15px] grid grid-cols-1 items-start gap-y-[44px] md-header:grid-cols-[40.24%_10.96%_1fr] md-header:gap-y-0">
          <Reveal direction="left" distance="60%" duration={1.2} delay={0.3}>
            <Image
              src={techIntro.photo}
              alt={techIntro.title}
              width={503}
              height={283}
              className="mx-auto h-auto w-full max-w-[503px] rounded-[7px]"
            />
          </Reveal>
          <div className="hidden md-header:block" />
          <Reveal direction="fade" duration={0.7}>
            <div className="pt-[9px] md-header:pt-[6px]">
              <h2 className="text-[20px] font-bold leading-[24px] text-navy-900 md-header:text-[30px] md-header:leading-[36px]">
                {techIntro.title}
              </h2>
              <div className="mt-[19px] text-[15px] leading-[30px] text-ink md-header:mt-[14px] md-header:text-[18px]">
                {techIntro.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <Image
                src={techIntro.image}
                alt={techIntro.title}
                width={447}
                height={148}
                className="mb-[5px] mt-[5px] h-auto w-full max-w-[447px]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
