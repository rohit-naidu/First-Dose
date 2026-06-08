import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "First Dose Health — Precision medicine, before the first dose",
  description:
    "First Dose predicts how an individual patient will respond to a medication before the first prescription — reducing side effects, improving outcomes, and keeping patients on therapy. Starting with GLP-1s.",
  metadataBase: new URL("https://firstdosehealth.com"),
  openGraph: {
    title: "First Dose Health",
    description:
      "Precision drug-response prediction, before the first dose. Starting with GLP-1s.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0e14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
