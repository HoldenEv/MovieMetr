import type { Metadata } from "next";
import { Inter } from "next/font/google"; // TODO: FIND FONTS
import "@/_ui/global.css";
import Header from "@/_ui/components/Header/Header";
import styles from "@/_ui/Body.module.css";
import { League_Spartan } from "next/font/google";

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
        <Header />
        {children}
      </body>
    </html>
  );
}

