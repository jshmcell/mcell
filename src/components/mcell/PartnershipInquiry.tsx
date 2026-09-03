import Appear from "@/components/ui/Appear";
import InquiryForm from "@/components/forms/InquiryForm";
import { partnership } from "@/data/partnership";

/**
 * PARTNERSHIP INQUIRY — 원본 /31·/32 하단 임베드 섹션 (#f7f7f7 배경,
 * 타이틀 블록 fadeIn 0.7s + 입력폼)
 */
export default function PartnershipInquiry() {
  return (
    <section className="bg-[#f7f7f7]">
      <div className="container-site pt-[60px] pb-[451px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">
            {partnership.heading}
          </p>
          <h2 className="text-[30px] font-bold text-ink">
            {partnership.title}
          </h2>
          <div className="mt-[6px] text-[18px] leading-[2] text-ink">
            {partnership.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Appear>

        <div className="mt-[20px]">
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
