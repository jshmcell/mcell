import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import Appear from "@/components/ui/Appear";
import { contact } from "@/data/contact";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <SubHero
        groupLabel="About"
        title="Contact Us"
        currentHref="/about/contact"
      />
      <SubPageBanner image="/assets/img/38e99f51c3fe3.jpg" overlay />
      <section className="bg-white">
        <div className="container-site pt-[22px] md-header:pt-[106px]">
          {contact.offices.map((office, i) => (
            <div key={office.name} className={cn(i > 0 && "mt-[60px]")}>
              <h2 className="pt-[15px] pb-[35px] text-[24px] font-bold leading-[1.2] text-ink md-header:text-[36px] md-header:leading-[43px]">
                {office.name}
              </h2>
              <div className="py-[15px]">
                <iframe
                  src={office.mapSrc}
                  title={`${office.name} 위치`}
                  className="h-[450px] w-full border-0 md:h-[383px] md-header:h-[450px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <Appear
                duration={0.7}
                className="my-[10px] py-[10px] md-header:my-[15px] md-header:py-[15px]"
              >
                <table className="w-full text-[15px] leading-[24px] text-ink md-header:text-[18px] md-header:leading-[36px]">
                  <tbody>
                    <tr>
                      <td className="w-[17.5%] pr-[2%] font-bold">Tel</td>
                      <td>{office.tel}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Email</td>
                      <td>{office.email}</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Address</td>
                      <td>{office.address}</td>
                    </tr>
                  </tbody>
                </table>
              </Appear>
            </div>
          ))}
        </div>
        <div aria-hidden className="h-[76px] md-header:h-[148px]" />
      </section>
    </>
  );
}
