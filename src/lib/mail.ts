import { Resend } from "resend";

const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

export async function sendResetEmail(
  email: string,
  name: string,
  resetUrl: string,
) {
  const html = `
  <div style="font-family:'Pretendard',AppleSDGothicNeo,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#363636;">
    <h2 style="color:#17375e;font-size:20px;margin:0 0 16px;">비밀번호 재설정 안내</h2>
    <p style="margin:0 0 8px;">${name || "고객"}님, 안녕하세요.</p>
    <p style="margin:0 0 24px;">비밀번호 재설정 요청이 접수되었습니다. 아래 버튼을 눌러 새 비밀번호를 설정해 주세요.</p>
    <p style="margin:0 0 24px;">
      <a href="${resetUrl}" style="display:inline-block;background:#17375e;color:#fff;text-decoration:none;padding:12px 28px;border-radius:3px;font-size:14px;">비밀번호 재설정</a>
    </p>
    <p style="margin:0 0 4px;font-size:13px;color:#474747;">버튼이 동작하지 않으면 아래 링크를 복사해서 브라우저에 붙여넣어 주세요.</p>
    <p style="margin:0 0 24px;font-size:13px;word-break:break-all;"><a href="${resetUrl}" style="color:#27397d;">${resetUrl}</a></p>
    <p style="margin:0;font-size:12px;color:#888;">본 메일은 발신 전용이며, 요청하지 않으셨다면 무시하셔도 됩니다. 링크는 1시간 후 만료됩니다.</p>
  </div>`;

  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "[엠셀] 비밀번호 재설정 안내",
    html,
  });
}
