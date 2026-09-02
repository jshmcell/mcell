import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "엠셀",
    template: "%s : 엠셀",
  },
  description:
    "스마트 발열 기술로 산업의 혁신을 이끌어갑니다. 더 얇고, 더 가볍고, 더 안전한 열전달 구조로 고효율 에너지 솔루션을 제시합니다.",
  icons: {
    icon: "/assets/img/ccc18a0ccfccd.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}