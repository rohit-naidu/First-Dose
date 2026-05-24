import type { Metadata, Viewport } from 'next';
import '../src/styles.css';

export const metadata: Metadata = {
  applicationName: 'First Dose',
  title: 'First Dose | GLP-1 Weight Loss Without the Side-Effect Guesswork',
  description:
    'First Dose helps you find a GLP-1 plan your body is more likely to tolerate using intake, biomarkers, and genetic context.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'First Dose | GLP-1 Weight Loss Without the Side-Effect Guesswork',
    description:
      'Stop guessing which GLP-1 dose or support plan your body will tolerate before side effects waste another month.',
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
