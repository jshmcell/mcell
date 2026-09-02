import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <>
      <SubHero groupLabel="엠셀" title="개인정보처리방침" currentHref="/privacy" />
      <section className="bg-white">
        <div className="container-site py-16">
          <div className="mx-auto max-w-[840px] space-y-4 text-[15px] leading-7 text-ink/85">
            <h2 className="text-[20px] font-bold text-ink">1. 개인정보의 처리 목적</h2>
            <p>
              회사는 문의 대응, 서비스 제공 및 안내를 위한 목적으로 최소한의 개인정보를 처리합니다.
            </p>
            <h2 className="pt-4 text-[20px] font-bold text-ink">2. 처리하는 개인정보 항목</h2>
            <p>이름, 연락처, 이메일 주소 등 문의 및 서비스 이용에 필요한 정보</p>
            <h2 className="pt-4 text-[20px] font-bold text-ink">3. 보유 및 이용 기간</h2>
            <p>
              개인정보는 수집·이용 목적 달성 후 지체 없이 파기하며, 관련 법령에 따라 보존이 필요한
              경우 예외로 합니다.
            </p>
            <h2 className="pt-4 text-[20px] font-bold text-ink">4. 문의처</h2>
            <p>E-mail: contact@mcell.co.kr</p>
          </div>
        </div>
      </section>
    </>
  );
}