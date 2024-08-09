import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Speak Speare",

  description: "SpeakSpeare: Your language wizard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script src="./node_modules/preline/dist/preline.js" async />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
