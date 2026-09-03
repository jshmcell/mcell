export interface AgreementSection {
  heading?: string;
  paragraphs: string[];
}

/** 원본 로그인 폼 기준: 이메일 = 아이디 */
export type SignupStep = "agreement" | "form";
