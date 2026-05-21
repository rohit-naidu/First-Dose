import type { Metadata, Viewport } from 'next';
import '../src/styles.css';

export const metadata: Metadata = {
  applicationName: 'First Dose',
  title: 'First Dose | Genetic Guidance for Better Prescribing',
  description: 'First Dose helps predict drug efficacy and side effect risk using genetic data.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'First Dose | Genetic Guidance for Better Prescribing',
    description: 'Predict medication efficacy and side-effect risk signals before the next prescription.',
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
