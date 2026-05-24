import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../src/styles.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  applicationName: 'First Dose',
  title: 'First Dose | Weight Loss Medication Matched to Your Body',
  description:
    'Lose weight with medication matched to your body. Fewer side effects, better dose fit, matched to your biology.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'First Dose | Weight Loss Medication Matched to Your Body',
    description:
      'Lose weight with medication matched to your body — with a plan built around side-effect tolerance, not one-size-fits-all dosing.',
    siteName: 'First Dose',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e1b3a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      <body>{children}</body>
    </html>
  );
}
