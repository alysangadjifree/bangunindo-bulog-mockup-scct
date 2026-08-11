import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "scct-bulog-dashboard.bangunindo-t-1626.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const ogImage = `${protocol}://${host}/og-v2.png`;

  return {
    title: "SCCT BULOG | Dashboard Persediaan",
    description: "Supply Chain Control Tower BULOG untuk pemantauan persediaan nasional.",
    openGraph: {
      title: "SCCT BULOG",
      description: "Dashboard Persediaan Nasional",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "SCCT BULOG Dashboard Persediaan Nasional" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "SCCT BULOG",
      description: "Dashboard Persediaan Nasional",
      images: [ogImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={instrumentSans.variable}>{children}</body>
    </html>
  );
}
