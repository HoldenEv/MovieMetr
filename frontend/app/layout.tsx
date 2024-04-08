import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/_ui/global.css";
import styles from "@/_ui/Body.module.css";
import type { Viewport } from "next";
import Header from "@/_ui/components/Header/Header";
import Tabs from "@/_ui/components/Tabs/Tabs";

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOIST METER",
  description: "Rate your movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        {/* <Header /> */}
        {/* <Tabs></Tabs> */}
        {children}
      </body>
    </html>
  );
}
