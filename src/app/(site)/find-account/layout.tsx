import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "아이디 · 비밀번호 찾기",
  robots: { index: false },
};

export default function FindAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
