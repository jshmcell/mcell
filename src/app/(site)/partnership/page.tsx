"use client";

import Reveal from "@/components/ui/Reveal";
import InquiryForm from "@/components/forms/InquiryForm";
import { partnership } from "@/data/partnership";

export default function PartnershipPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url(/assets/img/06285cdf4dddb.jpg)" }}
        />
        <div className="container-site relative py-20 text-center text-white">
          <Reveal>
            <p className="text-[20px] font-bold tracking-widest">
              {partnership.heading}
            </p>
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
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
