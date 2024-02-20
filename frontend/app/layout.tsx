import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "@/_ui/global.css";
import styles from "@/_ui/Body.module.css";
import Header from "@/_ui/components/Header/Header";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Meter",
  description: "Rate your movies",
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
        {/* <Login />  */}
        {children}
      </body>
    </html>
  );
}
