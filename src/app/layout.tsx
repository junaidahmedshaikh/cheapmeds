import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";

import "./globals.css";
import Provider from "./provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CheapMeds",
  description: "CheapMeds is a platform for compare prices of medicines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
