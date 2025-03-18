
import type { Metadata } from "next";
import "./globals.css";

import { IBM_Plex_Sans_Thai } from "next/font/google";
import WaveBackground from "@/components/WaveBackground";

const ibmFlex = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Salmon Fortune",
  description: "ดูดวงกับแซลม่อน",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="th">
      <body className={`${ibmFlex.className} overflow-y-hidden`}>
        <WaveBackground />
        {children}
      </body>
    </html>
  );
}
