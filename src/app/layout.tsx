import type { Metadata } from "next";
import { Inter, Gilda_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const gildaDisplay = Gilda_Display({
  variable: "--font-gilda-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Olympic Park Smiles | Dental Clinic",
  description: "High-quality dental care services.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${gildaDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
