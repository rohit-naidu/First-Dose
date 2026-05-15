import type { Metadata } from 'next';
import '../src/styles.css';

export const metadata: Metadata = {
  title: 'First Dose | Genetic Guidance for Better Prescribing',
  description: 'First Dose helps predict drug efficacy and side effect risk using genetic data.',
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
