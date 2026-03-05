import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CASVE 워크시트 - 진로 탐색 의사결정 지원",
  description: "CASVE 기반 진로·전공 선택을 위한 단계별 의사결정 워크시트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="min-h-screen w-full bg-[var(--color-bg-primary)]">
          {children}
        </div>
      </body>
    </html>
  );
}
