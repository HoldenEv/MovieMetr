import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "@/ui/global.css";
import styles from "@/ui/Body.module.css";
import Header from "@/ui/components/Header/Header";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Meter",
  description: "TODO", //TODO: METADATA
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${leagueSpartan.className} ${styles.body}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
