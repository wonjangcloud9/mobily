import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '데일리 체크 도우미 - 모바일 RPG 일일 콘텐츠 관리',
  description:
    '로그인 없이 사용하는 모바일 RPG 데일리/주간 콘텐츠 체크리스트. 오늘 할 것만 딱! 10초 안에 확인.',
  keywords: ['모바일 RPG', '데일리 체크', '일일 콘텐츠', '체크리스트', '주간 미션'],
  openGraph: {
    title: '데일리 체크 도우미',
    description: '오늘 할 것만 딱! 10초 안에 확인',
    type: 'website',
    locale: 'ko_KR',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
