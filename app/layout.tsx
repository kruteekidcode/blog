import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'KruTeekidCode — Blog, Courses & More',
    template: '%s | KruTeekidCode',
  },
  description:
    'บทความเกี่ยวกับ Technology, Coding และ Education โดยครูทีกิด',
  metadataBase: new URL('https://kruteekidcode.com'),
  openGraph: {
    title: 'KruTeekidCode',
    description: 'บทความเกี่ยวกับ Technology, Coding และ Education โดยครูทีกิด',
    url: 'https://kruteekidcode.com',
    siteName: 'KruTeekidCode',
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KruTeekidCode',
    description: 'บทความเกี่ยวกับ Technology, Coding และ Education โดยครูทีกิด',
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
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js';

  return (
    <html lang="th" className={inter.variable}>
      <body>
        {umamiWebsiteId && (
          <Script
            defer
            src={umamiScriptUrl}
            data-website-id={umamiWebsiteId}
          />
        )}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

