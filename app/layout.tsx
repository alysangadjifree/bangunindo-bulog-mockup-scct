import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SCCT BULOG | Dashboard Persediaan",
  description: "Supply Chain Control Tower BULOG untuk pemantauan persediaan nasional.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={instrumentSans.variable}>{children}</body>
    </html>
  );
}
