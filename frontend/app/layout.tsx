import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/_ui/global.css";
import type { Viewport } from "next";
import SideBar from "./_ui/components/SideBar/Sidebar";
import React from "react";

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
      <body className={`${inter.className}`}>
        <SideBar />
        <div className="maincontent">{children}</div>
      </body>
    </html>
  );
}
