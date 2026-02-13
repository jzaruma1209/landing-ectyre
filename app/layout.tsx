import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ectyre",
  description: "ectyre",
  icons: {
    icon: "/logo1.svg",
    apple: "/logo1-bg.svg",
  },
  openGraph: {
    title: "ectyre",
    description: "ectyre",
    siteName: "ectyre",
    url: "https://ectyre.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ectyre",
    description: "ectyre",
  },
  metadataBase: new URL("https://ectyre.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
