"use client";

import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "./shared/nav";
import React from "react";
import { Footer } from "./shared/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Afterthought",
  description: "An AI-assisted reflection tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
